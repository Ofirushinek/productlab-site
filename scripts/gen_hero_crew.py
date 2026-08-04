#!/usr/bin/env python3
"""Hero illustration for Product Lab — HIM + his CREW at a cafe table.
Ofir's brief: one human (him) at a cozy cafe with his laptop, thinking, and
3-4 ORIGINAL fuzzy puppet-creatures (Muppet-Show-INSPIRED but entirely original,
NOT trademarked characters) sitting around the table with him, sipping coffee,
thinking together. Warm, colorful, fun, cozy - a crew of friends. Illustration,
NOT a photo. Colorful (deliberate shift away from the mono ink style).
Generates 3 variants. Usage: python3 scripts/gen_hero_crew.py
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

STYLE = (
    "A warm, cozy, characterful ILLUSTRATION (not a photograph) in a modern editorial "
    "storybook-for-grown-ups style: soft painterly shading, rich warm color, inviting and "
    "a little whimsical, sophisticated and charming, NOT childish, NOT flat clip-art. "
    "CRITICAL: the whole scene is drawn on a PLAIN FLAT WARM OFF-WHITE / CREAM (#f6f5f2) "
    "background so it dissolves onto a paper page canvas - softly vignetted at the edges "
    "with NO hard border, NO frame, NO drop-shadow, NO rectangle, no colored backdrop and "
    "no painted room. The cozy coffee feeling comes only from warm lighting on the "
    "characters and a few suggested props (coffee mugs, a small potted plant, the edge of "
    "a wooden cafe table) floating on the cream, not from a full background. Fun, friendly, "
    "full of personality. No text anywhere."
)

MAN = (
    "a relaxed young man in his 30s with short dark wavy hair and a short dark beard, "
    "wearing a casual violet t-shirt, friendly and easy-going"
)

# A FIXED, REUSABLE CAST of 4 original puppet-creatures (Muppet-Show-INSPIRED but
# entirely original, NOT trademarked). Same 4 every time so they become recognizable
# characters we can later pull out individually to represent single agents.
CREW = (
    "a fixed crew of FOUR friendly ORIGINAL fuzzy PUPPET CREATURES - soft-felt monster "
    "characters in the spirit of classic 1980s felt variety-show puppets, but ENTIRELY "
    "ORIGINAL invented characters (NOT any known, branded or trademarked characters), each "
    "clearly distinct and consistent: "
    "(1) a TALL teal-blue creature with a long soft snout and big calm round eyes; "
    "(2) a ROUND coral-orange creature with a wide happy grin and fluffy cheeks; "
    "(3) a SMALL mustard-yellow creature with a big curious tuft of hair and huge bright eyes; "
    "(4) a FLUFFY lavender-purple creature with droopy friendly eyes and shaggy fur. "
    "Each has its own goofy, lovable personality"
)

VARIANTS = {
    "hero-crew-1": (
        f"Inside a cozy warm coffee shop, {MAN} sits at a round wooden cafe table with his "
        f"open laptop, leaning in and thinking, mid-idea. Around the same table sit {CREW}. "
        "The creatures lounge with him - one sipping coffee from a big mug, one resting its "
        "chin on its hands thinking, one leaning back relaxed - like a crew of friends "
        "brainstorming together. The man is the calm human center; the creatures are his "
        "colorful teammates. " + STYLE
    ),
    "hero-crew-2": (
        f"A cozy coffee-shop scene: {MAN} sits at a cafe table with his laptop, gesturing as "
        f"he thinks out loud. Gathered close around him are {CREW}, all leaning in and "
        "listening, coffee mugs on the table, cozy and animated, like a warm creative huddle "
        "of friends. Warm and inviting. " + STYLE
    ),
    "hero-crew-3": (
        f"A warm coffee shop by a softly lit window: {MAN} sits at a wooden table with his "
        f"laptop, calm and thoughtful. Beside and around him sit {CREW}, relaxed - one "
        "perched on the bench next to him, others on chairs sipping coffee, all chilling "
        "together like old friends. Cozy, colorful and fun. " + STYLE
    ),
}

def gen(name, prompt):
    body = json.dumps({
        "model": "gpt-image-1", "prompt": prompt,
        "size": "1536x1024", "quality": "high", "background": "opaque", "n": 1,
    }).encode()
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
    gen(name, prompt)
print("done")
