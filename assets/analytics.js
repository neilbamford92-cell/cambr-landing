/* Cambr — analytics + consent. One file, loaded on every page.
   ---------------------------------------------------------------------------
   Nothing here runs until MEASUREMENT_ID is filled in: no banner, no network
   call, no storage. It is safe to ship before the GA4 property exists.

   WHY A BANNER AT ALL. UK PECR requires consent to store or read anything on a
   visitor's device unless an exception applies. The Data (Use and Access) Act
   2025 added a "statistical purposes" exception, but the ICO scopes it to cases
   where the sole purpose is your own statistics, the data is not shared onward,
   and it is not used for advertising. GA4 feeds Google's advertising ecosystem,
   so we do not rely on it.

   WHAT THE VISITOR SEES. Consent Mode v2 is set to denied BEFORE gtag.js loads,
   so until someone chooses, GA4 sends cookieless pings only: no identifiers are
   written. Accepting upgrades analytics_storage. Declining changes nothing, and
   is remembered so the banner stays gone.

   ⛔ ad_storage / ad_user_data / ad_personalization stay denied permanently here.
   We run no ads yet, so we do not ask for permission we have no use for. When
   paid starts, that is a deliberate edit and a change to the banner copy, not a
   flag to flip quietly.

   ⚠️ Reject must be as easy as accept (ICO). The two buttons are deliberately
   the same size and weight. Do not make "Accept" the prominent one.
*/
(function () {
  'use strict';

  // ──────────────────────────────────────────────────────────────────────────
  // Paste the GA4 Measurement ID here (looks like "G-XXXXXXXXXX").
  // Empty = the whole file no-ops.
  var MEASUREMENT_ID = 'G-42KLZHNL5B';   // cambr.uk web stream, created 2026-10-02
  // ──────────────────────────────────────────────────────────────────────────

  var CONSENT_KEY = 'cambr_consent';   // 'granted' | 'denied'
  var REF_KEY     = 'cambr_ref';       // written by the signup script in index.html

  if (!/^G-[A-Z0-9]+$/.test(MEASUREMENT_ID)) return;

  // --- storage helpers. Private browsing and locked-down browsers throw on
  // access, so every read and write is guarded; failure just means "no choice
  // recorded", which is the safe default.
  function readConsent() {
    try { return window.localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function writeConsent(v) {
    try { window.localStorage.setItem(CONSENT_KEY, v); } catch (e) { /* no-op */ }
  }
  function readRef() {
    try {
      var r = window.sessionStorage.getItem(REF_KEY);
      return /^[A-Za-z0-9_-]{1,32}$/.test(r || '') ? r : null;
    } catch (e) { return null; }
  }

  // --- gtag bootstrap
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  var stored = readConsent();

  // Consent Mode v2 defaults. MUST be pushed before gtag.js is fetched.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: stored === 'granted' ? 'granted' : 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  gtag('js', new Date());
  // No anonymize_ip: that is a Universal Analytics flag. GA4 ignores it and
  // drops the full IP natively, so passing it would imply a control we do not have.
  gtag('config', MEASUREMENT_ID);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
  document.head.appendChild(s);

  // --- public event helper. Wrapped so a failure here can never surface in a
  // caller: the signup path uses this, and analytics must never break a signup.
  window.cambrTrack = function (name, params) {
    try {
      var p = params || {};
      var ref = readRef();
      if (ref && !p.ref) p.ref = ref;
      gtag('event', name, p);
    } catch (e) { /* swallow */ }
  };

  // Outbound clicks are NOT handled here. GA4 Enhanced measurement (on by
  // default for this stream) already fires a `click` event for off-site links
  // carrying link_url, link_domain, link_classes and link_id. A second custom
  // event would be redundant and harder to read in reports.

  // --- banner.
  // build() is defined unconditionally so the choice can be reopened later:
  // withdrawing consent must be as easy as giving it, so a stored "granted" that
  // could never be revoked would not be lawful consent at all. The privacy page
  // calls cambrConsentReset() to bring this back.
  function injectCss() {
    if (document.getElementById('cambr-consent-css')) return;
    var css = document.createElement('style');
    css.id = 'cambr-consent-css';
    css.textContent = [
      '.cambr-consent{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;',
      'background:#141414;color:#F5F5F5;border-top:1px solid rgba(245,245,245,0.18);',
      'font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;',
      'padding:16px 20px;display:flex;flex-wrap:wrap;align-items:center;gap:14px 20px;',
      'justify-content:center;box-shadow:0 -8px 30px rgba(0,0,0,0.35)}',
      '.cambr-consent p{margin:0;font-size:14px;line-height:1.5;max-width:70ch;color:#C4C4C4}',
      '.cambr-consent a{color:#F5F5F5;text-decoration:underline}',
      '.cambr-consent a:hover{color:#D40000}',
      '.cambr-consent-actions{display:flex;gap:10px;flex:none}',
      '.cambr-consent button{font:inherit;font-size:13px;font-weight:600;cursor:pointer;',
      'padding:10px 18px;border-radius:8px;border:1px solid rgba(245,245,245,0.3);',
      'background:transparent;color:#F5F5F5;white-space:nowrap}',
      '.cambr-consent button:hover{border-color:#F5F5F5}',
      '@media (max-width:620px){.cambr-consent{justify-content:flex-start}',
      '.cambr-consent-actions{width:100%}.cambr-consent button{flex:1}}'
    ].join('');
    document.head.appendChild(css);
  }

  function build() {
    injectCss();
    if (document.querySelector('.cambr-consent')) return;

    var bar = document.createElement('div');
    bar.className = 'cambr-consent';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Analytics consent');

    var p = document.createElement('p');
    p.innerHTML = 'We would like to measure how this site is used so we can improve it. ' +
                  'No advertising, no tracking you across other sites. ' +
                  '<a href="/privacy/">How we handle your data</a>.';

    var actions = document.createElement('div');
    actions.className = 'cambr-consent-actions';

    function choose(value) {
      writeConsent(value);
      if (value === 'granted') gtag('consent', 'update', { analytics_storage: 'granted' });
      bar.remove();
    }
    // Equal weight, equal size. Declining is as easy as accepting.
    var no = document.createElement('button');
    no.type = 'button'; no.textContent = 'No thanks';
    no.addEventListener('click', function () { choose('denied'); });

    var yes = document.createElement('button');
    yes.type = 'button'; yes.textContent = 'That’s fine';
    yes.addEventListener('click', function () { choose('granted'); });

    actions.appendChild(no);
    actions.appendChild(yes);
    bar.appendChild(p);
    bar.appendChild(actions);
    document.body.appendChild(bar);
  }

  // Lets a visitor change their mind. Clears the stored choice, drops consent
  // back to denied immediately, and shows the banner again.
  window.cambrConsentReset = function () {
    try { window.localStorage.removeItem(CONSENT_KEY); } catch (e) { /* no-op */ }
    gtag('consent', 'update', { analytics_storage: 'denied' });
    if (!document.querySelector('.cambr-consent')) build();
  };

  // Only auto-show when no choice has been recorded.
  if (stored === 'granted' || stored === 'denied') return;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
