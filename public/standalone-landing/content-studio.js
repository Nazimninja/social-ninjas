// Absolute base URL — works from any host (Hostinger, Vercel, etc.)
const APP_BASE_URL = 'https://socialninjas.in';

window.goToApp = function(plan) {
  const params = plan ? '?plan=' + plan : '';
  const destination = APP_BASE_URL + '/#/app/content-studio' + params;

  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(4,4,12,.97);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;';
  overlay.innerHTML = `
    <div style="margin-bottom:24px"><div style="width:64px;height:64px;border-radius:18px;background:linear-gradient(135deg,#38bdf8,#0D1B3E);display:flex;align-items:center;justify-content:center;font-size:30px;">🥷</div></div>
    <h2 style="font-size:22px;font-weight:800;color:#fff;margin-bottom:10px;font-family:inherit">Opening your studio...</h2>
    <p style="font-size:14px;color:rgba(255,255,255,.45);margin-bottom:28px">Taking you to Social Ninja's AI Content Studio</p>
    <div style="width:200px;height:3px;background:rgba(255,255,255,.1);border-radius:3px;overflow:hidden">
      <div style="height:100%;background:linear-gradient(90deg,#38bdf8,#0ea5e9);border-radius:3px;animation:prog 1.2s ease forwards"></div>
    </div>
    <style>@keyframes prog{from{width:0}to{width:100%}}</style>
  `;
  document.body.appendChild(overlay);

  setTimeout(() => {
    window.location.href = destination;
  }, 1300);
}

window.signIn = function() {
  window.location.href = APP_BASE_URL + '/#/app/content-studio';
}
