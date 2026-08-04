#!/usr/bin/env python3
"""Logo mark concepts — the cast faces as a SIMPLE, bold, flat logo that reads at
small nav size. Paired later with the 'Product Lab' wordmark. 3 directions.
Usage: python3 scripts/gen_logo.py [names...]
"""
import base64, json, re, sys, urllib.request
from pathlib import Path

KEY = re.search(r"sk-proj-[A-Za-z0-9_\-]{20,}",
                Path("/Users/admin/PersonAi/api_key.txt").read_text()).group(0)
OUT = Path("/Users/admin/productlab-site/assets/logo")
OUT.mkdir(parents=True, exist_ok=True)

STYLE = ("A clean, SIMPLE, BOLD FLAT vector-style LOGO icon - minimal geometric shapes, "
         "confident thick outlines, high contrast, friendly and modern, NOT photorealistic, "
         "NO fur texture, designed to stay crisp and legible at very small sizes. Centered "
         "with generous even margin on a plain flat pure white background, no text.")

VARIANTS = {
    # two faces side by side (Ofir's idea)
    "logo-duo": ("A logo of TWO simple friendly little creature faces side by side, slightly "
                 "overlapping, one teal-blue and one coral-orange, each just a rounded head "
                 "shape with two simple dot eyes and a tiny calm smile - clean and iconic. "
                 + STYLE),
    # single iconic face
    "logo-solo": ("A logo of ONE simple friendly little creature face, a coral-orange rounded "
                  "head shape with two simple dot eyes and a small calm smile, clean and "
                  "iconic, like a modern app mark. " + STYLE),
    # trio peeking (nods to the crew)
    "logo-trio": ("A logo of THREE tiny simple creature faces peeking up in a row - teal-blue, "
                  "coral-orange and lavender-purple - just rounded head tops with simple dot "
                  "eyes, playful but clean and minimal. " + STYLE),
}

def gen(name, prompt):
    body = json.dumps({"model": "gpt-image-1", "prompt": prompt, "size": "1024x1024",
                       "quality": "high", "background": "opaque", "n": 1}).encode()
    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations", data=body,
        headers={"Authorization": f"Bearer {KEY}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=300) as r:
        d = json.load(r)
    (OUT / f"{name}.png").write_bytes(base64.b64decode(d["data"][0]["b64_json"]))
    print("saved", name)

only = set(sys.argv[1:])
for name, prompt in VARIANTS.items():
    if only and name not in only:
        continue
    try: gen(name, prompt)
    except Exception as e: print("FAIL", name, str(e)[:120])
print("done")
