/**
 * Sentiva Clinic - Multi-language Logic
 * Handles English/Spanish toggling via data-attributes
 */

const initLanguageToggle = () => {
    const langToggle = document.getElementById('lang-toggle');
    if (!langToggle) return;

    // 1. Determine starting language (Saved > Browser > Default)
    const savedLang = localStorage.getItem('preferredLang');
    const browserLang = (navigator.language || navigator.userLanguage).startsWith('es') ? 'es' : 'en';
    let currentLang = savedLang || browserLang;

    const updateContent = (lang) => {
        // Update all text elements
        document.querySelectorAll('[data-en]').forEach(el => {
            el.innerText = el.getAttribute(`data-${lang}`);
        });

        // Update all placeholders
        document.querySelectorAll('[data-en-placeholder]').forEach(el => {
            el.setAttribute('placeholder', el.getAttribute(`data-${lang}-placeholder`));
        });

        // Update Page Title
        const titleTag = document.querySelector('title[data-en]');
        if (titleTag) {
            document.title = titleTag.getAttribute(`data-${lang}`);
        }

        // Update UI Button text
        langToggle.innerText = lang === 'en' ? '🇪🇸 Español' : '🇺🇸 English';

        // Add a class to body for CSS styling hooks
        document.body.classList.remove('lang-en', 'lang-es');
        document.body.classList.add(`lang-${lang}`);
    };

    // 2. Add Event Listener
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'es' : 'en';
        localStorage.setItem('preferredLang', currentLang);
        updateContent(currentLang);
    });

    // 3. Initial Run
    updateContent(currentLang);
};

// Run when the DOM is ready (though 'defer' handles this, this is a safe pattern)
document.addEventListener('DOMContentLoaded', initLanguageToggle);