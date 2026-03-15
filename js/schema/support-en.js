(function() {
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "DonateAction",
        "name": "Support Personality Compass Development",
        "description": "Help improve the app and support future updates",
        "url": "https://personality-compass.app/en/support.html",
        "potentialAction": {
            "@type": "DonateAction",
            "name": "Make a Donation",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://personality-compass.app/en/support.html",
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