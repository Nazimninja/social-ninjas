window.goToApp = function(plan) {
  // Redirect to the main web app with the chosen plan pre-selected
  const APP_URL = '/app/content-studio'; // Use the HashRouter app url
  const params = plan ? '?plan=' + plan : '';
  
  // Show a brief redirect message
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(4,4,12,.97);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;';
  overlay.innerHTML = `
    <div style="margin-bottom:24px"><img src="/logo.png" style="height:96px;width:auto;object-fit:contain;"/></div>
    <h2 style="font-size:22px;font-weight:800;color:#fff;margin-bottom:10px;font-family:inherit">Opening your studio...</h2>
    <p style="font-size:14px;color:rgba(255,255,255,.45);margin-bottom:28px">Redirecting you to Social Ninja's Content Studio</p>
    <div style="width:200px;height:3px;background:rgba(255,255,255,.1);border-radius:3px;overflow:hidden">
      <div style="height:100%;background:#4A90D9;border-radius:3px;animation:prog 1.2s ease forwards"></div>
    </div>
    <style>@keyframes prog{from{width:0}to{width:100%}}</style>
  `;
  document.body.appendChild(overlay);
  
  // Actually redirect
  setTimeout(() => {
    window.location.href = APP_URL + params;
  }, 1300);
}

