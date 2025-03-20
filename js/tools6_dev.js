// Additional developer tools for the Utility Hub application
const moreDevTools = [
    // HTML Entity Encoder/Decoder
    {
        id: 'html-entity-tool',
        title: 'HTML Entity Encoder/Decoder',
        description: 'Convert special characters to and from HTML entities',
        icon: 'fas fa-code',
        category: 'developers',
        tags: ['html', 'encoder', 'decoder', 'entities', 'developer'],
        render: function(container) {
            container.innerHTML = `
                <div class="tool-content">
                    <h2>HTML Entity Encoder/Decoder</h2>
                    
                    <div class="tool-tabs">
                        <button class="tool-tab active" onclick="switchHtmlTab('encode')">Encode</button>
                        <button class="tool-tab" onclick="switchHtmlTab('decode')">Decode</button>
                    </div>
                    
                    <div id="html-encode-tab" class="tool-tab-content active">
                        <div class="input-group">
                            <label for="html-text-to-encode">Text to Encode</label>
                            <textarea id="html-text-to-encode" rows="8" placeholder="Enter text with special characters to encode..."></textarea>
                        </div>
                        
                        <div class="options-group">
                            <label>Encoding Options:</label>
                            <div class="checkbox-group">
                                <input type="checkbox" id="encode-named-entities" checked>
                                <label for="encode-named-entities">Use named entities when possible</label>
                            </div>
                            <div class="checkbox-group">
                                <input type="checkbox" id="encode-ascii" checked>
                                <label for="encode-ascii">Encode ASCII characters (< 128)</label>
                            </div>
                            <div class="checkbox-group">
                                <input type="checkbox" id="encode-latin" checked>
                                <label for="encode-latin">Encode Latin characters (< 256)</label>
                            </div>
                        </div>
                        
                        <button class="btn" onclick="encodeHtmlEntities()">Encode HTML Entities</button>
                        
                        <div id="html-encode-result" class="result hidden">
                            <div class="result-header">
                                <h3>Encoded Result</h3>
                                <button class="copy-btn" onclick="copyHtmlEncodeResult()">Copy</button>
                            </div>
                            <pre id="html-encoded-text"></pre>
                        </div>
                    </div>
                    
                    <div id="html-decode-tab" class="tool-tab-content">
                        <div class="input-group">
                            <label for="html-text-to-decode">HTML with Entities to Decode</label>
                            <textarea id="html-text-to-decode" rows="8" placeholder="Enter HTML with entities to decode..."></textarea>
                        </div>
                        
                        <button class="btn" onclick="decodeHtmlEntities()">Decode HTML Entities</button>
                        
                        <div id="html-decode-result" class="result hidden">
                            <div class="result-header">
                                <h3>Decoded Result</h3>
                                <button class="copy-btn" onclick="copyHtmlDecodeResult()">Copy</button>
                            </div>
                            <pre id="html-decoded-text"></pre>
                        </div>
                    </div>
                </div>
            `;

            // Define HTML Entity Encoder/Decoder functions in global scope
            window.switchHtmlTab = function(tab) {
                document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tool-tab-content').forEach(t => t.classList.remove('active'));
                
                document.querySelector(`.tool-tab[onclick*="${tab}"]`).classList.add('active');
                document.getElementById(`html-${tab}-tab`).classList.add('active');
            };

            window.encodeHtmlEntities = function() {
                const input = document.getElementById('html-text-to-encode').value;
                
                if (!input) {
                    alert('Please enter text to encode');
                    return;
                }
                
                const useNamedEntities = document.getElementById('encode-named-entities').checked;
                const encodeAscii = document.getElementById('encode-ascii').checked;
                const encodeLatin = document.getElementById('encode-latin').checked;
                
                try {
                    let result = '';
                    
                    // Common named entities map
                    const namedEntities = {
                        '&': '&amp;',
                        '<': '&lt;',
                        '>': '&gt;',
                        '"': '&quot;',
                        "'": '&#39;',
                        '¢': '&cent;',
                        '£': '&pound;',
                        '¥': '&yen;',
                        '€': '&euro;',
                        '©': '&copy;',
                        '®': '&reg;',
                        '™': '&trade;',
                        '°': '&deg;',
                        '±': '&plusmn;',
                        '¼': '&frac14;',
                        '½': '&frac12;',
                        '¾': '&frac34;',
                        '×': '&times;',
                        '÷': '&divide;',
                        '§': '&sect;',
                        '¶': '&para;',
                        '•': '&bull;',
                        '…': '&hellip;',
                        '—': '&mdash;',
                        '–': '&ndash;',
                        ' ': '&nbsp;'
                    };
                    
                    for (let i = 0; i < input.length; i++) {
                        const char = input.charAt(i);
                        const code = input.charCodeAt(i);
                        
                        // Special characters that always need encoding
                        if (char === '&' || char === '<' || char === '>' || char === '"' || char === "'") {
                            result += useNamedEntities ? namedEntities[char] : `&#${code};`;
                        }
                        // ASCII characters (code points 0-127)
                        else if (code < 128) {
                            if (encodeAscii && namedEntities[char] && useNamedEntities) {
                                result += namedEntities[char];
                            } else if (encodeAscii) {
                                result += `&#${code};`;
                            } else {
                                result += char;
                            }
                        }
                        // Latin-1 Supplement characters (code points 128-255)
                        else if (code < 256) {
                            if (encodeLatin && namedEntities[char] && useNamedEntities) {
                                result += namedEntities[char];
                            } else if (encodeLatin) {
                                result += `&#${code};`;
                            } else {
                                result += char;
                            }
                        }
                        // All other characters
                        else {
                            if (namedEntities[char] && useNamedEntities) {
                                result += namedEntities[char];
                            } else {
                                result += `&#${code};`;
                            }
                        }
                    }
                    
                    document.getElementById('html-encoded-text').textContent = result;
                    document.getElementById('html-encode-result').classList.remove('hidden');
                } catch (error) {
                    alert('Error encoding text: ' + error.message);
                }
            };

            window.decodeHtmlEntities = function() {
                const input = document.getElementById('html-text-to-decode').value;
                
                if (!input) {
                    alert('Please enter HTML with entities to decode');
                    return;
                }
                
                try {
                    // Create a textarea element to decode HTML entities
                    const textarea = document.createElement('textarea');
                    textarea.innerHTML = input;
                    const decoded = textarea.value;
                    
                    document.getElementById('html-decoded-text').textContent = decoded;
                    document.getElementById('html-decode-result').classList.remove('hidden');
                } catch (error) {
                    alert('Error decoding HTML entities: ' + error.message);
                }
            };

            window.copyHtmlEncodeResult = function() {
                const encodedText = document.getElementById('html-encoded-text').textContent;
                navigator.clipboard.writeText(encodedText).then(() => {
                    alert('Encoded text copied to clipboard!');
                });
            };

            window.copyHtmlDecodeResult = function() {
                const decodedText = document.getElementById('html-decoded-text').textContent;
                navigator.clipboard.writeText(decodedText).then(() => {
                    alert('Decoded text copied to clipboard!');
                });
            };
            
            // Add some CSS for the HTML Entity Encoder/Decoder
            const style = document.createElement('style');
            style.textContent = `
                .options-group {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: var(--border-radius);
                    margin-bottom: 20px;
                }
                
                .checkbox-group {
                    display: flex;
                    align-items: center;
                    margin: 8px 0;
                }
                
                .checkbox-group input[type="checkbox"] {
                    margin-right: 10px;
                }
                
                .tool-tabs {
                    display: flex;
                    margin-bottom: 20px;
                    border-bottom: 1px solid #dee2e6;
                }
                
                .tool-tab {
                    padding: 10px 15px;
                    background: none;
                    border: none;
                    border-bottom: 2px solid transparent;
                    cursor: pointer;
                    font-weight: 500;
                    color: var(--text-light);
                    transition: var(--transition);
                }
                
                .tool-tab.active {
                    color: var(--primary-color);
                    border-bottom-color: var(--primary-color);
                }
                
                .tool-tab-content {
                    display: none;
                }
                
                .tool-tab-content.active {
                    display: block;
                }
            `;
            document.head.appendChild(style);
        }
    }
];

// Combine with main tools array
tools.push(...moreDevTools);
