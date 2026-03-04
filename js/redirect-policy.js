// ==================== АВТОМАТИЧЕСКИЙ РЕДИРЕКТ НА ПОЛИТИКИ ====================
document.addEventListener('DOMContentLoaded', function() {
    // Определяем язык пользователя
    const userLang = navigator.language.substring(0, 2);
    let targetUrl = '/en/policy.html';
    
    if (userLang === 'ru') {
        targetUrl = '/ru/policy.html';
    } else if (userLang === 'et') {
        targetUrl = '/et/policy.html';
    }
    
    // Делаем редирект
    window.location.href = targetUrl;
});