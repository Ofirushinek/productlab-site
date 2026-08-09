import { I } from "./_icons.js";

/**
 * Components / Testimonial — the quote card with the avatar, the LinkedIn
 * corner badge (minimal white disc, tooltip on hover), name and role.
 */
export default {
  title: "Components/Testimonial",
};

const card = ({ img, name, role, quote, li }) =>
  `<figure class="quote-card">
     <figcaption class="quote-card__head">
       <span class="quote-card__avatarwrap">
         <span class="quote-card__avatar">${img ? `<img src="assets/${img}.jpg?v=1" alt="${name}" />` : I.user}</span>
         ${li ? `<a class="quote-card__li" href="${li}" target="_blank" rel="noopener" aria-label="${name} on LinkedIn" data-tooltip="LinkedIn" data-tip-pos="top">${I.linkedin}</a>` : ""}
       </span>
       <span class="quote-card__who"><span class="quote-card__name"><strong>${name}</strong></span><span class="quote-card__role">${role}</span></span>
     </figcaption>
     <blockquote>${quote}</blockquote>
   </figure>`;

export const Single = {
  render: () =>
    `<div class="sb-pad"><div class="quote-grid" style="max-width:520px;margin:auto">${card({
      img: "testimonial-rona",
      name: "Rona Galezer",
      role: "Venture Builder & Impact Investor",
      li: "#",
      quote:
        "Ofir taught me to build and manage a team of autonomous AI agents, with no code required. Highly recommend.",
    })}</div></div>`,
};

export const Pair = {
  render: () =>
    `<div class="sb-pad"><div class="quote-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:900px;margin:auto">
       ${card({ img: "testimonial-rona", name: "Rona Galezer", role: "Venture Builder & Impact Investor", li: "#", quote: "Highly recommend to anyone who wants to really use AI to build things, not just talk about them." })}
       ${card({ img: "testimonial-ella", name: "Ella Cohen", role: "Lead Product Designer", li: "#", quote: "I came away with a top-tier professional team and created my own work right after the session." })}
     </div></div>`,
};

export const NoLinkedIn = {
  name: "Without LinkedIn badge",
  render: () =>
    `<div class="sb-pad"><div class="quote-grid" style="max-width:520px;margin:auto">${card({
      img: "testimonial-ella",
      name: "Ella Cohen",
      role: "Lead Product Designer",
      quote: "A fallback state: no LinkedIn link, so no corner badge.",
    })}</div></div>`,
};
