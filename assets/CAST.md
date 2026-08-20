# The cast — what these files are and which one replaces which

Marketing Designer, 2026-08-20. Nothing here is wired into `app.js` yet; that is the
Product Designer's call and his lane. This file exists so the swap needs no meeting.

## The rule the new hero set

The hero seats a **real photoreal human** at the same scale as the wool crew. That makes
the split for the whole site, and every future asset must keep it:

> **A wool creature is an AI agent. A real photographed person is a human being.**

Before this, the three "who it is for" tiles and the three crew portraits were the same six
puppets in the same three colours holding the same props, so a reader could not tell which
figure was meant to be them. That is what this set fixes.

## The swap

| New file | Replaces | Where it appears |
|---|---|---|
| `who-designer.webp`   | `tile-designer.png` | "who it is for" tile 1 — product and design people |
| `who-builder.webp`    | `tile-builder.png`  | "who it is for" tile 2 — builders and founders |
| `who-horizon.webp`    | `tile-nextai.png`   | "who it is for" tile 3 — horizon seekers |
| `crew-designer.webp`  | `agent-pd.png`      | crew roster — The Designer |
| `crew-strategist.webp`| `agent-cpo.png`     | crew roster — The Strategist |
| `crew-architect.webp` | `agent-cto.png`     | crew roster — The Architect |
| `hero-room.webp`      | `hero-even-2.webp`  | hero, desktop |
| `hero-room-mobile.webp`| `hero-mobile-2.webp`| hero, portrait mobile |

The tile images are index-mapped in `app.js` (~L1061) as
`["tile-designer","tile-builder","tile-nextai"][i]` against `who_tiles`. The order above
matches the current copy order; reorder the copy and the pictures silently mismatch.

## Two things to check when wiring

1. `.tilecard__illo` sets `background: #e9e0cd`, tuned to the OLD cream studio ground. The new
   images are the hero's apricot-cream room. Re-pick that value against the new art.
2. **The tile band is 13.5rem tall against a ~350px card, so `object-fit: cover` crops every
   image to roughly 1.5:1 from the centre — a square 1024 source loses its top and bottom 19%.**
   The crew portraits and two of the audience tiles survive it because those figures are SEATED
   and spread horizontally. The horizon tile did not: it was the one shot with a STANDING
   figure, and the live card cut her head off. It is now generated natively at **1536x1024**
   (`scripts/gen_people_wide.py`), seated like the other two, and the joke moved with the
   format — she no longer stands on books; the mustard-yellow character beside her is copying
   her with a rolled cardboard tube. **Compose to the destination ratio, and simulate the crop
   before shipping: resize to cover 700x432, centre-crop, then judge it.**

## Provenance

- **The two hero files were recovered from an artifact preview, not from an original.** The
  redesign was never committed to this repo, so `hero-room*.webp` are re-encodes of the JPEGs
  embedded in that page. They are good enough to ship but they are not masters. Replace them
  the moment Ofir sends the source PNGs.
- The other six were generated fresh against that hero as a reference, so the room, the light
  and the crew members are on-model rather than redrawn from a description.
- Full-quality PNG masters for all six are in `assets/masters/`. Use those as the `image[]`
  reference for any future character work — never re-prompt a character from words alone, it
  drifts. Recipes: `scripts/gen_people_v2.py`, `scripts/gen_agents_v2.py`.

## The new cast, as far as anyone has written it down

Read off the hero, because nothing defined it in text. Roles and names are Ofir's to confirm.

Ofir set this mapping on 2026-08-20. It is not guessable from the art, so do not re-derive it:

- **Teal, round gold glasses, brown bow tie, cream cardigan** → **The Architect** (CTO). At the laptop, wrench and gear beside him.
- **Ginger beard, teal knitted beanie, navy cable-knit** → **The Strategist** (product manager). Notepad and a plan of sticky notes.
- **Purple bobble curls, purple suit** → **The Designer**. Sketching a wireframe with a yellow pencil.
- **Mustard-yellow, leafy tuft, turtleneck** → **deliberately no role, and that is fine.** Ofir runs eleven agents and does not want them all listed out, so an unassigned cast member is correct, not a gap. He appears in the horizon tile.

The prop carries the role, so each prop moved with its role when the mapping was corrected. The pairing in the
audience tiles follows it too: the product-and-design woman sits with the purple Designer, and the builder sits
with the beanie Strategist.
