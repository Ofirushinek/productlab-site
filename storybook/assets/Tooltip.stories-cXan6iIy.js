import{n as e,t}from"./_icons-BFdY0ZHI.js";import{t as n}from"./rolldown-runtime-Dh6celcD.js";var r,i,a,o,s,c,l,u,d;function f(){return(f=n((()=>{e(),r={title:`UI/Tooltip`},i=(e,t,n=``)=>`<button type="button" aria-label="${e}" data-tooltip="${e}" ${n}
     style="width:40px;height:40px;display:grid;place-items:center;cursor:pointer;
            border:1px solid var(--pl-border-strong);border-radius:var(--radius-md);
            background:var(--pl-surface);color:var(--pl-fg)">
     <span style="width:20px;height:20px;display:inline-flex">${t}</span>
   </button>`,a={name:`Default (below)`,render:()=>`<div class="sb-pad" style="padding-top:24px">${i(`Menu`,t.menu)}</div>`},o={name:`Above (data-tip-pos)`,render:()=>`<div class="sb-pad" style="padding-top:64px">${i(`Menu`,t.menu,`data-tip-pos="top"`)}</div>`},s={name:`Icon-only controls (the rule)`,render:()=>`<div class="sb-pad sb-row" style="padding-top:24px; gap:32px">
       ${i(`Menu`,t.menu)}
       ${i(`Account`,t.user)}
       ${i(`Close`,t.x)}
     </div>`},c={name:`Always open (docs)`,parameters:{docs:{description:{story:`Forced-open so Chromatic/docs capture the bubble; not for production.`}}},render:()=>{let e=document.createElement(`div`);e.className=`sb-pad`,e.style.paddingTop=`72px`,e.innerHTML=i(`LinkedIn`,t.linkedin,`data-tip-pos="top"`);let n=document.createElement(`style`);return n.textContent=`[data-tooltip]::after,[data-tooltip]::before{opacity:1 !important;transform:translateX(-50%) translateY(0)!important}`,e.appendChild(n),e}},l={name:`Light theme (content, 2 lines)`,render:()=>`<div class="sb-pad" style="padding-top:72px">
    <button type="button" class="btn btn--ghost" data-tooltip="המעצב&#10;מעצב המוצר" data-tip-theme="light" data-tip-pos="top">hover me</button>
  </div>`},u={name:`Light theme, pinned (data-tip-open)`,render:()=>`<div class="sb-pad" style="padding-top:72px">
    <button type="button" class="btn btn--ghost" data-tooltip="המעצב&#10;מעצב המוצר" data-tip-theme="light" data-tip-pos="top" data-tip-open>pinned</button>
  </div>`},d=[`Bottom`,`Top`,`IconOnlyControls`,`AlwaysOpenPreview`,`Light`,`LightPinned`]})))()}f();export{c as AlwaysOpenPreview,a as Bottom,s as IconOnlyControls,l as Light,u as LightPinned,o as Top,d as __namedExportsOrder,r as default};