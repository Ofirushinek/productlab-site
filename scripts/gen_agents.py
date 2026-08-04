#!/usr/bin/env python3
"""Agent roster portraits for the 'meet the team' section — the cast in their
workshop ROLES: CTO = teal-blue (technical), CPO = lavender-purple (product),
Product Designer = coral-orange (design). Single puppet, cream canvas, cool
mature faces (matching the hero/tiles). Usage: python3 scripts/gen_agents.py
"""
import base64, json, re, sys, urllib.request
from pathlib import Path

KEY = re.search(r"sk-proj-[A-Za-z0-9_\-]{20,}",
                Path("/Users/admin/PersonAi/api_key.txt").read_text()).group(0)
OUT = Path("/Users/admin/productlab-site/assets")

STYLE = ("A single real hand-crafted fuzzy felt PUPPET character (classic felt "
         "variety-show spirit but ENTIRELY ORIGINAL, NOT trademarked), photoreal and "
         "tactile with real fur, centered, soft warm studio lighting, isolated on a PLAIN "
         "FLAT WARM OFF-WHITE (#f6f5f2) background with a soft shadow, no text. "
         "Sophisticated and characterful, NOT naive, NOT childish, NOT a big goofy grin.")

VARIANTS = {
    # CTO = teal-blue, technical, cool & serious (his established character)
    "agent-cto": ("A TALL teal-blue fuzzy felt puppet with a long soft snout, the technical "
                  "one - sitting at a small open laptop that shows lines of code, a tiny "
                  "wrench and a little gear beside it, with a COOL, slightly serious, "
                  "focused deadpan expression full of character. " + STYLE),
    # CPO = lavender-purple, product, easy-going & satisfied
    "agent-cpo": ("A FLUFFY lavender-purple fuzzy felt puppet with droopy friendly eyes, the "
                  "product lead - holding a small clipboard with a neat checklist and a "
                  "little roadmap of sticky notes, with a COOL, easy-going, quietly satisfied "
                  "expression. " + STYLE),
    # PD = coral-orange, design, relaxed & content
    "agent-pd": ("A ROUND coral-orange fuzzy felt puppet with a yellow PENCIL tucked behind "
                 "its ear, the designer - sketching a simple interface wireframe on a small "
                 "sketchpad, with a RELAXED, content, subtly pleased half-smile, cool and "
                 "composed. " + STYLE),
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
