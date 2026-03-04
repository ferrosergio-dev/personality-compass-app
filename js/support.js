// ===== SUPPORT.JS - Общий скрипт для страниц поддержки =====

// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XCK6M7C5DG');

function trackDonationClick(type) {
    gtag('event', 'donation_click', {
        'event_category': 'support',
        'event_label': type
    });
    
    // Яндекс.Метрика (если доступна)
    if (typeof ym !== 'undefined') {
        ym(106973384, 'reachGoal', 'donation_click', {action: type});
    }
}

// Переводы
let currentLanguage = 'en';

const translations = {
    en: {
        title: "Support Developer",
        subtitle: "Your contribution helps improve the app",
        thankYouTitle: "Thank You!",
        thankYouText: "Thank you for using 'Personality Compass'! Your support helps improve the app and add new features.",
        cryptoSection: "Cryptocurrency Donations",
        cryptoSubtitle: "Fast and available worldwide",
        whyCrypto: "Why cryptocurrency?",
        recommended: "Recommended",
        fastTransactions: "Fast transfers",
        fastTransactionsDesc: "Minutes instead of days",
        lowFees: "Low fees",
        lowFeesDesc: "Especially USDT on TRC20",
        globalAccess: "Borderless and unrestricted",
        globalAccessDesc: "Available from anywhere in the world",
        bankDetails: "Bank Details",
        quickActions: "Quick Actions",
        copyIban: "Copy IBAN",
        openBankApp: "Open banking app",
        nameCopied: "Name copied to clipboard",
        referenceCopied: "Payment reference copied",
        ibanCopied: "IBAN copied!",
        addressCopied: "Address copied",
        copy: "Copy",
        network: "Network",
        address: "Address",
        copyAddress: "Copy address",
        howToSendCrypto: "How to send cryptocurrency",
        important: "Important",
        cryptoNetworkWarning: "Make sure to use the correct network when sending. USDT on TRC20 is recommended for low fees.",
        cryptoInstructions: "Simple instructions for sending cryptocurrency:",
        step1Copy: "Copy the address",
        step1Desc: "Click the copy icon next to the desired address",
        step2Open: "Open your crypto wallet",
        step2Desc: "Binance, Trust Wallet, MetaMask or another",
        step3Paste: "Paste the address and amount",
        step3Desc: "Make sure you select the correct network",
        step4Confirm: "Confirm the transfer",
        step4Desc: "Check the details and confirm sending",
        nameLabel: "Recipient name:",
        ibanLabel: "IBAN:",
        referenceLabel: "Payment reference:",
        referenceText: "Personality Compass app donation",
        bankAppInstructions: "Open your banking app and use the details above for transfer. Don't forget to specify the payment reference.",
        rememberToCopy: "Don't forget to copy",
        close: "Close",
        backToMain: "← Back to Main Page",
        privacyNote: "All information is provided for voluntary donations. We do not store any payment data.",
        qrInstructions: "Scan QR code with your banking app"
    },
    ru: {
        title: "Поддержать разработчика",
        subtitle: "Ваш вклад помогает улучшать приложение",
        thankYouTitle: "Спасибо!",
        thankYouText: "Спасибо, что используете 'Личностный Компас'! Ваша поддержка помогает улучшать приложение и добавлять новые функции.",
        cryptoSection: "Криптовалюта",
        cryptoSubtitle: "Быстро и доступно по всему миру",
        whyCrypto: "Почему криптовалюта?",
        recommended: "Рекомендуется",
        fastTransactions: "Быстрые переводы",
        fastTransactionsDesc: "Минуты вместо дней",
        lowFees: "Низкие комиссии",
        lowFeesDesc: "Особенно USDT на TRC20",
        globalAccess: "Без границ и ограничений",
        globalAccessDesc: "Доступно из любой точки мира",
        bankDetails: "Банковские реквизиты",
        quickActions: "Быстрые действия",
        copyIban: "Скопировать IBAN",
        openBankApp: "Открыть банковское приложение",
        nameCopied: "Имя скопировано в буфер",
        referenceCopied: "Назначение скопировано",
        ibanCopied: "IBAN скопирован!",
        addressCopied: "Адрес скопирован",
        copy: "Копировать",
        network: "Сеть",
        address: "Адрес",
        copyAddress: "Скопировать адрес",
        howToSendCrypto: "Как отправить криптовалюту",
        important: "Важно",
        cryptoNetworkWarning: "Убедитесь, что используете правильную сеть при отправке. USDT на TRC20 рекомендуется для низких комиссий.",
        cryptoInstructions: "Простая инструкция для отправки криптовалюты:",
        step1Copy: "Скопируйте адрес",
        step1Desc: "Нажмите на иконку копирования рядом с нужным адресом",
        step2Open: "Откройте ваш крипто-кошелек",
        step2Desc: "Binance, Trust Wallet, MetaMask или другой",
        step3Paste: "Вставьте адрес и сумму",
        step3Desc: "Убедитесь, что выбрали правильную сеть",
        step4Confirm: "Подтвердите перевод",
        step4Desc: "Проверьте детали и подтвердите отправку",
        nameLabel: "Имя получателя:",
        ibanLabel: "IBAN:",
        referenceLabel: "Назначение платежа:",
        referenceText: "Пожертвование на приложение Personality Compass",
        bankAppInstructions: "Откройте ваше банковское приложение и используйте реквизиты выше для перевода. Не забудьте указать назначение платежа.",
        rememberToCopy: "Не забудьте скопировать",
        close: "Закрыть",
        backToMain: "← На главную страницу",
        privacyNote: "Вся информация предоставлена для добровольных пожертвований. Мы не храним никаких платежных данных.",
        qrInstructions: "Отсканируйте QR-код банковским приложением"
    },
    et: {
        title: "Toeta arendajat",
        subtitle: "Sinu annetus aitab rakendust paremaks teha",
        thankYouTitle: "Aitäh!",
        thankYouText: "Täname, et kasutad 'Isiksuse Kompassi'! Sinu toetus aitab rakendust täiustada ja uusi funktsioone lisada.",
        cryptoSection: "Krüptoraha annetused",
        cryptoSubtitle: "Kiire ja kättesaadav üle kogu maailma",
        whyCrypto: "Miks krüptoraha?",
        recommended: "Soovitatav",
        fastTransactions: "Kiired ülekanded",
        fastTransactionsDesc: "Minutid päevade asemel",
        lowFees: "Madalad tasud",
        lowFeesDesc: "Eriti USDT TRC20 võrgustikus",
        globalAccess: "Piirideta ja piiramatult",
        globalAccessDesc: "Kättesaadav igast maailma otsast",
        bankDetails: "Pangaandmed",
        quickActions: "Kiirtegevused",
        copyIban: "Kopeeri IBAN",
        openBankApp: "Ava pangarakendus",
        nameCopied: "Nimi kopeeritud",
        referenceCopied: "Makseviide kopeeritud",
        ibanCopied: "IBAN kopeeritud!",
        addressCopied: "Aadress kopeeritud",
        copy: "Kopeeri",
        network: "Võrk",
        address: "Aadress",
        copyAddress: "Kopeeri aadress",
        howToSendCrypto: "Kuidas saata krüptoraha",
        important: "Oluline",
        cryptoNetworkWarning: "Veendu, et kasutad õiget võrku saatmisel. USDT TRC20 võrgus on soovitatav madalate tasude tõttu.",
        cryptoInstructions: "Lihtne juhend krüptoraha saatmiseks:",
        step1Copy: "Kopeeri aadress",
        step1Desc: "Klõpsa kopeerimisikoonil soovitud aadressi kõrval",
        step2Open: "Ava oma krüptorahakott",
        step2Desc: "Binance, Trust Wallet, MetaMask või muu",
        step3Paste: "Kleebi aadress ja summa",
        step3Desc: "Veendu, et valisid õige võrgu",
        step4Confirm: "Kinnita ülekanne",
        step4Desc: "Kontrolli üksikasjad ja kinnita saatmine",
        nameLabel: "Saaja nimi:",
        ibanLabel: "IBAN:",
        referenceLabel: "Makseviide:",
        referenceText: "Personality Compass app donation",
        bankAppInstructions: "Ava oma pangarakendus ja kasuta ülaltoodud andmeid ülekande tegemiseks. Ära unusta määrata makseviidet.",
        rememberToCopy: "Ära unusta kopeerida",
        close: "Sulge",
        backToMain: "← Tagasi pealehele",
        privacyNote: "Kogu teave on esitatud vabatahtlike annetuste jaoks. Me ei säilita ühtegi makseandmeid.",
        qrInstructions: "Skänneeri QR-kood oma pangarakendusega"
    }
};

