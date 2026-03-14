// ===== Cloudflare Web Analytics =====
(function() {
    if (document.querySelector('script[src*="beacon.min.js"]')) return;
    
    var cf = document.createElement('script');
    cf.defer = true;
    cf.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    cf.setAttribute('data-cf-beacon', '{"token": "bb34209412864a28b3b0bfd3b91ede16"}');
    cf.onerror = () => console.log('Cloudflare beacon blocked (optional)');
    document.head.appendChild(cf);
})();

const WORKER_URL = 'https://consent-logger.compass-of-personality.workers.dev';

// ===== Загрузка скриптов через прокси =====
function loadScriptViaProxy(scriptUrl) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `${WORKER_URL}/proxy-script?url=${encodeURIComponent(scriptUrl)}`;
        
        script.onload = () => {
            console.log(`✅ Script loaded: ${scriptUrl}`);
            resolve();
        };
        
        script.onerror = (error) => {
            console.error(`❌ Failed to load: ${scriptUrl}`, error);
            reject(new Error(`Failed to load script: ${scriptUrl}`));
        };
        
        document.head.appendChild(script);
    });
}

// ===== Yandex Metrica (ИСПРАВЛЕНО) =====
window.loadYandexMetrica = async function() {
    return new Promise(async (resolve, reject) => {
        try {
            // Проверяем, не загружена ли уже
            if (window.ym && typeof window.ym === 'function' && window.ym.a) {
                console.log('Yandex Metrica already loaded');
                resolve();
                return;
            }

            console.log('Loading Yandex Metrica...');
            
            // Загружаем скрипт через прокси
            await loadScriptViaProxy('https://mc.yandex.ru/metrika/tag.js');
            
            // Даём время на инициализацию
            setTimeout(() => {
                try {
                    // Инициализируем правильным способом
                    (function(m,e,t,r,i,k,a){
                        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                        m[i].l=1*new Date();
                    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
                    
                    // Теперь инициализируем счётчик
                    window.ym(107164704, 'init', {
                        clickmap: true,
                        trackLinks: true,
                        accurateTrackBounce: true,
                        webvisor: true,
                        defer: true
                    });
                    
                    console.log('✅ Yandex Metrica initialized');
                    
                    // Проверяем через секунду
                    setTimeout(() => {
                        console.log('Yandex status:', {
                            ymExists: !!window.ym,
                            ymIsFunction: typeof window.ym === 'function',
                            ymAExists: !!window.ym?.a,
                            ymA: window.ym?.a
                        });
                        
                        // Отправляем тестовое событие
                        if (window.ym) {
                            window.ym(107164704, 'reachGoal', 'test_after_init');
                            console.log('Test event sent to Yandex');
                        }
                    }, 1000);
                    
                    resolve();
                } catch (e) {
                    console.error('Yandex init error:', e);
                    reject(e);
                }
            }, 500);
            
        } catch (error) {
            console.error('Yandex Metrica error:', error);
            reject(error);
        }
    });
};

// ===== Google Analytics (работает) =====
window.loadGoogleAnalytics = async function() {
    return new Promise(async (resolve, reject) => {
        try {
            if (window.gtag && typeof window.gtag === 'function') {
                console.log('Google Analytics already loaded');
                resolve();
                return;
            }

            console.log('Loading Google Analytics...');
            
            window.dataLayer = window.dataLayer || [];
            window.gtag = function() { dataLayer.push(arguments); };
            
            await loadScriptViaProxy('https://www.googletagmanager.com/gtag/js?id=G-XCK6M7C5DG');
            
            setTimeout(() => {
                window.gtag('js', new Date());
                window.gtag('config', 'G-XCK6M7C5DG');
                console.log('✅ Google Analytics ready');
                resolve();
            }, 500);
            
        } catch (error) {
            console.error('Google Analytics error:', error);
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
        console.log('Loading metrics...');
        
        // Загружаем Яндекс
        try {
            await window.loadYandexMetrica();
        } catch (e) {
            console.error('Yandex failed:', e);
        }
        
        // Загружаем Google
        try {
            await window.loadGoogleAnalytics();
        } catch (e) {
            console.error('Google failed:', e);
        }
        
        console.log('All metrics loaded');
    }
    
    const consent = getCookie('user_consent') || localStorage.getItem('user_consent');
    console.log('Consent status:', consent);
    
    if (consent === 'accepted') {
        if (document.readyState === 'complete') {
            setTimeout(loadAllMetrics, 1000);
        } else {
            window.addEventListener('load', () => setTimeout(loadAllMetrics, 1000));
        }
    }
    
    document.addEventListener('consentGiven', loadAllMetrics);
})();