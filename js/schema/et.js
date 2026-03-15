(function() {
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MobileApplication",
        "name": "Isiksuse Kompass",
        "description": "Offline isiksusetesti rakendus MindPath 16, 5D ja Enneagrammi testidega",
        "applicationCategory": "LifestyleApplication",
        "operatingSystem": "iOS, Android",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
        },
        "url": "https://personality-compass.app/et/",
        "inLanguage": "et",
        "screenshot": [
            {
                "@type": "ImageObject",
                "url": "https://personality-compass.app/images/01_et_l.webp",
                "caption": "Isiksuse Kompass avakuva",
                "width": 1080,
                "height": 2400
            },
            {
                "@type": "ImageObject",
                "url": "https://personality-compass.app/images/02_et_l.webp",
                "caption": "Testide valik",
                "width": 1080,
                "height": 2400
            },
            {
                "@type": "ImageObject",
                "url": "https://personality-compass.app/images/03_et_l.webp",
                "caption": "MindPath 16 test",
                "width": 1080,
                "height": 2400
            },
            {
                "@type": "ImageObject",
                "url": "https://personality-compass.app/images/04_et_l.webp",
                "caption": "Enneagrammi tulemused",
                "width": 1080,
                "height": 2400
            },
            {
                "@type": "ImageObject",
                "url": "https://personality-compass.app/images/05_et_l.webp",
                "caption": "PDF aruanded",
                "width": 1080,
                "height": 2400
            },
            {
                "@type": "ImageObject",
                "url": "https://personality-compass.app/images/06_et_l.webp",
                "caption": "Isiklik päevik",
                "width": 1080,
                "height": 2400
            }
        ]
    });
    document.head.appendChild(script);
})();