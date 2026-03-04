// Automatic language redirect
(function() {
    // Check if already redirected in this session
    if (sessionStorage.getItem('redirected')) {
        return;
    }

    // Get browser language
    const userLang = navigator.language.substring(0, 2);
    let targetUrl = '/en/';
    
    if (userLang === 'ru') {
        targetUrl = '/ru/';
    } else if (userLang === 'et') {
        targetUrl = '/et/';
    }
    
    // Mark as redirected
    sessionStorage.setItem('redirected', 'true');
    
    // Execute redirect
    window.location.replace(targetUrl);
})();