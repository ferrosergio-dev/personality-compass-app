(function() {
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "DonateAction",
        "name": "Toeta Isiksuse Kompassi arendamist",
        "description": "Aita rakendust paremaks teha ja toeta tulevasi uuendusi",
        "url": "https://personality-compass.app/et/support.html",
        "potentialAction": {
            "@type": "DonateAction",
            "name": "Tee annetus",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://personality-compass.app/et/support.html",
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