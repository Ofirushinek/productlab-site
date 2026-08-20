#!/usr/bin/env python3
"""AGENT CAST v2 — single-character portraits of the NEW clothed wool crew,
lifted from the new hero by reference so they cannot drift. Same warm room,
same light, isolated on the room's own apricot-cream wall.
"""
import base64, json, os, sys, urllib.request, uuid
from pathlib import Path

KEY = os.environ["OPENAI_API_KEY"]
if KEY.startswith("sk-proj-sk-proj-"):
    KEY = KEY[len("sk-proj-"):]
HERE = Path(__file__).resolve().parent
REF = HERE.parent / "newsite" / "new-1.jpg"
OUT = HERE / "v2"
MODEL = "gpt-image-2"

WORLD = (
    "Take the character EXACTLY as it appears in the reference photograph - identical wool "
    "colour, identical face, identical hair, identical knitted clothing - and photograph it "
    "ALONE. Waist-up, centred, facing the camera, sitting on the pale wool carpet of the same "
    "warm apricot-cream room, soft diffused daylight with a gentle warm lamp glow, photoreal "
    "needle-felted knitted wool with visible fibre, soft natural depth of field, premium "
    "editorial photography. The plain apricot-cream wall fills the background, uncluttered. "
    "NONE of the other characters and NO human appears. No text, no logos, no lettering."
)

CAST = {
  "crew-architect": (
    "The GINGER-BEARDED wool character - big orange knitted beard, teal-blue knitted beanie, "
    "navy cable-knit sweater - the lead engineer. He is at a small open laptop, one hand on "
    "the keys, calm and focused, quietly capable."
  ),
  "crew-strategist": (
    "The PURPLE wool character - purple bobble curls piled on its head, purple suit over a grey "
    "shirt - the product lead. It holds a pen to its chin over an open spiral notepad, "
    "considering, cool and unhurried."
  ),
  "crew-designer": (
    "The TEAL wool character - round gold glasses, brown bow tie, cream cable-knit cardigan, "
    "blue plaid shirt - the designer. It is drawing a simple interface wireframe in a small "
    "open notebook with a yellow pencil, absorbed and content."
  ),
}


def gen(name, subject):
    boundary = uuid.uuid4().hex
    parts = []

    def field(k, v):
        parts.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{k}\"\r\n\r\n{v}\r\n".encode())

    field("model", MODEL); field("size", "1024x1024"); field("quality", "high")
    field("prompt", subject + " " + WORLD)
    parts.append((f"--{boundary}\r\nContent-Disposition: form-data; name=\"image[]\"; "
                  f"filename=\"hero.jpg\"\r\nContent-Type: image/jpeg\r\n\r\n").encode()
                 + REF.read_bytes() + b"\r\n")
    parts.append(f"--{boundary}--\r\n".encode())
    req = urllib.request.Request("https://api.openai.com/v1/images/edits", data=b"".join(parts),
                                 headers={"Authorization": f"Bearer {KEY}",
                                          "Content-Type": f"multipart/form-data; boundary={boundary}"})
    with urllib.request.urlopen(req, timeout=900) as r:
        d = json.load(r)
    (OUT / f"{name}.png").write_bytes(base64.b64decode(d["data"][0]["b64_json"]))
    print("saved", name)


if __name__ == "__main__":
    for n in (sys.argv[1:] or CAST):
        try:
            gen(n, CAST[n])
        except Exception as e:
            print("FAIL", n, str(e)[:160], getattr(e, "read", lambda: b"")()[:300])
