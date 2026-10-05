/* =============================================================================
   PRODUCT LAB — launch config (ONE place to swap live values).
   Loaded by index.html AND thanks/index.html before any other site script.
   Everything below no-ops cleanly while empty: the Pixel simply does not load.
   ========================================================================== */
window.PL_CONFIG = {
  // Generic payment-link slot, UNUSED for the 2026-10 cohorts (CPO, 2026-10-04:
  // no Stripe for Israel yet; flow = register form -> Ofir calls -> invoice).
  // Left empty on purpose; nothing reads it today.
  PAYMENT_LINK: "",

  // TODO(CSO/Ofir): Meta Pixel ID (digits only). EMPTY = Pixel never loads.
  PIXEL_ID: "",

  // Value attached to the Meta `Lead` event (fired once on a successful form submit).
  PRICE_ILS: 290,
  CURRENCY: "ILS",
  PRODUCT_NAME: "Build with Claude",
};
