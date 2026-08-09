import type { StorybookConfig } from "@storybook/html-vite";

/**
 * Storybook for the LIVE Product Lab site (productlab.studio).
 * Stories render the site's REAL HTML against the REAL styles.css, so the
 * design system can never drift from what actually ships.
 */
const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(js|ts)"],
  addons: [],
  framework: { name: "@storybook/html-vite", options: {} },
  // serve the site's assets at /assets so src="assets/..." resolves like production
  staticDirs: [{ from: "../assets", to: "/assets" }],
};

export default config;
