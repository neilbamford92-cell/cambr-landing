/* Launch switch: waitlist -> download, on every page that loads this file.
 *
 * ON LAUNCH DAY, edit this file only: live: true
 *   (both store URLs are already in: the App Store one is the app's Apple ID from App Store Connect, 9 Nov 2026,
 *   and only works once the listing is public. With live: false nothing shows it.)
 * Every CTA marked data-show="waitlist" hides, every one marked data-show="launch"
 * shows, and every link marked data-store="appStore" / "googlePlay" gets its URL. The convoy invite page's
 * Download Cambr (index.html, row 41.12) reads this too: waitlist = the sign-up, launch = the visitor's store.
 * The CSS that does the hiding sits next to each page's styles; search "Launch switch".
 *
 * Copy in prose and in JSON-LD does not flip with this. README > "Launch day" lists it.
 *
 * Loaded synchronously in <head> so the attribute is set before first paint and the
 * page never flashes the wrong CTA. Without JavaScript the page shows the waitlist. */
(function () {
  var LAUNCH = {
    live: false,
    appStore: 'https://apps.apple.com/gb/app/id6807563296',  // Apple ID 6807563296 (App Store Connect, uk.cambr.app)
    googlePlay: 'https://play.google.com/store/apps/details?id=uk.cambr.app'
  };

  document.documentElement.setAttribute('data-phase', LAUNCH.live ? 'launch' : 'waitlist');

  // Store links get their URLs only at launch, so before it the page is exactly its static HTML (no hidden link to a
  // listing that is not public yet).
  document.addEventListener('DOMContentLoaded', function () {
    if (!LAUNCH.live) return;
    document.querySelectorAll('a[data-store]').forEach(function (a) {
      var url = LAUNCH[a.getAttribute('data-store')];
      if (url) a.setAttribute('href', url);
      else console.warn('Cambr launch switch: no URL for', a.getAttribute('data-store'));
    });
  });

  window.cambrLaunch = LAUNCH;
})();
