// ===== Cloudflare Web Analytics =====
(function() {
    if (document.querySelector('script[src*="beacon.min.js"]')) return;
    
    var cf = document.createElement('script');
    cf.defer = true;
    cf.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    cf.setAttribute('data-cf-beacon', '{"token": "bb34209412864a28b3b0bfd3b91ede16"}');
    document.head.appendChild(cf);
})();

const WORKER_URL = 'https://consent-logger.compass-of-personality.workers.dev';

// ===== ЯНДЕКС МЕТРИКА - ИСПРАВЛЕННАЯ ВЕРСИЯ =====
window.loadYandexMetrica = function() {
    console.log('Яндекс: начинаем загрузку...');
    
    // Проверяем, не загружен ли уже
    if (window.ym) {
        console.log('Яндекс уже загружен');
        return;
    }
    
    // СОЗДАЁМ ФУНКЦИЮ ym ВРУЧНУЮ ДО ЗАГРУЗКИ СКРИПТА
    window.ym = function() {
        (window.ym.a = window.ym.a || []).push(arguments);
    };
    window.ym.l = Date.now();
    
    // Загружаем скрипт
    var script = document.createElement('script');
    script.src = WORKER_URL + '/proxy-script?url=' + encodeURIComponent('https://mc.yandex.ru/metrika/tag.js');
    script.async = true;
    
    script.onload = function() {
        console.log('✅ Скрипт Яндекса загружен');
        
        // Теперь инициализируем счетчик
        setTimeout(function() {
            try {
                window.ym(107164704, 'init', {
                    clickmap: true,
                    trackLinks: true,
                    accurateTrackBounce: true,
                    webvisor: true,
                    defer: true
                });
                console.log('✅ Яндекс Метрика инициализирована!');
                
                // Отправляем тест
                window.ym(107164704, 'reachGoal', 'test');
                console.log('📊 Тестовое событие отправлено');
                
                // Проверяем очередь
                console.log('Очередь событий:', window.ym.a);
            } catch (e) {
                console.error('❌ Ошибка инициализации:', e);
            }
        }, 1000);
    };
    
    script.onerror = function() {
        console.error('❌ Ошибка загрузки скрипта Яндекса');
    };
    
    document.head.appendChild(script);
};

// ===== GOOGLE ANALYTICS =====
window.loadGoogleAnalytics = function() {
    console.log('Google: начинаем загрузку...');
    
    if (window.gtag) {
        console.log('Google уже загружен');
        return;
    }
    
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { dataLayer.push(arguments); };
    
    var script = document.createElement('script');
    script.src = WORKER_URL + '/proxy-script?url=' + encodeURIComponent('https://www.googletagmanager.com/gtag/js?id=G-XCK6M7C5DG');
    script.async = true;
    
    script.onload = function() {
        console.log('✅ Скрипт Google загружен');
        
        setTimeout(function() {
            window.gtag('js', new Date());
            window.gtag('config', 'G-XCK6M7C5DG');
            console.log('✅ Google Analytics готов!');
        }, 500);
    };
    
    script.onerror = function() {
        console.error('❌ Ошибка загрузки Google');
    };
    
    document.head.appendChild(script);
};

// ===== ПРОВЕРКА СОГЛАСИЯ =====
(function() {
    function getCookie(name) {
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }
    
    var consent = getCookie('user_consent') || localStorage.getItem('user_consent');
    console.log('Статус согласия:', consent);
    
    if (consent === 'accepted') {
        console.log('✅ Есть согласие, грузим метрики...');
        setTimeout(function() {
            window.loadYandexMetrica();
            window.loadGoogleAnalytics();
        }, 1000);
    }
    
    document.addEventListener('consentGiven', function() {
        console.log('📢 Получено событие consentGiven');
        window.loadYandexMetrica();
        window.loadGoogleAnalytics();
    });
})();

console.log('📊 Команды для ручной загрузки:');
console.log('  loadYandexMetrica()');
console.log('  loadGoogleAnalytics()');