#!/usr/bin/env python3
"""Wide hero — HIM (from behind) + 4-puppet crew GROUPED ON THE LEFT, with calm
empty cafe space on the RIGHT for the title to sit over. Mirror in CSS for EN.
Usage: python3 scripts/gen_hero_wide.py [names...]
"""
import base64, json, re, sys, urllib.request
from pathlib import Path

KEY = re.search(r"sk-proj-[A-Za-z0-9_\-]{20,}",
                Path("/Users/admin/PersonAi/api_key.txt").read_text()).group(0)
OUT = Path("/Users/admin/productlab-site/assets")

CAST = ("a fixed crew of FOUR original fuzzy felt PUPPET creatures (classic felt "
        "variety-show spirit but ENTIRELY ORIGINAL, NOT trademarked): (1) a TALL teal-blue "
        "one with a long soft snout and calm round eyes; (2) a ROUND coral-orange one with "
        "a wide happy grin; (3) a SMALL mustard-yellow one with a curious tuft of hair and "
        "huge bright eyes; (4) a FLUFFY lavender-purple one with droopy friendly eyes. Real "
        "hand-crafted puppets, real fur and texture")

STYLE = ("A warm, cozy, PHOTOREALISTIC candid documentary PHOTOGRAPH inside a real quiet "
         "softly lit coffee shop, shallow depth of field, warm window light and gentle "
         "bokeh, everything physically real and tactile. Genuine, candid, relaxed, cool. "
         "No text.")

MAN = ("a man in his 30s in a casual violet t-shirt with short dark hair, seen FROM BEHIND "
       "and slightly to the side, only a sliver of his profile showing, face mostly hidden")

BASE = (f"{MAN}, sitting at a small round wooden cafe table with an open laptop. He and "
        f"{CAST} are ALL GROUPED TOGETHER ON THE LEFT SIDE of a wide frame, around the left "
        "end of the table, the puppets facing toward the camera, relaxed - sipping coffee, "
        "thinking, leaning back. The ENTIRE RIGHT HALF of the wide frame is calm, softly "
        "lit, mostly EMPTY cozy cafe space (warm window light, gentle bokeh, an empty table "
        "or two), leaving generous open room with no characters on the right. " + STYLE)

VARIANTS = {
    "hero-wide-1": BASE,
    "hero-wide-2": BASE + " Warmer brick-wall cafe, a plant softly out of focus on the right.",
    "hero-wide-3": BASE + " Big soft window light on the right side, airy and inviting.",
}

def gen(name, prompt):
    body = json.dumps({"model": "gpt-image-1", "prompt": prompt, "size": "1536x1024",
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
