#!/usr/bin/env python3
"""Single-puppet portraits for the 'who it is for' tiles, from the fixed cast.
Photoreal felt puppets (matching the hero), each on a plain warm off-white canvas
so they sit cleanly on the card. Usage: python3 scripts/gen_tiles.py [names...]
"""
import base64, json, re, sys, urllib.request
from pathlib import Path

KEY = re.search(r"sk-proj-[A-Za-z0-9_\-]{20,}",
                Path("/Users/admin/PersonAi/api_key.txt").read_text()).group(0)
OUT = Path("/Users/admin/productlab-site/assets")

STYLE = ("A single real hand-crafted fuzzy felt PUPPET character (classic felt "
         "variety-show spirit but ENTIRELY ORIGINAL, NOT trademarked), photoreal and "
         "tactile with real fur, centered, soft warm studio lighting, isolated on a PLAIN "
         "FLAT WARM OFF-WHITE (#f6f5f2) background with a soft shadow, no other objects, "
         "no text. Sophisticated and characterful, NOT naive, NOT childish.")

VARIANTS = {
    # designer = coral-orange, pencil behind ear, at a laptop
    "tile-designer": ("A ROUND coral-orange fuzzy felt puppet with a yellow PENCIL tucked "
                      "behind its ear, leaning over a small laptop and a sketchpad, designing "
                      "something, with a RELAXED, CONTENT, subtly pleased half-smile - "
                      "sophisticated and cool, quietly enjoying it. " + STYLE),
    # builder = teal-blue, hard hat, building
    "tile-builder": ("A TALL teal-blue fuzzy felt puppet wearing a yellow CONSTRUCTION HARD "
                     "HAT, holding a small wooden block and a tiny hammer, confidently "
                     "building something, with a COOL, slightly serious, mildly unimpressed "
                     "deadpan look full of character. " + STYLE),
    # next step with AI = mustard-yellow, smartphone (the little one, cheeriest)
    "tile-nextai": ("A SMALL mustard-yellow fuzzy felt puppet with a curious tuft of hair, "
                    "holding up a SMARTPHONE in both hands, the CHEERIEST of the group - a "
                    "brighter, more openly HAPPY and a little playful expression (the small "
                    "one is allowed to be a touch goofy), a couple of tiny app/gadget shapes "
                    "floating nearby. " + STYLE),
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
