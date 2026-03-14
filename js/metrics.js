// ===== Cloudflare Web Analytics (всегда загружается, без баннера) =====
(function() {
    // Проверяем, не загружен ли уже
    if (document.querySelector('script[src*="beacon.min.js"]')) return;
    
    var cf = document.createElement('script');
    cf.defer = true;
    cf.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    cf.setAttribute('data-cf-beacon', '{"token": "bb34209412864a28b3b0bfd3b91ede16"}');
    document.head.appendChild(cf);
})();

// ===== Функции для загрузки метрик =====
window.loadYandexMetrica = function() {
    // Проверяем, не загружена ли уже
    if (window.ym && typeof window.ym === 'function') return;
    
    // Yandex.Metrika counter
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');

    ym(107164704, 'init', {
        ssr:true, 
        webvisor:true, 
        clickmap:true, 
        ecommerce:"dataLayer", 
        referrer: document.referrer, 
        url: location.href, 
        accurateTrackBounce:true, 
        trackLinks:true
    });
    console.log('Yandex Metrica loaded (after consent)');
};

window.loadGoogleAnalytics = function() {
    // Проверяем, не загружен ли уже
    if (document.querySelector('script[src*="googletagmanager"]')) return;
    
    // Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XCK6M7C5DG');
    
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-XCK6M7C5DG';
    document.head.appendChild(ga);
    console.log('Google Analytics loaded (after consent)');
};

// ===== Проверка согласия при загрузке =====
(function() {
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    const consent = getCookie('user_consent') || localStorage.getItem('user_consent');
    
    if (consent === 'accepted') {
        // Если согласие уже было, загружаем метрики сразу
        window.loadYandexMetrica();
        window.loadGoogleAnalytics();
    }
    
    // Слушаем событие согласия (для случаев, когда баннер на той же странице)
    document.addEventListener('consentGiven', function() {
        window.loadYandexMetrica();
        window.loadGoogleAnalytics();
    });
})();

// Добавляем обработку ошибок CSP
window.addEventListener('securitypolicyviolation', function(e) {
    if (e.blockedURI.includes('google-analytics') || e.blockedURI.includes('googletagmanager')) {
        console.warn('GA blocked by CSP, but metrics may still work');
    }
});