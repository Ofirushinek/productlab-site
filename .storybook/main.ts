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
  staticDirs: [
    // the site's assets at /assets, so src="assets/..." resolves like production
    { from: "../assets", to: "/assets" },
    // the Brand section's artwork at /brand. Deliberately NOT in ../assets: these
    // are brand masters for the docs, not files the website serves.
    // Regenerate with: python3 scripts/build_brand_assets.py ~/ofir-agents-cloud
    { from: "../stories/brand/assets", to: "/brand" },
  ],
  // Published to productlab.studio/storybook/ (deploy-from-branch, subpath) — set
  // the Vite base so bundled asset URLs resolve under /storybook/ in production.
  async viteFinal(config) {
    config.base = "/storybook/";
    return config;
  },
};

export default config;
