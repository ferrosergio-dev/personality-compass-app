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
        nameLabel: "Recipient name",
        ibanLabel: "IBAN:",
        referenceLabel: "Payment reference",
        referenceText: "Personality Compass app donation",
        bankAppInstructions: "Open your banking app and use the details above for transfer. Don't forget to specify the payment reference.",
        rememberToCopy: "Don't forget to copy",
        close: "Close",
        backToMain: "Back to Main Page",
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
        referenceCopied: "Назначение скопировано в буфер",
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
        nameLabel: "Имя получателя",
        ibanLabel: "IBAN:",
        referenceLabel: "Назначение",
        referenceText: "Personality Compass app donation",
        bankAppInstructions: "Откройте ваше банковское приложение и используйте реквизиты выше для перевода. Не забудьте указать назначение платежа.",
        rememberToCopy: "Не забудьте скопировать",
        close: "Закрыть",
        backToMain: "На главную страницу",
        privacyNote: "Вся информация предоставлена для добровольных пожертвований. Мы не храним никаких платежных данных.",
        qrInstructions: "Отсканируйте QR-код банковским приложением"
    },
    et: {
        title: "Toeta arendajat",
        subtitle: "Sinu annetus aitab rakendust paremaks teha",
        thankYouTitle: "Aitäh!",
        thankYouText: "Täname, et kasutad 'Isiksuse Kompassi'! Sinu toetus aitab rakendust täiustada ja uusi funktsioone lisada.",
        cryptoSection: "Krüptoraha",
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
        nameLabel: "Saaja nimi",
        ibanLabel: "IBAN:",
        referenceLabel: "Makseviide",
        referenceText: "Personality Compass app donation",
        bankAppInstructions: "Ava oma pangarakendus ja kasuta ülaltoodud andmeid ülekande tegemiseks. Ära unusta määrata makseviidet.",
        rememberToCopy: "Ära unusta kopeerida",
        close: "Sulge",
        backToMain: "Tagasi pealehele",
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
        if (btn.getAttribute('onclick')?.includes(`'${lang}'`)) {
            btn.classList.add('active');
        }
    });
    
    // Обновляем URL (для SEO)
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/\/(en|ru|et)\//, `/${lang}/`);
    if (currentPath !== newPath) {
        window.history.pushState({}, '', newPath);
    }
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
        showToast(translations[currentLanguage][messageKey] || 'Copied!');
        trackDonationClick('copy_' + messageKey);
    } catch (err) {
        // Fallback для старых браузеров
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(translations[currentLanguage][messageKey] || 'Copied!');
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
        <p>${t.cryptoInstructions}</p>
        
        <div class="instruction-step">
            <div class="step-number">1</div>
            <div>
                <strong>${t.step1Copy}</strong>
                <p>${t.step1Desc}</p>
            </div>
        </div>
        
        <div class="instruction-step">
            <div class="step-number">2</div>
            <div>
                <strong>${t.step2Open}</strong>
                <p>${t.step2Desc}</p>
            </div>
        </div>
        
        <div class="instruction-step">
            <div class="step-number">3</div>
            <div>
                <strong>${t.step3Paste}</strong>
                <p>${t.step3Desc}</p>
            </div>
        </div>
        
        <div class="instruction-step">
            <div class="step-number">4</div>
            <div>
                <strong>${t.step4Confirm}</strong>
                <p>${t.step4Desc}</p>
            </div>
        </div>
        
        <div class="warning-box">
            <strong>⚠️ ${t.important}</strong>
            <p>${t.cryptoNetworkWarning}</p>
        </div>
    `;
    
    document.getElementById('modal').style.display = 'flex';
    trackDonctionClick('crypto_instructions');
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
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
    
    // Отмечаем активную кнопку языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick')?.includes(`'${currentLanguage}'`)) {
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

// Исправление опечатки в названии функции
window.copyToClipback = window.copyToClipboard;