// Функции перевода
function changeLanguage(lang) {
    currentLanguage = lang;
    updateContent();
    
    // Обновляем активную кнопку
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Обновляем URL (для SEO)
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/\/(en|ru|et)\//, `/${lang}/`);
    if (currentPath !== newPath) {
        window.history.pushState({}, '', newPath);
    }
    
    trackDonationClick(`language_${lang}`);
}

function updateContent() {
    const t = translations[currentLanguage];
    
    // Обновляем все элементы с data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (t[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = t[key];
            } else {
                element.textContent = t[key];
            }
        }
    });
    
    // Обновляем заголовок страницы
    document.title = t.title + " - Personality Compass";
}

// Clipboard functions
async function copyToClipboard(text, messageKey) {
    try {
        await navigator.clipboard.writeText(text);
        showToast(translations[currentLanguage][messageKey] || translations[currentLanguage].copied || 'Copied!');
        trackDonationClick('copy_' + messageKey);
    } catch (err) {
        // Fallback для старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(translations[currentLanguage][messageKey] || translations[currentLanguage].copied || 'Copied!');
        trackDonationClick('copy_' + messageKey);
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Показать инструкции по криптовалюте
function showCryptoInstructions() {
    const t = translations[currentLanguage];
    const modalContent = document.getElementById('modal-content');
    const modalTitle = document.getElementById('modal-title');
    
    if (!modalContent || !modalTitle) return;
    
    modalTitle.textContent = t.howToSendCrypto;
    
    modalContent.innerHTML = `
        <p style="margin-bottom: 20px; color: #666;">${t.cryptoInstructions}</p>
        
        <div style="display: flex; flex-direction: column; gap: 20px; margin-bottom: 25px;">
            <div style="display: flex; gap: 15px; align-items: flex-start;">
                <div style="background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</div>
                <div>
                    <strong style="color: #667eea; display: block; margin-bottom: 5px;">${t.step1Copy}</strong>
                    <p style="margin: 0; color: #666;">${t.step1Desc}</p>
                </div>
            </div>
            
            <div style="display: flex; gap: 15px; align-items: flex-start;">
                <div style="background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</div>
                <div>
                    <strong style="color: #667eea; display: block; margin-bottom: 5px;">${t.step2Open}</strong>
                    <p style="margin: 0; color: #666;">${t.step2Desc}</p>
                </div>
            </div>
            
            <div style="display: flex; gap: 15px; align-items: flex-start;">
                <div style="background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">3</div>
                <div>
                    <strong style="color: #667eea; display: block; margin-bottom: 5px;">${t.step3Paste}</strong>
                    <p style="margin: 0; color: #666;">${t.step3Desc}</p>
                </div>
            </div>
            
            <div style="display: flex; gap: 15px; align-items: flex-start;">
                <div style="background: #667eea; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">4</div>
                <div>
                    <strong style="color: #667eea; display: block; margin-bottom: 5px;">${t.step4Confirm}</strong>
                    <p style="margin: 0; color: #666;">${t.step4Desc}</p>
                </div>
            </div>
        </div>
        
        <div style="background: #fef8e7; border-left: 4px solid #f0b400; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <strong style="color: #b85c00; display: block; margin-bottom: 8px;">⚠️ ${t.important}</strong>
            <p style="margin: 0; color: #666;">${t.cryptoNetworkWarning}</p>
        </div>
    `;
    
    document.getElementById('modal').style.display = 'flex';
    trackDonationClick('crypto_instructions');
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Показать адреса криптовалют (альтернативная функция)
function showCryptoAddresses() {
    const t = translations[currentLanguage];
    const modalContent = document.getElementById('modal-content');
    const modalTitle = document.getElementById('modal-title');
    
    if (!modalContent || !modalTitle) return;
    
    modalTitle.textContent = t.cryptoSection;
    
    modalContent.innerHTML = `
        <div style="margin-bottom: 15px;">
            <div style="background: #f8f9ff; padding: 15px; border-radius: 12px; margin-bottom: 15px;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <span style="font-size: 24px;">💎</span>
                    <strong style="color: #667eea; font-size: 18px;">USDT (TRC20)</strong>
                    <span style="background: #e6f7e6; color: #2e7d32; padding: 4px 8px; border-radius: 20px; font-size: 12px; font-weight: bold;">${t.recommended}</span>
                </div>
                <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center; font-family: monospace;">
                    <span style="word-break: break-all;">THVCwpeeMhxoFq2MyazteavGcBqi6Qufoc</span>
                    <button class="copy-btn" onclick="copyToClipboard('THVCwpeeMhxoFq2MyazteavGcBqi6Qufoc', 'addressCopied')" style="margin-left: 10px;">📋</button>
                </div>
            </div>
            
            <div style="background: #f8f9ff; padding: 15px; border-radius: 12px;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <span style="font-size: 24px;">₿</span>
                    <strong style="color: #667eea; font-size: 18px;">Bitcoin (BTC)</strong>
                </div>
                <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center; font-family: monospace;">
                    <span style="word-break: break-all;">158NGiz2LaRnV7weKZFTuLMVkuPiEr6GEt</span>
                    <button class="copy-btn" onclick="copyToClipboard('158NGiz2LaRnV7weKZFTuLMVkuPiEr6GEt', 'addressCopied')" style="margin-left: 10px;">📋</button>
                </div>
            </div>
        </div>
        
        <div style="background: #fef8e7; border-left: 4px solid #f0b400; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <strong style="color: #b85c00; display: block; margin-bottom: 8px;">⚠️ ${t.important}</strong>
            <p style="margin: 0; color: #666;">${t.cryptoNetworkWarning}</p>
        </div>
    `;
    
    document.getElementById('modal').style.display = 'flex';
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Определяем язык из URL
    const path = window.location.pathname;
    if (path.includes('/ru/')) {
        currentLanguage = 'ru';
    } else if (path.includes('/et/')) {
        currentLanguage = 'et';
    } else {
        currentLanguage = 'en';
    }
    
    updateContent();
    
    // Отмечаем активную кнопку языка (по data-lang)
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        }
    });
    
    // Закрытие модального окна при клике вне его
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
});

// Для обратной совместимости
window.changeLanguage = changeLanguage;
window.copyToClipboard = copyToClipboard;
window.showCryptoInstructions = showCryptoInstructions;
window.showCryptoAddresses = showCryptoAddresses;
window.closeModal = closeModal;
window.trackDonationClick = trackDonationClick;