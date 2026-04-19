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

        // Update Alt Text for images
        document.querySelectorAll('[data-en-alt]').forEach(el => {
            el.setAttribute('alt', el.getAttribute(`data-${lang}-alt`));
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

let staffDataCache = null; // Memory cache for JSON data

const loadStaffData = async () => {
    fetch('data/staff.json')
        .then(response => response.json())
        .then(data => {
            staffDataCache = data; // Assign once the JSON is ready
        })
        .catch(err => console.error("Error loading staff data:", err));
};

const initStaffModal = () => {
    document.querySelectorAll('.team-card').forEach(card => {
        card.addEventListener('click', () => {
            const name = card.querySelector('.staff-name').innerText;
            const role = card.querySelector('.staff-role').innerText;
            const img = card.querySelector('img').src;
            const data = staffDataCache ? staffDataCache[name] : null;

            document.getElementById('modal-name').innerText = name;
            document.getElementById('modal-img').src = img;
            document.getElementById('modal-role').innerText = role;
            /*
                         if (data) {
                            document.getElementById('modal-email').innerText = data.email;
                            document.getElementById('modal-email').href = `mailto:${data.email}`;
                            // Determine bio language based on current session
                            const currentLang = localStorage.getItem('preferredLang') || 'en';
                            document.getElementById('modal-bio').innerText = data.bio[currentLang];
                        } else {
                            document.getElementById('modal-email').innerText = '<not available>';
                            document.getElementById('modal-bio').innerText = '';
                        }
             */
            document.getElementById('bio-modal').style.display = 'block';
        });
    });

    // 3. Close Logic
    document.querySelector('.close-modal').onclick = () => {
        document.getElementById('bio-modal').style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target == document.getElementById('bio-modal')) {
            document.getElementById('bio-modal').style.display = 'none';
        }
    };
}

// Run when the DOM is ready (though 'defer' handles this, this is a safe pattern)
document.addEventListener('DOMContentLoaded', initLanguageToggle);
document.addEventListener('DOMContentLoaded', initStaffModal);

