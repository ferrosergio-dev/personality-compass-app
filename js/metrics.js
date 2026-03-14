// ===== Cloudflare Web Analytics (всегда загружается, без баннера) =====
(function() {
    // Проверяем, не загружен ли уже
    if (document.querySelector('script[src*="beacon.min.js"]')) return;
    
    var cf = document.createElement('script');
    cf.defer = true;
    cf.nonce = document.querySelector('script[nonce]')?.getAttribute('nonce') || ''; // Добавляем nonce, если используется
    cf.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    cf.setAttribute('data-cf-beacon', '{"token": "bb34209412864a28b3b0bfd3b91ede16"}');
    document.head.appendChild(cf);
})();

// ===== Функции для загрузки метрик =====
window.loadYandexMetrica = function() {
    // Проверяем, не загружена ли уже
    if (window.ym && typeof window.ym === 'function') return;
    
    // Создаем скрипт через createElement вместо инлайн-кода
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://mc.yandex.ru/metrika/tag.js';
    script.nonce = document.querySelector('script[nonce]')?.getAttribute('nonce') || '';
    
    // Инициализация после загрузки скрипта
    script.onload = function() {
        if (window.ym) {
            window.ym(107164704, 'init', {
                ssr: true,
                webvisor: true,
                clickmap: true,
                ecommerce: "dataLayer",
                referrer: document.referrer,
                url: location.href,
                accurateTrackBounce: true,
                trackLinks: true
            });
            console.log('Yandex Metrica loaded (after consent)');
        }
    };
    
    document.head.appendChild(script);
};

window.loadGoogleAnalytics = function() {
    // Проверяем, не загружен ли уже
    if (document.querySelector('script[src*="googletagmanager"]')) return;
    
    // Инициализируем dataLayer до загрузки скрипта
    window.dataLayer = window.dataLayer || [];
    
    // Создаем функцию gtag глобально
    window.gtag = function() {
        window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', 'G-XCK6M7C5DG');
    
    // Загружаем скрипт GA
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-XCK6M7C5DG';
    ga.nonce = document.querySelector('script[nonce]')?.getAttribute('nonce') || '';
    
    // Добавляем обработчик ошибок загрузки
    ga.onerror = function() {
        console.warn('Google Analytics failed to load - possible CSP issue');
    };
    
    document.head.appendChild(ga);
    console.log('Google Analytics loaded (after consent)');
};

// ===== Проверка согласия при загрузке =====
(function() {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
    
    // Получаем согласие из cookie или localStorage
    const consent = getCookie('user_consent') || localStorage.getItem('user_consent');
    
    if (consent === 'accepted') {
        // Если согласие уже было, загружаем метрики сразу с небольшой задержкой
        // чтобы не блокировать основной контент
        setTimeout(function() {
            window.loadYandexMetrica();
            window.loadGoogleAnalytics();
        }, 100);
    }
    
    // Слушаем событие согласия (для случаев, когда баннер на той же странице)
    document.addEventListener('consentGiven', function() {
        window.loadYandexMetrica();
        window.loadGoogleAnalytics();
    });
})();

// Улучшенная обработка ошибок CSP
window.addEventListener('securitypolicyviolation', function(e) {
    const blockedResource = e.blockedURI || e.violatedDirective;
    
    if (blockedResource.includes('google-analytics') || 
        blockedResource.includes('googletagmanager') ||
        blockedResource.includes('yandex') ||
        blockedResource.includes('cloudflareinsights')) {
        
        console.warn(`CSP blocked: ${e.violatedDirective} - ${blockedResource}`);
        
        // Можно добавить логирование для отладки
        if (window.debugMode) {
            console.debug('CSP Violation Details:', {
                documentURI: e.documentURI,
                violatedDirective: e.violatedDirective,
                blockedURI: e.blockedURI,
                originalPolicy: e.originalPolicy
            });
        }
    }
});