#!/usr/bin/env python3
"""Hero v2 — improvement of hero-wide-3: zoomed OUT (characters smaller), puppets
spaced AROUND the round table (not bunched in front of him), laptop fully visible
and not cut off, everyone just relaxed and present (not talking at him). Man from
behind on the right, calmer space upper-right for the title.
Usage: python3 scripts/gen_hero_v2.py [names...]
"""
import base64, json, re, sys, urllib.request
from pathlib import Path

KEY = re.search(r"sk-proj-[A-Za-z0-9_\-]{20,}",
                Path("/Users/admin/PersonAi/api_key.txt").read_text()).group(0)
OUT = Path("/Users/admin/productlab-site/assets")

CAST = ("a fixed crew of FOUR original fuzzy felt PUPPET creatures (ORIGINAL, NOT "
        "trademarked), each with a DISTINCT expression and real character, beautifully lit "
        "with great proportions, NOT goofy: (1) a TALL teal-blue one with a long soft "
        "snout, COOL and INDIFFERENT, unbothered and deadpan-neutral (NOT sad, NOT droopy, "
        "NOT gloomy), with calm HALF-CLOSED, heavy-lidded eyes (NOT big fully-open round "
        "white eyes) - relaxed and characterful; (2) a coral-orange one with a NORMAL, "
        "WELL-PROPORTIONED body (NOT fat, NOT chubby, NOT bloated) and a warm, POSITIVE, "
        "friendly expression; (3) a SMALL mustard-yellow one with a curious tuft of hair, "
        "the HAPPIEST and most cheerful of the group, bright and joyful (the little one); "
        "(4) a FLUFFY lavender-purple one, cool, relaxed, easy-going and chill. "
        "Vibrant, sharp, characterful felt puppets with real fur. "
        "CRITICAL CONSISTENCY RULE: NONE of the four creatures has EARS - every one has a "
        "smooth rounded head with absolutely NO ears, NO ear shapes, NO bear ears, nothing "
        "sticking out from the sides or top of the head. Keep them simple and consistent, "
        "just rounded felt heads with eyes and a mouth")

STYLE = ("A warm, cozy, PHOTOREALISTIC candid documentary PHOTOGRAPH inside a real quiet "
         "softly lit coffee shop, WIDER ZOOMED-OUT view showing the whole round table and "
         "the cozy cafe around it, natural proportions, shallow depth of field, warm window "
         "light and gentle bokeh, everything physically real and tactile. Relaxed, vibrant, sharp, beautifully and warmly lit, high quality. "
         "candid. No text.")

MAN = ("a man in his 30s in a casual violet t-shirt with short dark hair, seen FROM BEHIND "
       "on the RIGHT side of the table, only a sliver of profile showing, face mostly hidden")

BASE = (f"{MAN}, sitting at a round wooden cafe table with his HANDS RESTING ON THE TABLE, "
        f"clearly visible. An open laptop sits on the table, TURNED at a slight angle so we "
        f"see NO interface at all - the glossy dark screen catches only a soft, AMBIGUOUS, "
        f"BLURRED reflection of a bright window and the room, indistinct and unclear (no "
        f"recognizable image, NO figures, NO puppets, NO UI, NO app, NO text, NO icons) - "
        f"just a realistic, natural screen glare and window reflection. {CAST} are seated "
        f"spread AROUND the round table with "
        "the man, naturally sharing it like friends, no large empty gap. SEATING ORDER FROM "
        "LEFT TO RIGHT (important): the CORAL-ORANGE character sits FIRST at the FAR LEFT as "
        "the most prominent one; the TEAL-BLUE character sits SECOND, next to the orange, "
        "present but less emphasized; then the small mustard-YELLOW one; then the "
        "lavender-PURPLE one; and the MAN sits on the FAR RIGHT with his back to us. "
        "Coffee mugs around the table. ZOOM OUT so everyone is smaller in the frame and you "
        "see the whole table and the cozy cafe. " + STYLE)

VARIANTS = {
    "hero-v2-1": BASE,
    "hero-v2-2": BASE + " A touch wider, warm window light on the right.",
    "hero-v2-3": BASE + " Brick-wall cafe, a plant softly out of focus, airy and inviting.",
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
