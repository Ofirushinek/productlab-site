#!/usr/bin/env python3
"""Reference-based hero: feed the LOVED character portraits (orange/blue/yellow/purple)
into gpt-image-1 image EDITS so the hero crew matches them (consistency).
Usage: python3 scripts/gen_hero_ref.py [n]
"""
import base64, json, re, sys, urllib.request
from pathlib import Path

KEY = re.search(r"sk-proj-[A-Za-z0-9_\-]{20,}",
                Path("/Users/admin/PersonAi/api_key.txt").read_text()).group(0)
OUT = Path("/Users/admin/productlab-site/assets")
REFS = [
    OUT / "tile-designer.png",  # orange, vibrant, positive
    OUT / "agent-cto.png",      # blue, cool/serious
    OUT / "tile-nextai.png",    # yellow, happy
    OUT / "agent-cpo.png",      # purple, cool
]

PROMPT = (
    "Create a warm, cozy, PHOTOREALISTIC coffee-shop scene using the FOUR felt puppet "
    "characters from the reference images, keeping each one's EXACT look, colours, face, "
    "eyes and proportions - do not redesign them. Seat them around a small round wooden "
    "cafe table: the coral-ORANGE one front-left (warm and positive), the teal-BLUE "
    "long-snouted one just behind (cool and indifferent, calm half-lidded eyes), the small "
    "mustard-YELLOW one (the happiest), and the lavender-PURPLE one (cool and relaxed). "
    "A man in a violet t-shirt is seen FROM BEHIND on the right, only his back and a sliver "
    "of profile. An open laptop sits on the table, turned slightly so its dark glossy screen "
    "shows only a soft ambiguous reflection - NO interface, NO UI, NO text. Coffee mugs on "
    "the table, warm window light, cozy brick-wall cafe, gentle bokeh. NONE of the creatures "
    "has ears. Photorealistic, natural, no text."
)

def gen(name):
    boundary = "----plref" + base64.b16encode(__import__("os").urandom(8)).decode()
    parts = []
    def field(n, v):
        parts.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{n}\"\r\n\r\n{v}\r\n".encode())
    field("model", "gpt-image-1"); field("prompt", PROMPT)
    field("size", "1536x1024"); field("quality", "high")
    for r in REFS:
        parts.append(
            f"--{boundary}\r\nContent-Disposition: form-data; name=\"image[]\"; filename=\"{r.name}\"\r\n"
            f"Content-Type: image/png\r\n\r\n".encode() + r.read_bytes() + b"\r\n")
    parts.append(f"--{boundary}--\r\n".encode())
    body = b"".join(parts)
    req = urllib.request.Request(
        "https://api.openai.com/v1/images/edits", data=body,
        headers={"Authorization": f"Bearer {KEY}",
                 "Content-Type": f"multipart/form-data; boundary={boundary}"})
    with urllib.request.urlopen(req, timeout=400) as r:
        d = json.load(r)
    (OUT / f"{name}.png").write_bytes(base64.b64decode(d["data"][0]["b64_json"]))
    print("saved", name)

n = int(sys.argv[1]) if len(sys.argv) > 1 else 3
for i in range(1, n + 1):
    try: gen(f"hero-ref-{i}")
    except Exception as e:
        import traceback; print("FAIL", i, str(e)[:200])
print("done")
