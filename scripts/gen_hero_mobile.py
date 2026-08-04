#!/usr/bin/env python3
"""PORTRAIT mobile hero — clearly reads as a PERSON sitting with the puppet crew on
a phone screen. Taller framing, the man from behind + the 4 puppets close around a
small table, blurred landing page on the laptop. 3 takes.
Usage: python3 scripts/gen_hero_mobile.py [names...]
"""
import base64, json, re, sys, urllib.request
from pathlib import Path

KEY = re.search(r"sk-proj-[A-Za-z0-9_\-]{20,}",
                Path("/Users/admin/PersonAi/api_key.txt").read_text()).group(0)
OUT = Path("/Users/admin/productlab-site/assets")

CAST = ("a crew of FOUR original fuzzy felt PUPPET creatures (ORIGINAL, NOT trademarked), "
        "each cool and characterful, NOT goofy: a teal-BLUE one with a long snout (cool, a "
        "touch serious); a round coral-ORANGE one (relaxed content half-smile); a small "
        "mustard-YELLOW one with a tuft (the cheeriest); a fluffy lavender-PURPLE one "
        "(easy-going). Real felt fur and texture")

STYLE = ("A warm, cozy, PHOTOREALISTIC candid documentary PHOTOGRAPH inside a real softly "
         "lit coffee shop, shallow depth of field, warm bokeh, everything physically real "
         "and tactile. TALL VERTICAL PORTRAIT composition that clearly reads on a phone. "
         "No text.")

PROMPT = ("A cozy cafe scene, TALL PORTRAIT framing: in the foreground a MAN in a violet "
          "t-shirt seen from BEHIND (only his back and a sliver of profile, face hidden) "
          "sits at a small round cafe table; clearly a PERSON sitting together with his "
          f"crew. Gathered close AROUND the table facing us sit {CAST}, filling the middle "
          "of the frame so you instantly see a person hanging out with a group of puppet "
          "characters. An open laptop on the table; the LAPTOP SCREEN shows a softly "
          "BLURRED, out-of-focus colorful website landing page glowing gently (not sharp). "
          "The CORAL-ORANGE one is the most prominent. Coffee mugs on the table. Warm, "
          "inviting, candid. " + STYLE)

VARIANTS = {"hero-mobile-1": PROMPT, "hero-mobile-2": PROMPT, "hero-mobile-3": PROMPT}

def gen(name, prompt):
    body = json.dumps({"model": "gpt-image-1", "prompt": prompt, "size": "1024x1536",
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
