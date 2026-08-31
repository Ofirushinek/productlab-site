/* Product Lab site intro — the curtain.
 *
 * The rules are the spec, not decoration:
 *   - Once per SESSION (sessionStorage), plus every explicit RELOAD. Never on
 *     every navigation.
 *   - It NEVER blocks content. The veil is created by THIS script and by
 *     nothing else, so if the file 404s, is blocked, or throws, the visitor
 *     simply gets the site. Nothing in index.html is hidden waiting on it.
 *   - prefers-reduced-motion skips it ENTIRELY. No intro — not a slower one.
 *   - It also ARMS THE HERO'S FIRST-LOAD ZOOM, by putting `pl-zoom` on <html>
 *     the moment the curtain begins to lift. That class is the only trigger
 *     for the zoom, so the zoom inherits every rule above for free: once a
 *     session, root route only, never under reduced motion, and not at all if
 *     this file fails — and it replays on a refresh for the same reason the
 *     curtain does. See the .hero__bg block in styles.css.
 *   - Total 3030ms. "snap" is the approved handover.
 *   - The heads are pre-normalised; every transform comes from the generated
 *     keyframes in assets/intro-keyframes.css. Nothing is scaled here.
 *
 * Loaded synchronously at the top of <body> on purpose: it has to run before
 * first paint, or the visitor sees the site and then gets a curtain dropped on
 * it. It is ~3KB, same-origin, and fully wrapped in try/catch.
 */
(function () {
  'use strict';

  var KEY = 'pl-intro-seen-v1';
  var DUR = 3030;               // must match --intro-dur in assets/intro-keyframes.css
  var LIFT = 2630;              // 86.799% of DUR — where @keyframes iveil starts fading
  var HEADS = ['yellow', 'orange', 'purple', 'teal'];   // beat order, per the approved cut

  try {
    // 1. Reduced motion — out before anything is created.
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // 2. Root route, OR #/kit — the branded "here's your kit" landing page a
    //    workshop participant lands on straight from a shared link with no
    //    prior visit; it gets the same first-arrival intro the homepage
    //    does. app.js is hash-routed (#/prep, #/…); every OTHER deep link or
    //    a sign-in redirect must still not sit behind a curtain.
    var h = window.location.hash || '';
    if (h !== '' && h !== '#' && h !== '#/' && h !== '#/kit') return;

    // 3. Once per session — EXCEPT on an explicit RELOAD. Ofir, 2026-08-24:
    //    hitting refresh has to replay the curtain, and with it the hero zoom
    //    this file arms. A reload is a deliberate "show me this page again";
    //    suppressing the one moment the visitor asked for is the wrong trade.
    //    Everything else keeps the once-per-session rule untouched — a deep
    //    link, a back/forward restore and an in-tab return all still get the
    //    site with no curtain, and a first arrival is unchanged.
    //    Guarded: if the Navigation Timing entry is missing or throws we fall
    //    back to `false`, i.e. exactly the old behaviour.
    var reloaded = false;
    try {
      var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
      reloaded = !!nav && nav.type === 'reload';
    } catch (e) {}

    //    A storage throw (private mode, cookies off) must not take the page
    //    down, so both sides are guarded independently.
    var seen = false;
    try { seen = !!window.sessionStorage.getItem(KEY); } catch (e) {}
    if (seen && !reloaded) return;
    try { window.sessionStorage.setItem(KEY, '1'); } catch (e) {}

    // Park the hero photo on its old framing NOW, while nothing is on screen
    // yet. The curtain is about to cover everything, so the visitor never sees
    // this state - they only ever see it move off it. styles.css, .hero__bg.
    try { document.documentElement.classList.add('pl-zoom-park'); } catch (e) {}

    var veil = document.createElement('div');
    veil.id = 'pl-intro';
    veil.className = 'intro-veil snap';
    veil.setAttribute('aria-hidden', 'true');   // decorative; the site behind is the content

    var stage = document.createElement('div');
    stage.className = 'stage';
    for (var i = 0; i < HEADS.length; i++) {
      var img = document.createElement('img');
      img.className = 'h-' + HEADS[i];
      img.src = 'assets/intro-' + HEADS[i] + '.webp';
      img.alt = '';
      img.decoding = 'async';
      // Only the first head is needed at t=0; the rest have a beat of runway and
      // must not outrank the hero preload.
      if (i === 0) img.setAttribute('fetchpriority', 'high');
      stage.appendChild(img);
    }
    veil.appendChild(stage);

    // Two lines. "Product" measures the assembled mark's width, "Lab" sits at
    // that same size, leading 0.92 (assets/intro.css). Approved compact lockup.
    var name = document.createElement('div');
    name.className = 'intro-name';
    var l1 = document.createElement('span'); l1.textContent = 'Product';
    var l2 = document.createElement('span'); l2.textContent = 'Lab';
    name.appendChild(l1);
    name.appendChild(l2);
    veil.appendChild(name);

    // Pull the wordmark face now. The name does not arrive until ~1.68s, so any
    // font swap happens while it is still at opacity 0 — invisible.
    try { if (document.fonts && document.fonts.load) document.fonts.load('600 1rem Fredoka'); } catch (e) {}

    document.body.appendChild(veil);

    // Arm the hero zoom. Idempotent, because two paths reach it: the timer at
    // LIFT, and an early dismissal — someone who taps at 800ms must get the
    // zoom under the curtain they just snapped away, not a jump at 2630ms.
    // If app.js has not painted the hero yet (it renders after `await
    // loadAuth()`), the class is simply already on <html> when the element
    // arrives, and the animation starts then. It cannot be missed.
    var armed = false;
    function arm() {
      if (armed) return;
      armed = true;
      try { document.documentElement.classList.add('pl-zoom'); } catch (e) {}
    }
    window.setTimeout(arm, LIFT);

    var gone = false;
    function end() {
      arm();
      if (gone) return;
      gone = true;
      veil.classList.add('pl-done');
      window.setTimeout(function () {
        if (veil.parentNode) veil.parentNode.removeChild(veil);
      }, 50);
    }

    veil.addEventListener('animationend', function (e) {
      if (e.animationName === 'iveil') end();
    });

    // Backstop: if animationend never fires (throttled background tab, animation
    // unsupported), the curtain still comes down.
    window.setTimeout(end, DUR + 500);

    // A curtain, not a gate — anyone who reaches for the page gets it at once.
    veil.addEventListener('pointerdown', end);
    window.addEventListener('keydown', end, { once: true });
  } catch (e) {
    /* the visitor simply gets the site */
  }
})();
