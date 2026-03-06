// ===== Yandex.Metrika counter =====
(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=107164704', 'ym');

ym(107164704, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});

// ===== Google Analytics =====
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XCK6M7C5DG');

// Загрузка Google Analytics скрипта с правильным nonce
(function() {
    // Проверяем, есть ли уже скрипт
    if (document.querySelector('script[src*="googletagmanager"]')) return;
    
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-XCK6M7C5DG';
    
    // Добавляем обработчик загрузки
    ga.onload = function() {
        console.log('Google Analytics loaded');
    };
    
    ga.onerror = function() {
        console.warn('Google Analytics failed to load');
    };
    
    document.head.appendChild(ga);
})();

// Добавляем обработку ошибок CSP
window.addEventListener('securitypolicyviolation', function(e) {
    if (e.blockedURI.includes('google-analytics') || e.blockedURI.includes('googletagmanager')) {
        console.warn('GA blocked by CSP, but metrics may still work');
    }
});