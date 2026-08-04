#!/usr/bin/env python3
"""Hero — photoreal cafe, HIM seen from BEHIND / three-quarter side (so likeness
doesn't matter), his 4-puppet crew around the round table facing us. Based on the
loved 'explore-real-2'. Usage: python3 scripts/gen_hero_back.py [names...]
"""
import base64, json, re, sys, urllib.request
from pathlib import Path

KEY_FILE = Path("/Users/admin/PersonAi/api_key.txt")
OUT = Path("/Users/admin/productlab-site/assets")
OUT.mkdir(parents=True, exist_ok=True)
m = re.search(r"sk-proj-[A-Za-z0-9_\-]{20,}", KEY_FILE.read_text())
if not m:
    sys.exit("No OpenAI key found")
KEY = m.group(0)

CAST = ("a fixed crew of FOUR original fuzzy felt PUPPET creatures (classic felt "
        "variety-show spirit but ENTIRELY ORIGINAL, NOT trademarked), each distinct and "
        "consistent: (1) a TALL teal-blue one with a long soft snout and calm round eyes; "
        "(2) a ROUND coral-orange one with a wide happy grin; (3) a SMALL mustard-yellow "
        "one with a curious tuft of hair and huge bright eyes; (4) a FLUFFY lavender-purple "
        "one with droopy friendly eyes. Real hand-crafted puppets, real fur and texture")

STYLE_REAL = (
    "A warm, cozy, PHOTOREALISTIC candid documentary PHOTOGRAPH inside a real, quiet, "
    "softly lit coffee shop, shallow depth of field, warm window light and gentle bokeh. "
    "Everything physically real and tactile, the puppets genuinely sitting at the table "
    "catching the real cafe light. Genuine, candid, relaxed, cool. No text."
)

MAN = ("a man in his 30s in a casual violet t-shirt with short dark hair, "
       "SEEN FROM BEHIND AND SLIGHTLY TO THE SIDE - we see the back of his head and only a "
       "small sliver of his profile/cheek, his face mostly hidden from the camera")

SCENE = (f"In a quiet cozy cafe, {MAN}, sitting at a small round wooden table with his open "
         f"laptop in front of him. Across and around the table, facing toward the camera, "
         f"sit {CAST}. The creatures are relaxed and cool, each doing its own thing - one "
         "sipping from a coffee mug, one resting its chin thinking, one leaning back. "
         "Coffee mugs on the table. A cool, cozy crew hanging out together. ")

VARIANTS = {
    "hero-back-1": SCENE + "Over-the-shoulder three-quarter rear view. " + STYLE_REAL,
    "hero-back-2": SCENE + "He sits to one side in profile-from-behind, so a bit more of "
                           "his cheek and beard shows while his face stays mostly turned "
                           "away; the puppets fill the rest of the table. " + STYLE_REAL,
    "hero-back-3": SCENE + "A slightly wider over-the-shoulder view showing the cozy cafe "
                           "softly out of focus behind the crew. " + STYLE_REAL,
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
    try:
        gen(name, prompt)
    except Exception as e:
        print("FAIL", name, str(e)[:120])
print("done")
