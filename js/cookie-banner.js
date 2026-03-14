// Cookie Consent Banner Logic
(function() {
    const BANNER_ID = 'cookie-consent-banner';
    const ACCEPT_BTN_ID = 'cookie-accept';
    const REJECT_BTN_ID = 'cookie-reject';
    const CONSENT_COOKIE_NAME = 'user_consent';

    // Подключаем CSS (внешний, не инлайн!)
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/css/cookie-banner.css';
    document.head.appendChild(link);

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

    function handleAccept() {
        setCookie(CONSENT_COOKIE_NAME, 'accepted', 365);
        localStorage.setItem(CONSENT_COOKIE_NAME, 'accepted');
        hideBanner();
        
        if (window.loadYandexMetrica) window.loadYandexMetrica();
        if (window.loadGoogleAnalytics) window.loadGoogleAnalytics();
        document.dispatchEvent(new Event('consentGiven'));
    }

    function handleReject() {
        setCookie(CONSENT_COOKIE_NAME, 'rejected', 365);
        localStorage.setItem(CONSENT_COOKIE_NAME, 'rejected');
        hideBanner();
    }

    function init() {
        const consent = getCookie(CONSENT_COOKIE_NAME) || localStorage.getItem(CONSENT_COOKIE_NAME);
        
        if (!consent) {
            // Создаем баннер через JS, а не в HTML
            const banner = document.createElement('div');
            banner.id = BANNER_ID;
            banner.className = 'cookie-banner';
            banner.innerHTML = `
    <div class="cookie-banner__content">
        <span>We use Google Analytics and Yandex Metrica for traffic analysis. </span>
        <a href="/en/cookie-policy.html" class="cookie-banner__link">Cookie Policy</a>
    </div>
    <div class="cookie-banner__buttons">
        <button id="${ACCEPT_BTN_ID}" class="cookie-banner__button cookie-banner__button--accept">Accept</button>
        <button id="${REJECT_BTN_ID}" class="cookie-banner__button cookie-banner__button--reject">Reject</button>
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