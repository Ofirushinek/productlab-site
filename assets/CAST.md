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
2. These are square (1024). The tile band is short and wide (`13.5rem`, `object-fit: cover`),
   so each one gets centre-cropped to a strip. All six were composed with headroom for that,
   but check the horizon tile in particular — its first take was framed too wide and had to be
   reshot closer for exactly this reason.

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
