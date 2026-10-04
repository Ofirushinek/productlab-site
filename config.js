/* =============================================================================
   PRODUCT LAB — launch config (ONE place to swap live values).
   Loaded by index.html AND thanks/index.html before any other site script.
   Everything below no-ops cleanly while empty, so the site is safe to ship
   with blanks — the buttons stay alive (they fall back to the existing
   register form), the Pixel simply does not load.
   ========================================================================== */
window.PL_CONFIG = {
  // TODO(Ofir): paste the ₪300 Stripe Payment Link here, e.g.
  //   "https://buy.stripe.com/xxxxxxxx"
  // Stripe → After payment → "Don't show confirmation page" → Redirect to:
  //   https://productlab.studio/thanks/?session_id={CHECKOUT_SESSION_ID}
  // (trailing slash on /thanks/ — the site is static, /thanks is a folder).
  // EMPTY = every "לשמור מקום" button opens the existing register form instead.
  STRIPE_LINK: "",

  // TODO(CSO/Ofir): Meta Pixel ID (digits only). EMPTY = Pixel never loads.
  PIXEL_ID: "",

  // Purchase value reported to Meta (Purchase on /thanks/, InitiateCheckout on CTA).
  PRICE_ILS: 300,
  CURRENCY: "ILS",
  PRODUCT_NAME: "Build with Claude",
};
