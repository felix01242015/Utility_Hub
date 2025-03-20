// Language Translator Tool for the Utility Hub application

const languageTranslatorTool = {
    id: 'language-translator',
    title: 'Language Translator',
    description: 'Translate text between multiple languages',
    icon: 'fas fa-language',
    category: 'text-edit',
    tags: ['translator', 'language', 'translation', 'international'],
    render: function(container) {
        // Language list with codes and names
        const languages = {
            'af': 'Afrikaans', 'sq': 'Albanian', 'am': 'Amharic', 'ar': 'Arabic', 'hy': 'Armenian',
            'az': 'Azerbaijani', 'eu': 'Basque', 'be': 'Belarusian', 'bn': 'Bengali', 'bs': 'Bosnian',
            'bg': 'Bulgarian', 'ca': 'Catalan', 'ceb': 'Cebuano', 'zh': 'Chinese', 'co': 'Corsican',
            'hr': 'Croatian', 'cs': 'Czech', 'da': 'Danish', 'nl': 'Dutch', 'en': 'English',
            'eo': 'Esperanto', 'et': 'Estonian', 'fi': 'Finnish', 'fr': 'French', 'fy': 'Frisian',
            'gl': 'Galician', 'ka': 'Georgian', 'de': 'German', 'el': 'Greek', 'gu': 'Gujarati',
            'ht': 'Haitian Creole', 'ha': 'Hausa', 'haw': 'Hawaiian', 'he': 'Hebrew', 'hi': 'Hindi',
            'hmn': 'Hmong', 'hu': 'Hungarian', 'is': 'Icelandic', 'ig': 'Igbo', 'id': 'Indonesian',
            'ga': 'Irish', 'it': 'Italian', 'ja': 'Japanese', 'jv': 'Javanese', 'kn': 'Kannada',
            'kk': 'Kazakh', 'km': 'Khmer', 'ko': 'Korean', 'ku': 'Kurdish', 'ky': 'Kyrgyz',
            'lo': 'Lao', 'la': 'Latin', 'lv': 'Latvian', 'lt': 'Lithuanian', 'lb': 'Luxembourgish',
            'mk': 'Macedonian', 'mg': 'Malagasy', 'ms': 'Malay', 'ml': 'Malayalam', 'mt': 'Maltese',
            'mi': 'Maori', 'mr': 'Marathi', 'mn': 'Mongolian', 'my': 'Myanmar (Burmese)', 'ne': 'Nepali',
            'no': 'Norwegian', 'ny': 'Nyanja (Chichewa)', 'or': 'Odia (Oriya)', 'ps': 'Pashto',
            'fa': 'Persian', 'pl': 'Polish', 'pt': 'Portuguese', 'pa': 'Punjabi', 'ro': 'Romanian',
            'ru': 'Russian', 'sm': 'Samoan', 'gd': 'Scots Gaelic', 'sr': 'Serbian', 'st': 'Sesotho',
            'sn': 'Shona', 'sd': 'Sindhi', 'si': 'Sinhala (Sinhalese)', 'sk': 'Slovak', 'sl': 'Slovenian',
            'so': 'Somali', 'es': 'Spanish', 'su': 'Sundanese', 'sw': 'Swahili', 'sv': 'Swedish',
            'tl': 'Tagalog (Filipino)', 'tg': 'Tajik', 'ta': 'Tamil', 'tt': 'Tatar', 'te': 'Telugu',
            'th': 'Thai', 'tr': 'Turkish', 'tk': 'Turkmen', 'uk': 'Ukrainian', 'ur': 'Urdu',
            'ug': 'Uyghur', 'uz': 'Uzbek', 'vi': 'Vietnamese', 'cy': 'Welsh', 'xh': 'Xhosa',
            'yi': 'Yiddish', 'yo': 'Yoruba', 'zu': 'Zulu'
        };

        container.innerHTML = `
            <div class="tool-content">
                <h2>Language Translator</h2>
                <div class="translator-container">
                    <!-- Source Language Section -->
                    <div class="language-section">
                        <div class="language-header">
                            <select id="source-language" class="language-select">
                                <option value="auto">Detect Language</option>
                                ${Object.entries(languages).map(([code, name]) => 
                                    `<option value="${code}">${name}</option>`
                                ).join('')}
                            </select>
                            <button onclick="clearSource()" class="btn-icon" title="Clear text">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <textarea id="source-text" 
                            placeholder="Enter text to translate..."
                            rows="6"
                            oninput="updateCharCount('source')"></textarea>
                        <div class="text-controls">
                            <span id="source-char-count" class="char-count">0 characters</span>
                            <button onclick="speakText('source')" class="btn-icon" title="Listen">
                                <i class="fas fa-volume-up"></i>
                            </button>
                            <button onclick="copyText('source')" class="btn-icon" title="Copy">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Swap Languages Button -->
                    <button onclick="swapLanguages()" class="swap-btn" title="Swap languages">
                        <i class="fas fa-exchange-alt"></i>
                    </button>

                    <!-- Target Language Section -->
                    <div class="language-section">
                        <div class="language-header">
                            <select id="target-language" class="language-select">
                                ${Object.entries(languages).map(([code, name]) => 
                                    `<option value="${code}" ${code === 'en' ? 'selected' : ''}>${name}</option>`
                                ).join('')}
                            </select>
                            <button onclick="clearTarget()" class="btn-icon" title="Clear text">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <textarea id="target-text" 
                            placeholder="Translation will appear here..."
                            rows="6"
                            readonly></textarea>
                        <div class="text-controls">
                            <span id="target-char-count" class="char-count">0 characters</span>
                            <button onclick="speakText('target')" class="btn-icon" title="Listen">
                                <i class="fas fa-volume-up"></i>
                            </button>
                            <button onclick="copyText('target')" class="btn-icon" title="Copy">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Translation Controls -->
                    <div class="translation-controls">
                        <button onclick="translateText()" class="btn translate-btn">
                            <i class="fas fa-language"></i> Translate
                        </button>
                        <div class="quick-languages">
                            <button onclick="setTargetLanguage('es')" class="btn">Spanish</button>
                            <button onclick="setTargetLanguage('fr')" class="btn">French</button>
                            <button onclick="setTargetLanguage('de')" class="btn">German</button>
                            <button onclick="setTargetLanguage('zh')" class="btn">Chinese</button>
                            <button onclick="setTargetLanguage('ja')" class="btn">Japanese</button>
                            <button onclick="setTargetLanguage('ko')" class="btn">Korean</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .translator-container {
                display: flex;
                flex-direction: column;
                gap: 20px;
                max-width: 1000px;
                margin: 0 auto;
            }

            .language-section {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .language-header {
                display: flex;
                gap: 10px;
                align-items: center;
            }

            .language-select {
                flex: 1;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                background: white;
            }

            textarea {
                width: 100%;
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                font-size: 16px;
                resize: vertical;
                background: white;
            }

            textarea[readonly] {
                background: #f8f9fa;
            }

            .text-controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .char-count {
                color: #666;
                font-size: 14px;
            }

            .btn-icon {
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                background: white;
                cursor: pointer;
                transition: var(--transition);
            }

            .btn-icon:hover {
                background: #f0f0f0;
            }

            .swap-btn {
                align-self: center;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: white;
                cursor: pointer;
                transition: var(--transition);
            }

            .swap-btn:hover {
                background: #f0f0f0;
                transform: rotate(180deg);
            }

            .translation-controls {
                display: flex;
                flex-direction: column;
                gap: 15px;
                align-items: center;
            }

            .translate-btn {
                padding: 10px 20px;
                font-size: 16px;
            }

            .quick-languages {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                justify-content: center;
            }

            @media (min-width: 768px) {
                .translator-container {
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    gap: 20px;
                }

                .translation-controls {
                    grid-column: 1 / -1;
                }
            }
        `;
        document.head.appendChild(style);

        // Initialize the translation delay timer
        let translateTimer;

        // Set up event listeners
        document.getElementById('source-text').addEventListener('input', () => {
            clearTimeout(translateTimer);
            translateTimer = setTimeout(translateText, 1000); // Auto-translate after 1 second of no typing
        });

        // Define global functions
        window.updateCharCount = function(type) {
            const text = document.getElementById(type + '-text').value;
            document.getElementById(type + '-char-count').textContent = 
                text.length + ' characters';
        };

        window.clearSource = function() {
            document.getElementById('source-text').value = '';
            updateCharCount('source');
        };

        window.clearTarget = function() {
            document.getElementById('target-text').value = '';
            updateCharCount('target');
        };

        window.copyText = function(type) {
            const text = document.getElementById(type + '-text').value;
            if (!text) return;

            navigator.clipboard.writeText(text).then(() => {
                const button = document.querySelector('#' + type + '-text + .text-controls .fa-copy');
                button.classList.remove('fa-copy');
                button.classList.add('fa-check');
                setTimeout(() => {
                    button.classList.remove('fa-check');
                    button.classList.add('fa-copy');
                }, 2000);
            });
        };

        window.speakText = function(type) {
            const text = document.getElementById(type + '-text').value;
            if (!text) return;

            const lang = document.getElementById(type + '-language').value;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            window.speechSynthesis.speak(utterance);
        };

        window.swapLanguages = function() {
            const sourceSelect = document.getElementById('source-language');
            const targetSelect = document.getElementById('target-language');
            const sourceText = document.getElementById('source-text');
            const targetText = document.getElementById('target-text');

            // Only swap if source language is not "auto"
            if (sourceSelect.value !== 'auto') {
                const tempLang = sourceSelect.value;
                sourceSelect.value = targetSelect.value;
                targetSelect.value = tempLang;

                const tempText = sourceText.value;
                sourceText.value = targetText.value;
                targetText.value = tempText;

                updateCharCount('source');
                updateCharCount('target');
            }
        };

        window.setTargetLanguage = function(langCode) {
            document.getElementById('target-language').value = langCode;
            translateText();
        };

        window.translateText = async function() {
            const sourceText = document.getElementById('source-text').value.trim();
            if (!sourceText) return;

            const sourceLang = document.getElementById('source-language').value;
            const targetLang = document.getElementById('target-language').value;
            const targetTextArea = document.getElementById('target-text');

            // Show loading state
            targetTextArea.value = 'Translating...';

            try {
                // Using Google Translate API
                const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' +
                    (sourceLang === 'auto' ? 'auto' : sourceLang) + '&tl=' + targetLang + 
                    '&dt=t&q=' + encodeURIComponent(sourceText);

                const response = await fetch(url);
                const data = await response.json();

                if (data && data[0]) {
                    // Combine all translated parts
                    const translatedText = data[0]
                        .filter(chunk => chunk && chunk[0])
                        .map(chunk => chunk[0])
                        .join('');

                    targetTextArea.value = translatedText;

                    // If source language was auto-detected, show the detected language
                    if (sourceLang === 'auto' && data[2]) {
                        const detectedLang = data[2];
                        const langSelect = document.getElementById('source-language');
                        const langName = langSelect.querySelector('option[value="' + detectedLang + '"]');
                        if (langName) {
                            targetTextArea.value += '\n\nDetected language: ' + langName.textContent;
                        }
                    }
                } else {
                    targetTextArea.value = 'Translation failed. Please try again.';
                }
            } catch (error) {
                targetTextArea.value = 'Translation failed. Please try again.';
            }

            updateCharCount('target');
        };
    }
};

// Add the Language Translator tool to the main tools array
tools.push(languageTranslatorTool);
