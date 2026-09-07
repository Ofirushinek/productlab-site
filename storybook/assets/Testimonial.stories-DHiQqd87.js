import{n as e,t}from"./_icons-BFdY0ZHI.js";import{t as n}from"./rolldown-runtime-Dh6celcD.js";var r,i,a,o,s,c;function l(){return(l=n((()=>{e(),r={title:`Components/Testimonial`,parameters:{docs:{description:{component:`Components / Testimonial — the quote card with the avatar, the LinkedIn
corner badge (minimal white disc, tooltip on hover), name and role.`}}}},i=({img:e,name:n,role:r,quote:i,li:a})=>`<figure class="quote-card">
     <figcaption class="quote-card__head">
       <span class="quote-card__avatarwrap">
         <span class="quote-card__avatar">${e?`<img src="assets/${e}.jpg?v=1" alt="${n}" />`:t.user}</span>
         ${a?`<a class="quote-card__li" href="${a}" target="_blank" rel="noopener" aria-label="${n} on LinkedIn" data-tooltip="LinkedIn" data-tip-pos="top">${t.linkedin}</a>`:``}
       </span>
       <span class="quote-card__who"><span class="quote-card__name"><strong>${n}</strong></span><span class="quote-card__role">${r}</span></span>
     </figcaption>
     <blockquote>${i}</blockquote>
   </figure>`,a={render:()=>`<div class="sb-pad"><div class="quote-grid" style="max-width:520px;margin:auto">${i({img:`testimonial-rona`,name:`Rona Galezer`,role:`Venture Builder & Impact Investor`,li:`#`,quote:`Ofir taught me to build and manage a team of autonomous AI agents, with no code required. Highly recommend.`})}</div></div>`},o={render:()=>`<div class="sb-pad"><div class="quote-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:900px;margin:auto">
       ${i({img:`testimonial-rona`,name:`Rona Galezer`,role:`Venture Builder & Impact Investor`,li:`#`,quote:`Highly recommend to anyone who wants to really use AI to build things, not just talk about them.`})}
       ${i({img:`testimonial-ella`,name:`Ella Cohen`,role:`Lead Product Designer`,li:`#`,quote:`I came away with a top-tier professional team and created my own work right after the session.`})}
     </div></div>`},s={name:`Without LinkedIn badge`,render:()=>`<div class="sb-pad"><div class="quote-grid" style="max-width:520px;margin:auto">${i({img:`testimonial-ella`,name:`Ella Cohen`,role:`Lead Product Designer`,quote:`A fallback state: no LinkedIn link, so no corner badge.`})}</div></div>`},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => \`<div class="sb-pad"><div class="quote-grid" style="max-width:520px;margin:auto">\${card({
    img: "testimonial-rona",
    name: "Rona Galezer",
    role: "Venture Builder & Impact Investor",
    li: "#",
    quote: "Ofir taught me to build and manage a team of autonomous AI agents, with no code required. Highly recommend."
  })}</div></div>\`
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => \`<div class="sb-pad"><div class="quote-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:900px;margin:auto">
       \${card({
    img: "testimonial-rona",
    name: "Rona Galezer",
    role: "Venture Builder & Impact Investor",
    li: "#",
    quote: "Highly recommend to anyone who wants to really use AI to build things, not just talk about them."
  })}
       \${card({
    img: "testimonial-ella",
    name: "Ella Cohen",
    role: "Lead Product Designer",
    li: "#",
    quote: "I came away with a top-tier professional team and created my own work right after the session."
  })}
     </div></div>\`
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: "Without LinkedIn badge",
  render: () => \`<div class="sb-pad"><div class="quote-grid" style="max-width:520px;margin:auto">\${card({
    img: "testimonial-ella",
    name: "Ella Cohen",
    role: "Lead Product Designer",
    quote: "A fallback state: no LinkedIn link, so no corner badge."
  })}</div></div>\`
}`,...s.parameters?.docs?.source}}},c=[`Single`,`Pair`,`NoLinkedIn`]})))()}l();export{s as NoLinkedIn,o as Pair,a as Single,c as __namedExportsOrder,r as default};