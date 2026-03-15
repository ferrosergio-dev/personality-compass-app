(function() {
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof currentLanguage !== 'undefined') {
            currentLanguage = 'en';
            if (typeof updateContent === 'function') {
                updateContent();
            }
        }
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === 'en') {
                btn.classList.add('active');
            }
        });
    });
})();