/* Product Lab site intro — the curtain.
 *
 * The rules are the spec, not decoration:
 *   - Once per SESSION (sessionStorage). Never on every navigation.
 *   - It NEVER blocks content. The veil is created by THIS script and by
 *     nothing else, so if the file 404s, is blocked, or throws, the visitor
 *     simply gets the site. Nothing in index.html is hidden waiting on it.
 *   - prefers-reduced-motion skips it ENTIRELY. No intro — not a slower one.
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
  var HEADS = ['yellow', 'orange', 'purple', 'teal'];   // beat order, per the approved cut

  try {
    // 1. Reduced motion — out before anything is created.
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // 2. Root route only. app.js is hash-routed (#/prep, #/…); a deep link or a
    //    sign-in redirect that lands with a hash must not sit behind a curtain.
    var h = window.location.hash || '';
    if (h !== '' && h !== '#' && h !== '#/') return;

    // 3. Once per session. A storage throw (private mode, cookies off) must not
    //    take the page down, so both sides are guarded independently.
    var seen = false;
    try { seen = !!window.sessionStorage.getItem(KEY); } catch (e) {}
    if (seen) return;
    try { window.sessionStorage.setItem(KEY, '1'); } catch (e) {}

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

    var gone = false;
    function end() {
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
