#!/usr/bin/env python3
"""Hero EVEN — fixes accumulated from Ofir's review of prior heroes:
 - EVEN flat warm lighting on ALL FOUR puppets (no single spotlit "hero" figure)
 - EXACTLY four puppets, ONE of each colour (prior gen duplicated the yellow one)
 - ONE clean single-screen laptop facing the man (prior gen made a two-faced screen)
 - Composed for a WIDE 20:9 letterbox crop: crew spread across the LEFT + CENTER,
   laptop kept LOW and LEFT-OF-CENTER so the title never slices it, the man's back
   on the FAR RIGHT giving the right third real visual MASS (not empty) behind the
   right-aligned Hebrew title.
Usage: python3 scripts/gen_hero_even.py [names...]
"""
import base64, json, re, sys, urllib.request
from pathlib import Path

KEY = re.search(r"sk-proj-[A-Za-z0-9_\-]{20,}",
                Path("/Users/admin/PersonAi/api_key.txt").read_text()).group(0)
OUT = Path("/Users/admin/productlab-site/assets")

CAST = (
    "EXACTLY FOUR original fuzzy felt PUPPET creatures - NO MORE THAN FOUR, and each "
    "colour appears EXACTLY ONCE (do NOT duplicate any character, there must be only ONE "
    "yellow, only ONE orange, only ONE blue, only ONE purple): "
    "(1) ONE tall teal-blue one with a long soft snout and calm half-lidded eyes, cool and "
    "relaxed; (2) ONE round coral-orange one, normal well-proportioned body, warm friendly "
    "smile; (3) ONE small mustard-yellow one with a little tuft of hair and bright eyes, "
    "the cheerful little one; (4) ONE fluffy lavender-purple one with droopy friendly eyes, "
    "easy-going. Real hand-crafted felt puppets with real fur and texture. NONE of them has "
    "ears - smooth rounded heads only."
)

# EVEN lighting is the whole point: soft, flat, WRAPPING warm light so every character
# is lit the SAME, no spotlight, no single figure brighter or more in-focus than the rest.
STYLE = (
    "A warm, cozy, PHOTOREALISTIC candid documentary PHOTOGRAPH inside a real quiet softly "
    "lit coffee shop. CRITICAL LIGHTING: soft, FLAT, EVEN, wrapping warm light across the "
    "whole group so EVERY character is lit equally and equally in focus - NO spotlight, NO "
    "single figure brighter, sharper or more prominent than the others, all four puppets "
    "read as one balanced team. Moderate depth of field so all four stay reasonably sharp. "
    "Warm window light, gentle bokeh only in the far background, everything physically real "
    "and tactile. Genuine, candid, relaxed, cool. No text."
)

MAN = (
    "a man in his 30s in a casual violet t-shirt with short dark hair, seen FROM BEHIND on "
    "the FAR RIGHT edge of the frame, only his back and shoulder and a thin sliver of "
    "profile showing, face hidden - he fills the right side with a calm dark mass"
)

LAPTOP = (
    "ONE single ordinary open laptop on the table, positioned LOW and just LEFT of center, "
    "fully visible and NOT cut off, turned so its screen faces the man - we see the BACK/"
    "outer lid of the laptop, a plain closed dark lid, absolutely NO second screen, NO "
    "double screen, NO interface, NO UI, NO text on it"
)

BASE = (
    f"A wide horizontal cafe scene. {MAN}. On the LEFT and CENTER of the frame, gathered "
    f"around the left end of a small round wooden cafe table facing the camera, sit {CAST}. "
    "The four puppets are spread in a relaxed row across the left and center - one sipping "
    "from a coffee mug, one resting its chin, one leaning back - evenly spaced, none "
    f"crowding the others. {LAPTOP}. A few coffee mugs on the table. The composition is "
    "balanced left-to-right: puppets fill the left and center, the man's back anchors the "
    "right, and the upper area stays calm for a headline. " + STYLE
)

VARIANTS = {
    "hero-even-1": BASE,
    "hero-even-2": BASE + " Warm exposed-brick cafe wall, soft window glow, a plant blurred in the far background.",
    "hero-even-3": BASE + " Big soft daylight window behind them, airy, cream and amber tones, gentle and inviting.",
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
    except Exception as e: print("FAIL", name, str(e)[:160])
print("done")
