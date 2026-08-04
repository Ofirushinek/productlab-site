#!/usr/bin/env python3
"""3D / photoreal FELT logo marks — just the orange character HEAD as an icon,
matching the cast texture. Play options for a 'genuine' logo. 3 takes.
Usage: python3 scripts/gen_logo3d.py [names...]
"""
import base64, json, re, sys, urllib.request
from pathlib import Path

KEY = re.search(r"sk-proj-[A-Za-z0-9_\-]{20,}",
                Path("/Users/admin/PersonAi/api_key.txt").read_text()).group(0)
OUT = Path("/Users/admin/productlab-site/assets/logo")

STYLE = ("A photorealistic 3D FELT puppet HEAD used as a clean LOGO / app icon - just the "
         "head, no body, no props, no text. Real hand-crafted felt fur texture, soft warm "
         "studio lighting, gentle soft shadow, centered with generous even margin on a "
         "plain flat pure white background. Iconic, simple, friendly. A COOL, calm, "
         "understated expression - a subtle closed-mouth smile, relaxed eyes, sophisticated "
         "and characterful, NOT a big goofy grin, NOT childish.")

VARIANTS = {
    "logo3d-1": "A round CORAL-ORANGE felt puppet head facing forward, symmetrical and "
                "balanced, two simple friendly eyes. " + STYLE,
    "logo3d-2": "A round CORAL-ORANGE felt puppet head at a slight three-quarter angle with "
                "a bit more personality and depth. " + STYLE,
    "logo3d-3": "A round CORAL-ORANGE felt puppet head, softer and rounder like a cute app "
                "icon, cozy and inviting. " + STYLE,
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
