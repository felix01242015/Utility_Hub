// Additional tools for the Utility Hub application
const additionalTools = [
    // More Converter Tools
    {
        id: 'currency-converter',
        title: 'Currency Converter',
        description: 'Convert between different currencies',
        icon: 'fas fa-money-bill-wave',
        category: 'converters',
        tags: ['money', 'finance', 'exchange'],
        render: function(container) {
            container.innerHTML = `
                <div class="tool-content">
                    <h2>Currency Converter</h2>
                    <p class="note">Note: This uses sample exchange rates. For actual rates, please use a financial service.</p>
                    
                    <div class="two-columns">
                        <div class="input-group">
                            <label for="from-currency">From</label>
                            <select id="from-currency"></select>
                        </div>
                        <div class="input-group">
                            <label for="to-currency">To</label>
                            <select id="to-currency"></select>
                        </div>
                    </div>
                    
                    <div class="input-group">
                        <label for="currency-amount">Amount</label>
                        <input type="number" id="currency-amount" placeholder="Enter amount">
                    </div>
                    
                    <button class="btn" onclick="convertCurrency()">Convert</button>
                    
                    <div id="currency-result" class="result hidden"></div>
                </div>
            `;

            // Define currency conversion functions and data in global scope
            window.currencyData = {
                USD: { name: 'US Dollar', symbol: '$', rate: 1 },
                EUR: { name: 'Euro', symbol: '€', rate: 0.85 },
                GBP: { name: 'British Pound', symbol: '£', rate: 0.75 },
                JPY: { name: 'Japanese Yen', symbol: '¥', rate: 110.2 },
                CAD: { name: 'Canadian Dollar', symbol: 'C$', rate: 1.25 },
                AUD: { name: 'Australian Dollar', symbol: 'A$', rate: 1.35 },
                CNY: { name: 'Chinese Yuan', symbol: '¥', rate: 6.45 },
                INR: { name: 'Indian Rupee', symbol: '₹', rate: 74.5 },
                BRL: { name: 'Brazilian Real', symbol: 'R$', rate: 5.2 },
                ZAR: { name: 'South African Rand', symbol: 'R', rate: 14.8 }
            };

            // Populate currency dropdowns
            const fromSelect = document.getElementById('from-currency');
            const toSelect = document.getElementById('to-currency');
            
            for (const code in currencyData) {
                const currency = currencyData[code];
                fromSelect.innerHTML += `<option value="${code}">${code} - ${currency.name}</option>`;
                toSelect.innerHTML += `<option value="${code}">${code} - ${currency.name}</option>`;
            }
            
            // Set default values
            fromSelect.value = 'USD';
            toSelect.value = 'EUR';

            window.convertCurrency = function() {
                const fromCurrency = document.getElementById('from-currency').value;
                const toCurrency = document.getElementById('to-currency').value;
                const amount = parseFloat(document.getElementById('currency-amount').value);
                const resultDiv = document.getElementById('currency-result');
                
                if (!amount) {
                    alert('Please enter an amount to convert');
                    return;
                }
                
                const fromRate = currencyData[fromCurrency].rate;
                const toRate = currencyData[toCurrency].rate;
                
                // Convert to USD first, then to target currency
                const inUSD = amount / fromRate;
                const result = inUSD * toRate;
                
                const fromSymbol = currencyData[fromCurrency].symbol;
                const toSymbol = currencyData[toCurrency].symbol;
                
                resultDiv.innerHTML = `
                    <p>${fromSymbol}${amount.toFixed(2)} ${fromCurrency} = ${toSymbol}${result.toFixed(2)} ${toCurrency}</p>
                    <p class="small">Exchange rate: 1 ${fromCurrency} = ${(toRate/fromRate).toFixed(4)} ${toCurrency}</p>
                `;
                resultDiv.classList.remove('hidden');
            };
        }
    },
    // Generator Tools
    {
        id: 'password-generator',
        title: 'Password Generator',
        description: 'Generate secure, random passwords',
        icon: 'fas fa-key',
        category: 'generators',
        tags: ['security', 'random', 'password'],
        render: function(container) {
            container.innerHTML = `
                <div class="tool-content">
                    <h2>Password Generator</h2>
                    
                    <div class="input-group">
                        <label for="password-length">Password Length</label>
                        <input type="range" id="password-length" min="8" max="32" value="16" oninput="updatePasswordLength()">
                        <span id="length-value">16 characters</span>
                    </div>
                    
                    <div class="input-group">
                        <label>Include:</label>
                        <div class="checkbox-group">
                            <input type="checkbox" id="include-uppercase" checked>
                            <label for="include-uppercase">Uppercase Letters (A-Z)</label>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" id="include-lowercase" checked>
                            <label for="include-lowercase">Lowercase Letters (a-z)</label>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" id="include-numbers" checked>
                            <label for="include-numbers">Numbers (0-9)</label>
                        </div>
                        <div class="checkbox-group">
                            <input type="checkbox" id="include-symbols" checked>
                            <label for="include-symbols">Special Characters (!@#$%^&*)</label>
                        </div>
                    </div>
                    
                    <button class="btn" onclick="generatePassword()">Generate Password</button>
                    
                    <div id="password-result" class="result hidden">
                        <div class="password-display">
                            <span id="generated-password"></span>
                            <button class="copy-btn" onclick="copyPassword()">Copy</button>
                        </div>
                        <div class="password-strength">
                            <p>Strength: <span id="password-strength"></span></p>
                            <div class="strength-meter">
                                <div id="strength-bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Define password generator functions in global scope
            window.updatePasswordLength = function() {
                const length = document.getElementById('password-length').value;
                document.getElementById('length-value').textContent = `${length} characters`;
            };

            window.generatePassword = function() {
                const length = parseInt(document.getElementById('password-length').value);
                const includeUppercase = document.getElementById('include-uppercase').checked;
                const includeLowercase = document.getElementById('include-lowercase').checked;
                const includeNumbers = document.getElementById('include-numbers').checked;
                const includeSymbols = document.getElementById('include-symbols').checked;
                
                if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
                    alert('Please select at least one character type');
                    return;
                }
                
                let charset = '';
                if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
                if (includeNumbers) charset += '0123456789';
                if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
                
                let password = '';
                for (let i = 0; i < length; i++) {
                    const randomIndex = Math.floor(Math.random() * charset.length);
                    password += charset[randomIndex];
                }
                
                document.getElementById('generated-password').textContent = password;
                
                // Calculate password strength
                let strength = 0;
                if (includeUppercase) strength += 1;
                if (includeLowercase) strength += 1;
                if (includeNumbers) strength += 1;
                if (includeSymbols) strength += 1;
                
                if (length > 12) strength += 1;
                if (length > 16) strength += 1;
                
                const strengthBar = document.getElementById('strength-bar');
                const strengthText = document.getElementById('password-strength');
                
                if (strength <= 2) {
                    strengthBar.style.width = '33%';
                    strengthBar.style.backgroundColor = '#ff4d4d';
                    strengthText.textContent = 'Weak';
                } else if (strength <= 4) {
                    strengthBar.style.width = '66%';
                    strengthBar.style.backgroundColor = '#ffb84d';
                    strengthText.textContent = 'Medium';
                } else {
                    strengthBar.style.width = '100%';
                    strengthBar.style.backgroundColor = '#4CAF50';
                    strengthText.textContent = 'Strong';
                }
                
                document.getElementById('password-result').classList.remove('hidden');
            };

            window.copyPassword = function() {
                const password = document.getElementById('generated-password').textContent;
                navigator.clipboard.writeText(password).then(() => {
                    alert('Password copied to clipboard!');
                });
            };
            
            // Initialize the password length display
            updatePasswordLength();
        }
    },
    {
        id: 'color-generator',
        title: 'Color Generator',
        description: 'Generate and convert color codes',
        icon: 'fas fa-palette',
        category: 'generators',
        tags: ['design', 'colors', 'web'],
        render: function(container) {
            container.innerHTML = `
                <div class="tool-content">
                    <h2>Color Generator</h2>
                    
                    <div class="tool-tabs">
                        <button class="tool-tab active" onclick="switchColorTab('picker')">Color Picker</button>
                        <button class="tool-tab" onclick="switchColorTab('palette')">Color Palette</button>
                        <button class="tool-tab" onclick="switchColorTab('converter')">Color Converter</button>
                    </div>
                    
                    <div id="picker-tab" class="tool-tab-content active">
                        <div class="color-picker">
                            <div class="color-preview" id="color-preview"></div>
                            <div class="input-group">
                                <label for="color-input">Select Color</label>
                                <input type="color" id="color-input" value="#4a6fa5" oninput="updateColorValues()">
                            </div>
                            <div class="color-values" id="color-values"></div>
                        </div>
                    </div>
                    
                    <div id="palette-tab" class="tool-tab-content">
                        <div class="input-group">
                            <label for="palette-type">Palette Type</label>
                            <select id="palette-type">
                                <option value="monochromatic">Monochromatic</option>
                                <option value="analogous">Analogous</option>
                                <option value="complementary">Complementary</option>
                                <option value="triadic">Triadic</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label for="palette-base-color">Base Color</label>
                            <input type="color" id="palette-base-color" value="#4a6fa5">
                        </div>
                        <button class="btn" onclick="generatePalette()">Generate Palette</button>
                        <div id="palette-result" class="color-palette-result hidden"></div>
                    </div>
                    
                    <div id="converter-tab" class="tool-tab-content">
                        <div class="input-group">
                            <label for="converter-type">Input Format</label>
                            <select id="converter-type" onchange="updateConverterFields()">
                                <option value="hex">HEX</option>
                                <option value="rgb">RGB</option>
                                <option value="hsl">HSL</option>
                            </select>
                        </div>
                        
                        <div id="hex-input" class="converter-input">
                            <div class="input-group">
                                <label for="hex-value">HEX Value</label>
                                <input type="text" id="hex-value" placeholder="#RRGGBB">
                            </div>
                        </div>
                        
                        <div id="rgb-input" class="converter-input hidden">
                            <div class="input-group">
                                <label for="rgb-r">Red (0-255)</label>
                                <input type="number" id="rgb-r" min="0" max="255" placeholder="R">
                            </div>
                            <div class="input-group">
                                <label for="rgb-g">Green (0-255)</label>
                                <input type="number" id="rgb-g" min="0" max="255" placeholder="G">
                            </div>
                            <div class="input-group">
                                <label for="rgb-b">Blue (0-255)</label>
                                <input type="number" id="rgb-b" min="0" max="255" placeholder="B">
                            </div>
                        </div>
                        
                        <div id="hsl-input" class="converter-input hidden">
                            <div class="input-group">
                                <label for="hsl-h">Hue (0-360)</label>
                                <input type="number" id="hsl-h" min="0" max="360" placeholder="H">
                            </div>
                            <div class="input-group">
                                <label for="hsl-s">Saturation (0-100%)</label>
                                <input type="number" id="hsl-s" min="0" max="100" placeholder="S">
                            </div>
                            <div class="input-group">
                                <label for="hsl-l">Lightness (0-100%)</label>
                                <input type="number" id="hsl-l" min="0" max="100" placeholder="L">
                            </div>
                        </div>
                        
                        <button class="btn" onclick="convertColor()">Convert</button>
                        
                        <div id="converter-result" class="result hidden"></div>
                    </div>
                </div>
            `;

            // Define color tool functions in global scope
            window.switchColorTab = function(tab) {
                document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tool-tab-content').forEach(t => t.classList.remove('active'));
                
                document.querySelector(`.tool-tab[onclick*="${tab}"]`).classList.add('active');
                document.getElementById(`${tab}-tab`).classList.add('active');
            };

            window.updateColorValues = function() {
                const colorInput = document.getElementById('color-input');
                const colorPreview = document.getElementById('color-preview');
                const colorValues = document.getElementById('color-values');
                
                const hexColor = colorInput.value;
                colorPreview.style.backgroundColor = hexColor;
                
                // Convert to RGB
                const r = parseInt(hexColor.substr(1, 2), 16);
                const g = parseInt(hexColor.substr(3, 2), 16);
                const b = parseInt(hexColor.substr(5, 2), 16);
                
                // Convert to HSL
                const rgbToHsl = (r, g, b) => {
                    r /= 255;
                    g /= 255;
                    b /= 255;
                    
                    const max = Math.max(r, g, b);
                    const min = Math.min(r, g, b);
                    let h, s, l = (max + min) / 2;
                    
                    if (max === min) {
                        h = s = 0; // achromatic
                    } else {
                        const d = max - min;
                        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                        
                        switch (max) {
                            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                            case g: h = (b - r) / d + 2; break;
                            case b: h = (r - g) / d + 4; break;
                        }
                        
                        h /= 6;
                    }
                    
                    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
                };
                
                const [h, s, l] = rgbToHsl(r, g, b);
                
                // Display color values
                colorValues.innerHTML = `
                    <div class="color-value" onclick="copyColorValue('${hexColor}')">${hexColor}</div>
                    <div class="color-value" onclick="copyColorValue('rgb(${r}, ${g}, ${b})')">rgb(${r}, ${g}, ${b})</div>
                    <div class="color-value" onclick="copyColorValue('hsl(${h}, ${s}%, ${l}%)')">hsl(${h}, ${s}%, ${l}%)</div>
                `;
            };

            window.copyColorValue = function(value) {
                navigator.clipboard.writeText(value).then(() => {
                    alert('Color value copied to clipboard!');
                });
            };

            window.updateConverterFields = function() {
                const converterType = document.getElementById('converter-type').value;
                
                document.querySelectorAll('.converter-input').forEach(input => {
                    input.classList.add('hidden');
                });
                
                document.getElementById(`${converterType}-input`).classList.remove('hidden');
            };

            window.convertColor = function() {
                const converterType = document.getElementById('converter-type').value;
                const resultDiv = document.getElementById('converter-result');
                
                let hexColor, rgbColor, hslColor;
                
                if (converterType === 'hex') {
                    const hexValue = document.getElementById('hex-value').value;
                    
                    // Validate hex
                    if (!/^#[0-9A-F]{6}$/i.test(hexValue)) {
                        alert('Please enter a valid HEX color (e.g., #FF5733)');
                        return;
                    }
                    
                    hexColor = hexValue;
                    
                    // Convert to RGB
                    const r = parseInt(hexColor.substr(1, 2), 16);
                    const g = parseInt(hexColor.substr(3, 2), 16);
                    const b = parseInt(hexColor.substr(5, 2), 16);
                    
                    rgbColor = `rgb(${r}, ${g}, ${b})`;
                    
                    // Convert to HSL
                    const [h, s, l] = rgbToHsl(r, g, b);
                    hslColor = `hsl(${h}, ${s}%, ${l}%)`;
                    
                } else if (converterType === 'rgb') {
                    const r = parseInt(document.getElementById('rgb-r').value);
                    const g = parseInt(document.getElementById('rgb-g').value);
                    const b = parseInt(document.getElementById('rgb-b').value);
                    
                    // Validate RGB
                    if (isNaN(r) || isNaN(g) || isNaN(b) || r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
                        alert('Please enter valid RGB values (0-255)');
                        return;
                    }
                    
                    rgbColor = `rgb(${r}, ${g}, ${b})`;
                    
                    // Convert to HEX
                    hexColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
                    
                    // Convert to HSL
                    const [h, s, l] = rgbToHsl(r, g, b);
                    hslColor = `hsl(${h}, ${s}%, ${l}%)`;
                    
                } else if (converterType === 'hsl') {
                    const h = parseInt(document.getElementById('hsl-h').value);
                    const s = parseInt(document.getElementById('hsl-s').value);
                    const l = parseInt(document.getElementById('hsl-l').value);
                    
                    // Validate HSL
                    if (isNaN(h) || isNaN(s) || isNaN(l) || h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) {
                        alert('Please enter valid HSL values (H: 0-360, S/L: 0-100)');
                        return;
                    }
                    
                    hslColor = `hsl(${h}, ${s}%, ${l}%)`;
                    
                    // Convert to RGB
                    const hslToRgb = (h, s, l) => {
                        h /= 360;
                        s /= 100;
                        l /= 100;
                        
                        let r, g, b;
                        
                        if (s === 0) {
                            r = g = b = l; // achromatic
                        } else {
                            const hue2rgb = (p, q, t) => {
                                if (t < 0) t += 1;
                                if (t > 1) t -= 1;
                                if (t < 1/6) return p + (q - p) * 6 * t;
                                if (t < 1/2) return q;
                                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                                return p;
                            };
                            
                            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                            const p = 2 * l - q;
                            
                            r = hue2rgb(p, q, h + 1/3);
                            g = hue2rgb(p, q, h);
                            b = hue2rgb(p, q, h - 1/3);
                        }
                        
                        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
                    };
                    
                    const [r, g, b] = hslToRgb(h, s, l);
                    rgbColor = `rgb(${r}, ${g}, ${b})`;
                    
                    // Convert to HEX
                    hexColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
                }
                
                // Display results
                resultDiv.innerHTML = `
                    <div class="color-preview" style="background-color: ${hexColor}; height: 50px; margin-bottom: 15px;"></div>
                    <div class="color-values">
                        <div class="color-value" onclick="copyColorValue('${hexColor}')">${hexColor}</div>
                        <div class="color-value" onclick="copyColorValue('${rgbColor}')">${rgbColor}</div>
                        <div class="color-value" onclick="copyColorValue('${hslColor}')">${hslColor}</div>
                    </div>
                `;
                
                resultDiv.classList.remove('hidden');
            };

            window.rgbToHsl = function(r, g, b) {
                r /= 255;
                g /= 255;
                b /= 255;
                
                const max = Math.max(r, g, b);
                const min = Math.min(r, g, b);
                let h, s, l = (max + min) / 2;
                
                if (max === min) {
                    h = s = 0; // achromatic
                } else {
                    const d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    
                    switch (max) {
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                    }
                    
                    h /= 6;
                }
                
                return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
            };

            window.generatePalette = function() {
                const baseColor = document.getElementById('palette-base-color').value;
                const paletteType = document.getElementById('palette-type').value;
                const resultDiv = document.getElementById('palette-result');
                
                // Convert base color to HSL
                const r = parseInt(baseColor.substr(1, 2), 16);
                const g = parseInt(baseColor.substr(3, 2), 16);
                const b = parseInt(baseColor.substr(5, 2), 16);
                
                const [h, s, l] = rgbToHsl(r, g, b);
                
                let colors = [];
                
                if (paletteType === 'monochromatic') {
                    // Generate 5 colors with different lightness
                    colors = [
                        [h, s, Math.max(l - 30, 10)],
                        [h, s, Math.max(l - 15, 10)],
                        [h, s, l],
                        [h, s, Math.min(l + 15, 90)],
                        [h, s, Math.min(l + 30, 90)]
                    ];
                } else if (paletteType === 'analogous') {
                    // Generate 5 colors with adjacent hues
                    colors = [
                        [(h - 40 + 360) % 360, s, l],
                        [(h - 20 + 360) % 360, s, l],
                        [h, s, l],
                        [(h + 20) % 360, s, l],
                        [(h + 40) % 360, s, l]
                    ];
                } else if (paletteType === 'complementary') {
                    // Generate 5 colors with complementary hue
                    const complementary = (h + 180) % 360;
                    colors = [
                        [h, s, Math.max(l - 15, 10)],
                        [h, s, l],
                        [h, s, Math.min(l + 15, 90)],
                        [complementary, s, Math.max(l - 15, 10)],
                        [complementary, s, l]
                    ];
                } else if (paletteType === 'triadic') {
                    // Generate 5 colors with triadic hues
                    const triad1 = (h + 120) % 360;
                    const triad2 = (h + 240) % 360;
                    colors = [
                        [h, s, l],
                        [h, Math.max(s - 20, 10), l],
                        [triad1, s, l],
                        [triad1, Math.max(s - 20, 10), l],
                        [triad2, s, l]
                    ];
                }
                
                // Convert HSL colors to HEX
                const hslToHex = (h, s, l) => {
                    h /= 360;
                    s /= 100;
                    l /= 100;
                    
                    let r, g, b;
                    
                    if (s === 0) {
                        r = g = b = l; // achromatic
                    } else {
                        const hue2rgb = (p, q, t) => {
                            if (t < 0) t += 1;
                            if (t > 1) t -= 1;
                            if (t < 1/6) return p + (q - p) * 6 * t;
                            if (t < 1/2) return q;
                            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                            return p;
                        };
                        
                        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                        const p = 2 * l - q;
                        
                        r = hue2rgb(p, q, h + 1/3);
                        g = hue2rgb(p, q, h);
                        b = hue2rgb(p, q, h - 1/3);
                    }
                    
                    const toHex = x => {
                        const hex = Math.round(x * 255).toString(16);
                        return hex.length === 1 ? '0' + hex : hex;
                    };
                    
                    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
                };
                
                const hexColors = colors.map(([h, s, l]) => hslToHex(h, s, l));
                
                // Display palette
                let paletteHTML = '<div class="color-palette">';
                
                hexColors.forEach(color => {
                    paletteHTML += `
                        <div class="palette-color">
                            <div class="color-swatch" style="background-color: ${color}"></div>
                            <div class="color-value" onclick="copyColorValue('${color}')">${color}</div>
                        </div>
                    `;
                });
                
                paletteHTML += '</div>';
                
                resultDiv.innerHTML = paletteHTML;
                resultDiv.classList.remove('hidden');
            };
            
            // Initialize color picker
            updateColorValues();
        }
    }
];

// Combine with main tools array
tools.push(...additionalTools);
