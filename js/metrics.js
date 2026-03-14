// ===== Cloudflare Web Analytics =====
(function() {
    if (document.querySelector('script[src*="beacon.min.js"]')) return;
    
    var cf = document.createElement('script');
    cf.defer = true;
    cf.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    cf.setAttribute('data-cf-beacon', '{"token": "bb34209412864a28b3b0bfd3b91ede16"}');
    document.head.appendChild(cf);
    console.log('Cloudflare loaded');
})();

// ===== Функции загрузки с гарантированной инициализацией =====
window.loadYandexMetrica = function() {
    return new Promise((resolve, reject) => {
        // Проверяем, загружена ли уже
        if (window.ym && typeof window.ym === 'function') {
            console.log('Yandex Metrica already loaded');
            resolve();
            return;
        }
        
        console.log('Loading Yandex Metrica...');
        
        // Загружаем скрипт
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://mc.yandex.ru/metrika/tag.js';
        
        script.onload = function() {
            try {
                // Инициализируем
                window.ym = window.ym || function() {
                    (window.ym.a = window.ym.a || []).push(arguments);
                };
                window.ym.l = Date.now();
                
                window.ym(107164704, 'init', {
                    id: 107164704,
                    clickmap: true,
                    trackLinks: true,
                    accurateTrackBounce: true,
                    webvisor: true,
                    ecommerce: "dataLayer"
                });
                
                // Проверяем, что ym работает
                if (window.ym && typeof window.ym === 'function') {
                    console.log('✅ Yandex Metrica loaded and initialized');
                    // Отправляем тестовое событие
                    window.ym(107164704, 'reachGoal', 'test_load');
                    resolve();
                } else {
                    reject(new Error('Yandex Metrica not available after load'));
                }
            } catch (e) {
                console.error('Yandex Metrica init error:', e);
                reject(e);
            }
        };
        
        script.onerror = function(e) {
            console.error('Failed to load Yandex Metrica script:', e);
            reject(e);
        };
        
        document.head.appendChild(script);
    });
};

window.loadGoogleAnalytics = function() {
    return new Promise((resolve, reject) => {
        // Проверяем, загружен ли уже
        if (window.gtag && typeof window.gtag === 'function') {
            console.log('Google Analytics already loaded');
            resolve();
            return;
        }
        
        console.log('Loading Google Analytics...');
        
        // Создаём dataLayer ДО загрузки скрипта
        window.dataLayer = window.dataLayer || [];
        
        // Создаём gtag функцию
        window.gtag = function() {
            window.dataLayer.push(arguments);
        };
        
        // Загружаем скрипт
        var ga = document.createElement('script');
        ga.async = true;
        ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-XCK6M7C5DG';
        
        ga.onload = function() {
            try {
                // Инициализируем после загрузки
                window.gtag('js', new Date());
                window.gtag('config', 'G-XCK6M7C5DG', {
                    send_page_view: true,
                    anonymize_ip: true
                });
                
                // Проверяем, что gtag работает
                setTimeout(() => {
                    if (window.gtag) {
                        console.log('✅ Google Analytics loaded and initialized');
                        // Отправляем тестовое событие
                        window.gtag('event', 'test_load', {
                            'event_category': 'test',
                            'event_label': 'consent_test'
                        });
                        resolve();
                    } else {
                        reject(new Error('Google Analytics not available after load'));
                    }
                }, 500);
            } catch (e) {
                console.error('Google Analytics init error:', e);
                reject(e);
            }
        };
        
        ga.onerror = function(e) {
            console.error('Failed to load Google Analytics script:', e);
            reject(e);
        };
        
        document.head.appendChild(ga);
    });
};

// ===== Проверка согласия =====
(function() {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }
    
    // Функция загрузки всех метрик
    async function loadAllMetrics() {
        console.log('Starting metrics load...');
        
        try {
            // Загружаем Яндекс
            await window.loadYandexMetrica();
        } catch (e) {
            console.error('Yandex Metrica failed:', e);
        }
        
        try {
            // Загружаем Google
            await window.loadGoogleAnalytics();
        } catch (e) {
            console.error('Google Analytics failed:', e);
        }
        
        // Финальная проверка через 2 секунды
        setTimeout(() => {
            console.log('Final metrics check:', {
                yandex: !!window.ym,
                google: !!window.gtag,
                dataLayerLength: window.dataLayer?.length || 0
            });
            
            // Пробуем ещё раз отправить тестовое событие
            if (window.ym) {
                window.ym(107164704, 'reachGoal', 'delayed_test');
            }
            if (window.gtag) {
                window.gtag('event', 'delayed_test', { 'event_category': 'test' });
            }
        }, 2000);
    }
    
    // Читаем согласие
    const consent = getCookie('user_consent') || localStorage.getItem('user_consent');
    console.log('User consent:', consent);
    
    if (consent === 'accepted') {
        // Загружаем после полной загрузки страницы
        if (document.readyState === 'complete') {
            setTimeout(loadAllMetrics, 500);
        } else {
            window.addEventListener('load', () => setTimeout(loadAllMetrics, 500));
        }
    }
    
    // Слушаем событие согласия
    document.addEventListener('consentGiven', function() {
        console.log('Consent given event received');
        loadAllMetrics();
    });
})();

// ===== CSP мониторинг =====
window.addEventListener('securitypolicyviolation', function(e) {
    console.group('🔒 CSP Violation');
    console.log('Directive:', e.violatedDirective);
    console.log('Blocked:', e.blockedURI);
    console.log('Document:', e.documentURI);
    console.groupEnd();
});