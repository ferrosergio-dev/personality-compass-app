(function() {
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "DonateAction",
        "name": "Поддержать разработку Personality Compass",
        "description": "Помогите улучшить приложение и поддержать будущие обновления",
        "url": "https://personality-compass.app/ru/support.html",
        "potentialAction": {
            "@type": "DonateAction",
            "name": "Сделать пожертвование",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://personality-compass.app/ru/support.html",
                "actionPlatform": [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform"
                ]
            }
        },
        "provider": {
            "@type": "Person",
            "name": "Ilja Serõšev"
        }
    });
    document.head.appendChild(script);
})();