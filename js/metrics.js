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

// ===== ПРОСТАЯ ЗАГРУЗКА ЯНДЕКСА =====
window.loadYandexMetrica = function() {
    console.log('Яндекс: начинаем загрузку...');
    
    // Проверяем, не загружен ли уже
    if (window.ym) {
        console.log('Яндекс уже загружен');
        return;
    }
    
    // Создаем скрипт
    var script = document.createElement('script');
    script.src = WORKER_URL + '/proxy-script?url=' + encodeURIComponent('https://mc.yandex.ru/metrika/tag.js');
    script.async = true;
    
    // Когда скрипт загрузится
    script.onload = function() {
        console.log('✅ Скрипт Яндекса загружен, ждем инициализацию...');
        
        // Даем время на инициализацию
        setTimeout(function() {
            // Проверяем, создалась ли функция ym
            if (window.ym) {
                console.log('✅ Функция ym существует, инициализируем счетчик');
                
                // Инициализируем счетчик
                try {
                    window.ym(107164704, 'init', {
                        clickmap: true,
                        trackLinks: true,
                        accurateTrackBounce: true,
                        webvisor: true
                    });
                    console.log('✅ Яндекс Метрика полностью готова!');
                    
                    // Отправляем тест
                    window.ym(107164704, 'reachGoal', 'test');
                    console.log('📊 Тестовое событие отправлено');
                } catch (e) {
                    console.error('❌ Ошибка инициализации:', e);
                }
            } else {
                console.error('❌ Функция ym не создалась');
            }
        }, 1000);
    };
    
    script.onerror = function() {
        console.error('❌ Ошибка загрузки скрипта Яндекса');
    };
    
    document.head.appendChild(script);
};

// ===== ПРОСТАЯ ЗАГРУЗКА GOOGLE =====
window.loadGoogleAnalytics = function() {
    console.log('Google: начинаем загрузку...');
    
    if (window.gtag) {
        console.log('Google уже загружен');
        return;
    }
    
    // Создаем dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { dataLayer.push(arguments); };
    
    // Загружаем скрипт
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
    // Простая функция получения cookie
    function getCookie(name) {
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }
    
    // Получаем согласие
    var consent = getCookie('user_consent') || localStorage.getItem('user_consent');
    console.log('Статус согласия:', consent);
    
    // Если согласие есть - грузим
    if (consent === 'accepted') {
        console.log('Есть согласие, грузим метрики через 2 секунды...');
        setTimeout(function() {
            window.loadYandexMetrica();
            window.loadGoogleAnalytics();
        }, 2000);
    }
    
    // Слушаем событие
    document.addEventListener('consentGiven', function() {
        console.log('Получено событие consentGiven');
        window.loadYandexMetrica();
        window.loadGoogleAnalytics();
    });
})();

// Выводим справку в консоль
console.log('📊 Метрики готовы к загрузке. Команды:');
console.log('  loadYandexMetrica() - загрузить Яндекс');
console.log('  loadGoogleAnalytics() - загрузить Google');
console.log('  ym - проверить Яндекс');
console.log('  gtag - проверить Google');