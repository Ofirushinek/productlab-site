#!/usr/bin/env python3
"""Hero background for the Product Lab page — a COZY COFFEE-SHOP scene.
Ofir's brief: a warm cafe, a laptop + coffee on the table in focus, a softly
BLURRED video-call grid on the laptop screen standing in for the AI "crew"
(no real human - it's a website), everything else melting into warm bokeh.
A real sense of place, not an office, not flashy. The title sits OVER this,
so leave calm warm space in the upper area. Photographic, not engraving.
Generates 3 variants. Usage: python3 scripts/gen_hero_cafe.py
"""
import base64, json, re, sys, urllib.request
from pathlib import Path

KEY_FILE = Path("/Users/admin/PersonAi/api_key.txt")
OUT = Path("/Users/admin/productlab-site/assets")
OUT.mkdir(parents=True, exist_ok=True)
m = re.search(r"sk-proj-[A-Za-z0-9_\-]{20,}", KEY_FILE.read_text())
if not m:
    sys.exit("No OpenAI (sk-proj-) key found in api_key.txt")
KEY = m.group(0)

STYLE = (
    "A warm, cozy lifestyle PHOTOGRAPH of a coffee-shop interior, shot with a shallow "
    "depth of field and soft golden bokeh. In sharp focus on a wooden cafe table: an open "
    "modern laptop, and beside it a cup of coffee with latte art. On the laptop screen is "
    "a soft, gently blurred VIDEO-CALL GRID of several participant tiles, suggesting a "
    "friendly team meeting - the faces indistinct and unreadable. The whole background of "
    "the cafe (other tables, warm hanging lights, plants, a few blurred patrons) melts "
    "into a soft warm bokeh. Warm inviting natural light, amber and cream tones, calm and "
    "cozy, NOT flashy, NOT corporate, NOT a sterile office. No readable text anywhere, and "
    "NO person in the foreground. Photorealistic editorial lifestyle photography."
)

VARIANTS = {
    "hero-cafe-1": "The laptop sits center-left on the table with the coffee to its right; "
                   "generous calm warm empty space across the upper third of the frame for "
                   "a headline. " + STYLE,
    "hero-cafe-2": "The laptop and coffee sit lower-right on the table, with soft warm cafe "
                   "bokeh and a window glow filling the upper-left, leaving open space there "
                   "for a headline. " + STYLE,
    "hero-cafe-3": "A cozy closer view of the laptop and a coffee cup on a warm wooden table "
                   "by a softly lit window, plenty of gentle bokeh and calm space above for "
                   "a headline. " + STYLE,
}

def gen(name, prompt):
    body = json.dumps({
        "model": "gpt-image-1", "prompt": prompt,
        "size": "1536x1024", "quality": "high", "background": "opaque", "n": 1,
    }).encode()
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
    gen(name, prompt)
print("done")
