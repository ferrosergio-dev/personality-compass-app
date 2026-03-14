// ===== Cloudflare Web Analytics (загружаем напрямую, он должен работать) =====
(function() {
    if (document.querySelector('script[src*="beacon.min.js"]')) return;
    
    var cf = document.createElement('script');
    cf.defer = true;
    cf.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    cf.setAttribute('data-cf-beacon', '{"token": "bb34209412864a28b3b0bfd3b91ede16"}');
    cf.onerror = function() {
        console.log('Cloudflare beacon blocked, но это не критично');
    };
    document.head.appendChild(cf);
})();

// ===== Базовый URL вашего воркера =====
const WORKER_URL = 'https://consent-logger.compass-of-personality.workers.dev';

// ===== Функция для проксирования скриптов через воркер =====
async function loadScriptViaWorker(scriptUrl, scriptType) {
    return new Promise((resolve, reject) => {
        try {
            // Создаём уникальный callback для JSONP
            const callbackName = `jsonp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            
            // Создаём скрипт для загрузки через воркер
            const script = document.createElement('script');
            
            // Для Яндекс.Метрики используем JSONP, для Google - прокси
            if (scriptType === 'yandex') {
                // Яндекс Метрика поддерживает JSONP
                script.src = `${WORKER_URL}/proxy?url=${encodeURIComponent(scriptUrl)}&callback=${callbackName}`;
            } else {
                // Для Google используем прокси с CORS
                script.src = `${WORKER_URL}/proxy-js?url=${encodeURIComponent(scriptUrl)}`;
            }
            
            // Создаём глобальную функцию для JSONP ответа
            if (scriptType === 'yandex') {
                window[callbackName] = function(data) {
                    delete window[callbackName];
                    resolve(data);
                };
            }
            
            script.onload = function() {
                if (scriptType !== 'yandex') {
                    // Для Google просто ждём загрузки
                    setTimeout(() => {
                        resolve();
                    }, 500);
                }
            };
            
            script.onerror = function(error) {
                reject(new Error(`Failed to load ${scriptType} script`));
            };
            
            document.head.appendChild(script);
            
        } catch (error) {
            reject(error);
        }
    });
}

// ===== Функции загрузки метрик =====
window.loadYandexMetrica = async function() {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Loading Yandex Metrica via proxy...');
            
            // Сначала проверяем, не загружена ли уже
            if (window.ym && typeof window.ym === 'function') {
                console.log('Yandex Metrica already loaded');
                resolve();
                return;
            }
            
            // Создаём функцию ym до загрузки скрипта
            window.ym = window.ym || function() {
                (window.ym.a = window.ym.a || []).push(arguments);
            };
            window.ym.l = Date.now();
            
            // Загружаем скрипт через воркер
            await loadScriptViaWorker('https://mc.yandex.ru/metrika/tag.js', 'yandex');
            
            // Даём время на инициализацию
            setTimeout(() => {
                try {
                    window.ym(107164704, 'init', {
                        id: 107164704,
                        clickmap: true,
                        trackLinks: true,
                        accurateTrackBounce: true,
                        webvisor: true,
                        defer: true
                    });
                    
                    console.log('✅ Yandex Metrica initialized');
                    resolve();
                } catch (e) {
                    console.error('Yandex init error:', e);
                    reject(e);
                }
            }, 1000);
            
        } catch (error) {
            console.error('Yandex Metrica failed:', error);
            reject(error);
        }
    });
};

window.loadGoogleAnalytics = async function() {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Loading Google Analytics via proxy...');
            
            // Проверяем, загружен ли уже
            if (window.gtag && typeof window.gtag === 'function') {
                console.log('Google Analytics already loaded');
                resolve();
                return;
            }
            
            // Создаём dataLayer
            window.dataLayer = window.dataLayer || [];
            
            // Создаём gtag функцию
            window.gtag = function() {
                window.dataLayer.push(arguments);
            };
            
            // Загружаем скрипт через воркер
            await loadScriptViaWorker('https://www.googletagmanager.com/gtag/js?id=G-XCK6M7C5DG', 'google');
            
            // Инициализируем
            window.gtag('js', new Date());
            window.gtag('config', 'G-XCK6M7C5DG', {
                send_page_view: true,
                anonymize_ip: true
            });
            
            console.log('✅ Google Analytics initialized');
            resolve();
            
        } catch (error) {
            console.error('Google Analytics failed:', error);
            reject(error);
        }
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
    
    async function loadAllMetrics() {
        console.log('Starting metrics load via proxy...');
        
        // Загружаем последовательно
        await window.loadYandexMetrica();
        await window.loadGoogleAnalytics();
        
        console.log('All metrics loaded');
    }
    
    // Читаем согласие
    const consent = getCookie('user_consent') || localStorage.getItem('user_consent');
    console.log('User consent:', consent);
    
    if (consent === 'accepted') {
        if (document.readyState === 'complete') {
            setTimeout(loadAllMetrics, 1000);
        } else {
            window.addEventListener('load', () => setTimeout(loadAllMetrics, 1000));
        }
    }
    
    // Слушаем событие согласия
    document.addEventListener('consentGiven', function() {
        console.log('Consent given event received');
        loadAllMetrics();
    });
})();