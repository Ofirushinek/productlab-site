import{n as e,t}from"./_icons-BFdY0ZHI.js";import{t as n}from"./rolldown-runtime-Dh6celcD.js";var r,i,a,o,s,c,l;function u(){return(u=n((()=>{e(),r={title:`UI/Tooltip`,parameters:{docs:{description:{component:'UI / Tooltip — dark bubble for ICON-ONLY controls.\nRULE: any button/link that shows only an icon MUST carry `data-tooltip="Label"`\n(label matches its aria-label). Shows on hover AND keyboard focus.\nAdd `data-tip-pos="top"` to flip the bubble above.'}}}},i=(e,t,n=``)=>`<button type="button" aria-label="${e}" data-tooltip="${e}" ${n}
     style="width:40px;height:40px;display:grid;place-items:center;cursor:pointer;
            border:1px solid var(--pl-border-strong);border-radius:var(--radius-md);
            background:var(--pl-surface);color:var(--pl-fg)">
     <span style="width:20px;height:20px;display:inline-flex">${t}</span>
   </button>`,a={name:`Default (below)`,render:()=>`<div class="sb-pad" style="padding-top:24px">${i(`Menu`,t.menu)}</div>`},o={name:`Above (data-tip-pos)`,render:()=>`<div class="sb-pad" style="padding-top:64px">${i(`Menu`,t.menu,`data-tip-pos="top"`)}</div>`},s={name:`Icon-only controls (the rule)`,render:()=>`<div class="sb-pad sb-row" style="padding-top:24px; gap:32px">
       ${i(`Menu`,t.menu)}
       ${i(`Account`,t.user)}
       ${i(`Close`,t.x)}
     </div>`},c={name:`Always open (docs)`,parameters:{docs:{description:{story:`Forced-open so Chromatic/docs capture the bubble; not for production.`}}},render:()=>{let e=document.createElement(`div`);e.className=`sb-pad`,e.style.paddingTop=`72px`,e.innerHTML=i(`LinkedIn`,t.linkedin,`data-tip-pos="top"`);let n=document.createElement(`style`);return n.textContent=`[data-tooltip]::after,[data-tooltip]::before{opacity:1 !important;transform:translateX(-50%) translateY(0)!important}`,e.appendChild(n),e}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: "Default (below)",
  render: () => \`<div class="sb-pad" style="padding-top:24px">\${iconBtn("Menu", I.menu)}</div>\`
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: "Above (data-tip-pos)",
  render: () => \`<div class="sb-pad" style="padding-top:64px">\${iconBtn("Menu", I.menu, 'data-tip-pos="top"')}</div>\`
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: "Icon-only controls (the rule)",
  render: () => \`<div class="sb-pad sb-row" style="padding-top:24px; gap:32px">
       \${iconBtn("Menu", I.menu)}
       \${iconBtn("Account", I.user)}
       \${iconBtn("Close", I.x)}
     </div>\`
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: "Always open (docs)",
  parameters: {
    docs: {
      description: {
        story: "Forced-open so Chromatic/docs capture the bubble; not for production."
      }
    }
  },
  render: () => {
    const wrap = document.createElement("div");
    wrap.className = "sb-pad";
    wrap.style.paddingTop = "72px";
    wrap.innerHTML = iconBtn("LinkedIn", I.linkedin, 'data-tip-pos="top"');
    const style = document.createElement("style");
    style.textContent = '[data-tooltip]::after,[data-tooltip]::before{opacity:1 !important;transform:translateX(-50%) translateY(0)!important}';
    wrap.appendChild(style);
    return wrap;
  }
}`,...c.parameters?.docs?.source}}},l=[`Bottom`,`Top`,`IconOnlyControls`,`AlwaysOpenPreview`]})))()}u();export{c as AlwaysOpenPreview,a as Bottom,s as IconOnlyControls,o as Top,l as __namedExportsOrder,r as default};