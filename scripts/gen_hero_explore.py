#!/usr/bin/env python3
"""Explore two hero directions for HIM + his CREW at a cafe.
A) illustrated, on a clean cream canvas (dissolves onto the page, no frame).
B) photoreal: a real quiet cafe, real-looking him, real physical fuzzy puppet
   creatures sitting with him (Muppet-Show-inspired but original, not trademarked).
The crew is a FIXED reusable cast of 4 so single creatures can represent single
agents elsewhere. Usage: python3 scripts/gen_hero_explore.py [names...]
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

MAN = ("a relaxed man in his 30s with short dark wavy hair and a short dark beard, wearing "
       "a casual violet t-shirt, easy-going and cool")

# fixed reusable cast of 4 original creatures
CAST = ("a fixed crew of FOUR original fuzzy puppet creatures (in the spirit of classic "
        "1980s felt variety-show puppets but ENTIRELY ORIGINAL, NOT any trademarked "
        "character), each distinct: (1) a TALL teal-blue one with a long soft snout and "
        "calm round eyes; (2) a ROUND coral-orange one with a wide happy grin; (3) a SMALL "
        "mustard-yellow one with a curious tuft of hair and huge bright eyes; (4) a FLUFFY "
        "lavender-purple one with droopy friendly eyes. Each has its own goofy lovable "
        "personality")

SCENE = (f"In a quiet, mostly empty cozy cafe, {MAN} sits at a small round wooden table with "
         f"his open laptop, leaning in and thinking. Around the same table sit {CAST}. The "
         "creatures are relaxed and cool, each doing its own thing - one sipping coffee from "
         "a mug, one resting its chin thinking, one leaning back - together with him but not "
         "all staring at him. A calm, cool, cozy crew. Coffee mugs on the table. ")

STYLE_ILLU = (
    "Drawn as a warm, characterful ILLUSTRATION (not a photo) in a modern editorial "
    "storybook-for-grown-ups style: soft painterly shading, rich warm color, charming and "
    "a little whimsical, sophisticated, NOT childish. CRITICAL: the whole scene sits on a "
    "PLAIN FLAT WARM OFF-WHITE / CREAM (#f6f5f2) background and softly vignettes at the "
    "edges so it dissolves onto a paper page - NO frame, NO border, NO drop-shadow, NO "
    "rectangle, no painted room. Only the table, the people and a few props float on the "
    "cream. No text."
)

STYLE_REAL = (
    "A warm, cozy, PHOTOREALISTIC candid documentary PHOTOGRAPH inside a real softly lit "
    "coffee shop, shallow depth of field, warm window light and gentle bokeh. Everything "
    "is physically real and tactile - INCLUDING the creatures, which are real hand-crafted "
    "fuzzy felt PUPPETS genuinely sitting at the table, real fur and texture catching the "
    "real cafe light. Genuine, candid, relaxed, everyone looks cool. No text."
)

VARIANTS = {
    "explore-real-1": SCENE + STYLE_REAL,
    "explore-real-2": SCENE + "The view is a little wider, showing the cozy cafe around "
                              "them softly out of focus. " + STYLE_REAL,
    "explore-illu-1": SCENE + STYLE_ILLU,
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
