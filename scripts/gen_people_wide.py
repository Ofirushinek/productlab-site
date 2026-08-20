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
  # LANDSCAPE 1536x1024 for the tile band (13.5rem tall against a ~350px card = ~1.5:1,
  # centre-cropped). A standing figure cannot survive that crop, so the joke moved from
  # vertical (standing on books) to horizontal (the small one copying her).
  "who-horizon-a": (
    "A REAL WOMAN in her early fifties sitting cross-legged on the pale carpet, elegant and "
    "completely self-possessed, leaning slightly forward and holding small vintage brass "
    "BINOCULARS up to her eyes with both hands, scanning something far away past the camera. "
    "Silver-streaked dark hair in a soft low bun, a fine muted-violet silk scarf, a beautifully "
    "tailored oatmeal wool jacket, soft brown trousers. A small stack of hardcover books and a "
    "cup on the carpet beside her. To her side sits the MUSTARD-YELLOW wool character with the "
    "leafy tuft on its head and the knitted turtleneck, holding a short rolled cardboard TUBE "
    "up to one eye like a makeshift telescope, copying her exactly, aimed the same way. "
    "BOTH ARE ENTIRELY SERIOUS - no grin, no mugging; the humour is that the little one is "
    "copying her and she has not noticed."
  ),
  "who-horizon-b": (
    "A REAL WOMAN in her early fifties kneeling up on the pale carpet, elegant and completely "
    "self-possessed, holding small vintage brass BINOCULARS up to her eyes with both hands and "
    "scanning the far distance past the camera. Silver-streaked dark hair in a soft low bun, a "
    "fine muted-violet silk scarf, a tailored oatmeal wool jacket. She is kneeling on a low "
    "neat stack of exactly THREE hardcover books, treating this as an entirely reasonable way "
    "to gain a better view. Well to her side, with clear open carpet between them, sits the "
    "MUSTARD-YELLOW wool character with the leafy tuft and knitted turtleneck, looking up at "
    "her, mildly impressed. WIDE HORIZONTAL COMPOSITION - the two figures are spread apart "
    "across the frame rather than stacked, and both sit low in a wide shallow band. Dignified, "
    "no goofiness, no grin."
  ),
}


def gen(name, subject):
    prompt = subject + " " + WORLD
    boundary = uuid.uuid4().hex
    parts = []

    def field(k, v):
        parts.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{k}\"\r\n\r\n{v}\r\n".encode())

    field("model", MODEL)
    field("size", "1536x1024")
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
