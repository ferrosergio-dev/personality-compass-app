// Cookie Consent Banner Logic
(function() {
    const BANNER_ID = 'cookie-consent-banner';
    const ACCEPT_BTN_ID = 'cookie-accept';
    const REJECT_BTN_ID = 'cookie-reject';
    const CONSENT_COOKIE_NAME = 'user_consent';
    const LOGGER_URL = 'https://consent-logger.compass-of-personality.workers.dev';

    // Подключаем CSS (внешний, не инлайн!)
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/css/cookie-banner.css';
    document.head.appendChild(link);

    // Мультиязычные тексты
    const translations = {
        en: {
            message: 'We use Google Analytics and Yandex Metrica for traffic analysis.',
            policyLink: 'Cookie Policy',
            accept: 'Accept',
            reject: 'Reject',
            policyPath: '/en/cookie-policy.html'
        },
        ru: {
            message: 'Мы используем Google Analytics и Яндекс.Метрику для анализа трафика.',
            policyLink: 'Политика Cookie',
            accept: 'Принять',
            reject: 'Отказаться',
            policyPath: '/ru/cookie-policy.html'
        },
        et: {
            message: 'Kasutame Google Analyticsit ja Yandex Metricat liikluse analüüsiks.',
            policyLink: 'Küpsiste poliitika',
            accept: 'Nõustun',
            reject: 'Keeldu',
            policyPath: '/et/cookie-policy.html'
        }
    };

    // Получаем текущий язык из HTML lang атрибута
    function getCurrentLanguage() {
        const htmlLang = document.documentElement.lang || 'en';
        // Поддерживаем только en, ru, et, остальным даём en
        return ['en', 'ru', 'et'].includes(htmlLang) ? htmlLang : 'en';
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    }

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

    function showBanner() {
        const banner = document.getElementById(BANNER_ID);
        if (banner) banner.style.display = 'flex';
    }

    function hideBanner() {
        const banner = document.getElementById(BANNER_ID);
        if (banner) banner.style.display = 'none';
    }

    function sendLog(consentType) {
        const logData = {
            consent: consentType,
            page: window.location.pathname,
            language: document.documentElement.lang,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };

        fetch(LOGGER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logData),
            keepalive: true
        }).then(response => {
            if (response.ok) {
                console.log('Consent logged successfully');
            }
        }).catch(error => {
            console.log('Logging failed (non-critical)');
        });
    }

    function handleAccept() {
        setCookie(CONSENT_COOKIE_NAME, 'accepted', 365);
        localStorage.setItem(CONSENT_COOKIE_NAME, 'accepted');
        hideBanner();
        
        sendLog('accepted');
        
        if (window.loadYandexMetrica) window.loadYandexMetrica();
        if (window.loadGoogleAnalytics) window.loadGoogleAnalytics();
        document.dispatchEvent(new Event('consentGiven'));
    }

    function handleReject() {
        setCookie(CONSENT_COOKIE_NAME, 'rejected', 365);
        localStorage.setItem(CONSENT_COOKIE_NAME, 'rejected');
        hideBanner();
        
        sendLog('rejected');
    }

    function init() {
        const consent = getCookie(CONSENT_COOKIE_NAME) || localStorage.getItem(CONSENT_COOKIE_NAME);
        
        if (!consent) {
            const currentLang = getCurrentLanguage();
            const t = translations[currentLang];
            
            const banner = document.createElement('div');
            banner.id = BANNER_ID;
            banner.className = 'cookie-banner';
            banner.innerHTML = `
    <div class="cookie-banner__content">
        <span>${t.message} </span>
        <a href="${t.policyPath}" class="cookie-banner__link">${t.policyLink}</a>
    </div>
    <div class="cookie-banner__buttons">
        <button id="${ACCEPT_BTN_ID}" class="cookie-banner__button cookie-banner__button--accept">${t.accept}</button>
        <button id="${REJECT_BTN_ID}" class="cookie-banner__button cookie-banner__button--reject">${t.reject}</button>
    </div>
`;
            document.body.appendChild(banner);
            
            showBanner();
            document.getElementById(ACCEPT_BTN_ID)?.addEventListener('click', handleAccept);
            document.getElementById(REJECT_BTN_ID)?.addEventListener('click', handleReject);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();