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

// ===== Yandex Metrica =====
window.loadYandexMetrica = async function() {
    try {
        if (window.ym && typeof window.ym === 'function') {
            console.log('Yandex Metrica already loaded');
            return;
        }

        console.log('Loading Yandex Metrica...');
        
        // Загружаем скрипт через прокси
        await loadScriptViaProxy('https://mc.yandex.ru/metrika/tag.js');
        
        // Инициализируем
        setTimeout(() => {
            window.ym = window.ym || function() {
                (window.ym.a = window.ym.a || []).push(arguments);
            };
            window.ym.l = Date.now();
            
            window.ym(107164704, 'init', {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true
            });
            
            console.log('✅ Yandex Metrica ready');
        }, 500);
        
    } catch (error) {
        console.error('Yandex Metrica error:', error);
    }
};

// ===== Google Analytics =====
window.loadGoogleAnalytics = async function() {
    try {
        if (window.gtag && typeof window.gtag === 'function') {
            console.log('Google Analytics already loaded');
            return;
        }

        console.log('Loading Google Analytics...');
        
        // Создаём dataLayer
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() { dataLayer.push(arguments); };
        
        // Загружаем скрипт через прокси
        await loadScriptViaProxy('https://www.googletagmanager.com/gtag/js?id=G-XCK6M7C5DG');
        
        // Инициализируем
        window.gtag('js', new Date());
        window.gtag('config', 'G-XCK6M7C5DG');
        
        console.log('✅ Google Analytics ready');
        
    } catch (error) {
        console.error('Google Analytics error:', error);
    }
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
        await window.loadYandexMetrica();
        await window.loadGoogleAnalytics();
    }
    
    // Проверяем согласие
    const consent = getCookie('user_consent') || localStorage.getItem('user_consent');
    console.log('Consent status:', consent);
    
    if (consent === 'accepted') {
        if (document.readyState === 'complete') {
            setTimeout(loadAllMetrics, 1000);
        } else {
            window.addEventListener('load', () => setTimeout(loadAllMetrics, 1000));
        }
    }
    
    // Слушаем событие
    document.addEventListener('consentGiven', loadAllMetrics);
})();