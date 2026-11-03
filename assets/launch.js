/* Launch switch: waitlist -> download, on every page that loads this file.
 *
 * ON LAUNCH DAY, edit this file only:
 *   1. live: true
 *   2. paste the App Store URL into appStore
 * Every CTA marked data-show="waitlist" hides, every one marked data-show="launch"
 * shows, and every link marked data-store="appStore" / "googlePlay" gets its URL.
 * The CSS that does the hiding sits next to each page's styles; search "Launch switch".
 *
 * Copy in prose and in JSON-LD does not flip with this. README > "Launch day" lists it.
 *
 * Loaded synchronously in <head> so the attribute is set before first paint and the
 * page never flashes the wrong CTA. Without JavaScript the page shows the waitlist. */
(function () {
  var LAUNCH = {
    live: false,
    appStore: '',  // e.g. https://apps.apple.com/gb/app/cambr/id0000000000
    googlePlay: 'https://play.google.com/store/apps/details?id=uk.cambr.app'
  };

  document.documentElement.setAttribute('data-phase', LAUNCH.live ? 'launch' : 'waitlist');

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[data-store]').forEach(function (a) {
      var url = LAUNCH[a.getAttribute('data-store')];
      if (url) a.setAttribute('href', url);
      else if (LAUNCH.live) console.warn('Cambr launch switch: no URL for', a.getAttribute('data-store'));
    });
  });

  window.cambrLaunch = LAUNCH;
})();
