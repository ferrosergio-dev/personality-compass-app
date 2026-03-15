(function() {
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MobileApplication",
        "name": "Личностный Компас",
        "description": "Оффлайн приложение для анализа личности с тестами MindPath 16, 5D и Эннеаграммой. 100% приватно, без сбора данных.",
        "applicationCategory": "LifestyleApplication",
        "operatingSystem": "iOS, Android",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "RUB"
        },
        "url": "https://personality-compass.app/ru/",
        "inLanguage": "ru",
        "screenshot": [
            {
                "@type": "ImageObject",
                "url": "https://personality-compass.app/images/01_ru_l.webp",
                "caption": "Личностный Компас - главный экран с тестами MindPath 16, 5D и Эннеаграммой",
                "width": 1080,
                "height": 2400
            },
            {
                "@type": "ImageObject",
                "url": "https://personality-compass.app/images/02_ru_l.webp",
                "caption": "Выбор теста в приложении Личностный Компас",
                "width": 1080,
                "height": 2400
            },
            {
                "@type": "ImageObject",
                "url": "https://personality-compass.app/images/03_ru_l.webp",
                "caption": "Прохождение теста MindPath 16 для определения типа личности",
                "width": 1080,
                "height": 2400
            },
            {
                "@type": "ImageObject",
                "url": "https://personality-compass.app/images/04_ru_l.webp",
                "caption": "Результаты Эннеаграммы с 9 типами личности и уровнями развития",
                "width": 1080,
                "height": 2400
            },
            {
                "@type": "ImageObject",
                "url": "https://personality-compass.app/images/05_ru_l.webp",
                "caption": "Профессиональный PDF отчет с результатами теста",
                "width": 1080,
                "height": 2400
            },
            {
                "@type": "ImageObject",
                "url": "https://personality-compass.app/images/06_ru_l.webp",
                "caption": "Личный дневник для отслеживания прогресса самопознания",
                "width": 1080,
                "height": 2400
            }
        ]
    });
    document.head.appendChild(script);
})();