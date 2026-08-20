#!/usr/bin/env python3
"""AUDIENCE CAST v2 — anchored to the NEW hero (the warm room + clothed wool crew).
The split the new hero already makes: WOOL CREATURES = the AI agents,
REAL PHOTOGRAPHED PEOPLE = the reader. So the audience tiles are real humans,
shot in the same room, in the same light, at the same floor level.
Reference-based: the new hero itself is passed to /v1/images/edits so the room,
the light and the wool characters cannot drift.
"""
import base64, json, os, sys, urllib.request, uuid
from pathlib import Path

KEY = os.environ["OPENAI_API_KEY"]
if KEY.startswith("sk-proj-sk-proj-"):
    KEY = KEY[len("sk-proj-"):]
HERE = Path(__file__).resolve().parent
REF = HERE.parent / "newsite" / "new-1.jpg"     # the new hero, portrait crop
OUT = HERE / "v2"
MODEL = "gpt-image-2"

WORLD = (
    "Use the reference photograph as the absolute source of truth for the SET and the "
    "CHARACTERS. Same room: warm apricot-cream plaster wall, soft pale wool carpet, warm "
    "diffused daylight with a gentle warm lamp glow, airy and uncluttered. Same floor-level "
    "camera at sitting height, photoreal, cinematic, soft natural depth of field, premium "
    "editorial photography. Any wool character that appears must be EXACTLY one of the "
    "reference's needle-felted knitted characters, unchanged in colour, face, hair and "
    "clothing. THE PERSON, HOWEVER, IS A REAL HUMAN BEING - a genuine photograph of a real "
    "person with real skin and real hair, NOT felt, NOT wool, NOT a puppet, NOT a doll - "
    "exactly as real as the man in the reference. Warm earthy knitwear wardrobe in the same "
    "palette as his cream sweater and brown trousers. No text, no logos, no lettering. "
    "Composition centred with headroom, the subject filling the middle of a square frame."
)

CAST = {
  "who-designer": (
    "A REAL WOMAN in her mid-thirties sitting cross-legged on the carpet, calm and quietly "
    "confident, mid-thought. Ordinary-attractive and completely relatable - not a glamorous "
    "model, not plain, a real good-looking person you would actually work with. Dark hair "
    "loosely tied back with a few strands loose, fine tortoiseshell glasses pushed up on her "
    "head. An oversized oatmeal knit cardigan over a charcoal top, soft wide trousers. An open "
    "laptop and a few paper wireframe sheets and coloured sticky notes on the carpet in front "
    "of her. She rests her chin on her hand, considering the work with a faint knowing "
    "half-smile. Beside her sits the TEAL wool character with the round gold glasses, the brown "
    "bow tie and the cream cable cardigan, writing in his little notebook."
  ),
  "who-builder": (
    "A REAL MAN in his late thirties sitting cross-legged on the carpet, warm, smart and "
    "magnetic, caught mid-sentence explaining an idea he clearly believes in, both hands open "
    "in front of him shaping something in the air. Ordinary-attractive and relatable - not a "
    "model, not a tech-bro stereotype. Short dark hair, a close-trimmed beard, laugh lines. A "
    "soft moss-green overshirt open over a plain white tee, sleeves pushed up, brown trousers. "
    "A ceramic mug and loose sketches on the carpet. Beside him sits the GINGER-BEARDED wool "
    "character in the teal-blue knitted beanie and the navy cable-knit sweater, leaning in at "
    "an open laptop, listening."
  ),
  "who-horizon": (
    "CLOSE, WAIST-UP FRAMING - the camera is near, the two figures FILL the frame, and only a "
    "little of the apricot wall shows behind them. A REAL WOMAN in her early fifties, elegant "
    "and completely self-possessed, holding small vintage brass BINOCULARS up to her eyes with "
    "both hands, scanning something far away past the camera. Silver-streaked dark hair in a "
    "soft low bun, a fine muted-violet silk scarf, a beautifully tailored oatmeal wool coat. "
    "She is standing on a neat stack of exactly TWO hardcover books to gain a few extra inches, "
    "which she is treating as an entirely reasonable thing to do. Absolutely dignified, no "
    "goofiness, no grin - the humour comes entirely from how seriously she is taking it. Close "
    "beside her, the MUSTARD-YELLOW wool character with the leafy tuft on its head looks up at "
    "her, mildly impressed."
  ),
}


def gen(name, subject):
    prompt = subject + " " + WORLD
    boundary = uuid.uuid4().hex
    parts = []

    def field(k, v):
        parts.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{k}\"\r\n\r\n{v}\r\n".encode())

    field("model", MODEL)
    field("size", "1024x1024")
    field("quality", "high")
    field("prompt", prompt)
    img = REF.read_bytes()
    parts.append((f"--{boundary}\r\nContent-Disposition: form-data; name=\"image[]\"; "
                  f"filename=\"hero.jpg\"\r\nContent-Type: image/jpeg\r\n\r\n").encode() + img + b"\r\n")
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
            print("FAIL", n, str(e)[:200], getattr(e, "read", lambda: b"")()[:400])
