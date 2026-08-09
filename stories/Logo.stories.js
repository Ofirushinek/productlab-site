/**
 * Brand / Logo — the current Product Lab identity: the violet "Product Lab"
 * wordmark (nav + footer sizes) and the felt-puppet mark.
 */
export default {
  title: "Brand/Logo",
};

export const Wordmark = {
  name: "Wordmark (nav)",
  render: () => `<div class="sb-pad"><a class="nav__brand nav__brand--text" href="#/">Product Lab</a></div>`,
};

export const WordmarkFooter = {
  name: "Wordmark (footer)",
  render: () => `<div class="sb-pad"><span class="footer__wordmark">Product Lab</span></div>`,
};

export const Mark = {
  name: "Puppet mark",
  render: () =>
    `<div class="sb-pad sb-row">
       <img src="assets/favicon.png" alt="Product Lab mark" width="72" height="72" style="border-radius:16px" />
       <img src="assets/logo/logo-solo-t.png" alt="Product Lab puppet" style="height:96px;width:auto" />
     </div>`,
};

export const Lockup = {
  name: "Mark + wordmark",
  render: () =>
    `<div class="sb-pad sb-row">
       <img src="assets/favicon.png" alt="" width="40" height="40" style="border-radius:10px" />
       <span class="nav__brand--text">Product Lab</span>
     </div>`,
};
