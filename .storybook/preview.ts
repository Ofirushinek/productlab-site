import type { Preview } from "@storybook/html-vite";
import "../styles.css";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true }, // tokens set the canvas
    options: {
      storySort: {
        order: ["Overview", "Foundations", "Brand", "UI", "Components", "Sections"],
      },
    },
  },
  // Toolbar switch: preview any story in English (LTR) or Hebrew (RTL).
  globalTypes: {
    dir: {
      description: "Text direction",
      defaultValue: "ltr",
      toolbar: {
        title: "Direction",
        icon: "transfer",
        items: [
          { value: "ltr", title: "LTR (English)" },
          { value: "rtl", title: "RTL (Hebrew)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const dir = context.globals.dir ?? "ltr";
      document.documentElement.setAttribute("dir", dir);
      document.documentElement.setAttribute("lang", dir === "rtl" ? "he" : "en");
      return story();
    },
  ],
};

export default preview;
