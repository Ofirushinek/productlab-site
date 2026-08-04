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

CAST = ("a fixed crew of FOUR original fuzzy felt PUPPET creatures (classic felt "
        "variety-show spirit but ENTIRELY ORIGINAL, NOT trademarked), each with a DISTINCT "
        "sophisticated expression full of character - NONE with a big naive goofy grin: "
        "(1) a TALL teal-blue one with a long soft snout, wearing a cool, slightly serious, "
        "mildly unimpressed deadpan look, a touch disappointed but cool; "
        "(2) a ROUND coral-orange one with a relaxed, content, subtly pleased half-smile; "
        "(3) a SMALL mustard-yellow one with a curious tuft of hair, the CHEERIEST of the "
        "group - brighter and a little more openly happy and cheered up (the small one is "
        "allowed to be a bit goofy); "
        "(4) a FLUFFY lavender-purple one with a cool, satisfied, easy-going expression. "
        "Real hand-crafted puppets, real fur and texture. Sophisticated, relaxed, enjoying "
        "themselves, NOT naive, NOT childish, NOT sad")

STYLE = ("A warm, cozy, PHOTOREALISTIC candid documentary PHOTOGRAPH inside a real quiet "
         "softly lit coffee shop, WIDER ZOOMED-OUT view showing the whole round table and "
         "the cozy cafe around it, natural proportions, shallow depth of field, warm window "
         "light and gentle bokeh, everything physically real and tactile. Relaxed and "
         "candid. No text.")

MAN = ("a man in his 30s in a casual violet t-shirt with short dark hair, seen FROM BEHIND "
       "on the RIGHT side of the table, only a sliver of profile showing, face mostly hidden")

BASE = (f"{MAN}, sitting at a round wooden cafe table with his HANDS RESTING ON THE TABLE, "
        f"clearly visible. An open laptop sits on the table CLEARLY VISIBLE and fully in "
        f"view, NOT blocked or cut off. {CAST} are seated EVENLY spread ALL THE WAY AROUND "
        "the round table together with the man, naturally sharing the table like a group of "
        "friends - some nearer, one seen partly from the side/behind - NOT bunched on one "
        "side, a natural full gathering with no large empty gap. Coffee mugs around the "
        "table. ZOOM OUT MORE so everyone is noticeably SMALLER in the frame and you see the "
        "whole table and the cozy cafe around it. The man stays on the right with his back "
        "to us. " + STYLE)

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
