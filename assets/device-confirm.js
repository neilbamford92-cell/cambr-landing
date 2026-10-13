/* Cambr — /device/iphone and /device/android.
   ---------------------------------------------------------------------------
   Applies the "All iPhone" / "All Android" Kit tag to an existing subscriber who arrived from a
   broadcast link carrying ?s={{ subscriber.id }}.

   ⛔⛔ THE TAG IS APPLIED ON THE TAP, NEVER ON PAGE LOAD. Outlook, Gmail and most corporate mail
   security products fetch every link in an email before the human sees it, to scan it. A page
   that tags on load would therefore tag people who never opened the email, and would tag BOTH
   devices for anyone whose scanner follows both links. The button is the whole mechanism.

   ⚠️ The page must still read as a finished page if Kit fails. The person has done what was
   asked; a red error for something that is our problem to fix is not their concern. The failure
   is logged server-side with kit_ok = false and replayed from there.

   No Supabase key: the function is deployed --no-verify-jwt so this page carries no credential.
*/
(function () {
  'use strict';

  var FN = 'https://rjffhprkqukyydxsesoo.supabase.co/functions/v1/device-signup';

  var root = document.querySelector('[data-device]');
  if (!root) return;

  var device = root.getAttribute('data-device');          // 'iphone' | 'android'
  var btn    = root.querySelector('[data-confirm]');
  var done   = root.querySelector('[data-done]');
  var note   = root.querySelector('[data-note]');
  var noId   = root.querySelector('[data-noid]');

  // Kit renders {{ subscriber.id }} into the link. An integer, nothing else — anything that is
  // not one is treated as absent rather than passed on to the function.
  var raw = new URLSearchParams(window.location.search).get('s');
  var subscriberId = /^[0-9]{1,20}$/.test(raw || '') ? raw : null;

  if (!subscriberId) {
    // Most likely the link was forwarded, hand-typed, or the merge tag did not render. Say so
    // plainly and give them the one thing that does work.
    if (btn) btn.hidden = true;
    if (note) note.hidden = true;
    if (noId) noId.hidden = false;
    return;
  }

  btn.addEventListener('click', function () {
    btn.disabled = true;
    var original = btn.textContent;
    btn.textContent = 'Saving…';

    fetch(FN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscriber_id: Number(subscriberId), device: device })
    }).then(function (res) {
      // 502 means we reached the function but Kit refused. The row is logged for replay either
      // way, so from the person's side the job is done.
      finish(res.ok);
    }).catch(function () {
      finish(false);
    });

    function finish(ok) {
      btn.hidden = true;
      btn.textContent = original;
      if (note) note.hidden = true;
      if (done) done.hidden = false;
      if (window.cambrTrack) {
        window.cambrTrack('device_confirm', { device: device, tagged: ok });
      }
    }
  });
})();
