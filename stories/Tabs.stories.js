/**
 * Components / Tabs — the student-area tab bar (Course content / Students / …).
 * A flex row that aligns to the reading-start edge via flex-start (honors dir:
 * right in Hebrew RTL, left in English LTR). Active tab uses the accent underline.
 * Data-driven in app.js so more tabs can be added later. 2026-08-12.
 */
export default {
  title: "Components/Tabs",
};

const bar = (tabs, active) =>
  `<div class="tabs" role="tablist">
     ${tabs.map((label) => `<button type="button" class="tabs__btn" role="tab" aria-selected="${label === active ? "true" : "false"}">${label}</button>`).join("")}
   </div>`;

export const English = {
  render: () =>
    `<div class="sb-pad" dir="ltr" style="max-width:720px;margin:auto">${bar(["Course content", "Students"], "Course content")}</div>`,
};

export const Hebrew = {
  name: "Hebrew (RTL)",
  render: () =>
    `<div class="sb-pad" dir="rtl" style="max-width:720px;margin:auto">${bar(["תוכן הסדנה", "תלמידים"], "תוכן הסדנה")}</div>`,
};

export const StudentsActive = {
  name: "Second tab active",
  render: () =>
    `<div class="sb-pad" dir="ltr" style="max-width:720px;margin:auto">${bar(["Course content", "Students"], "Students")}</div>`,
};

export const ThreeTabs = {
  name: "Extensible — more tabs later",
  render: () =>
    `<div class="sb-pad" dir="ltr" style="max-width:720px;margin:auto">${bar(["Course content", "Students", "Resources"], "Course content")}</div>`,
};
