// Developer tools for the Utility Hub application
const devTools = [
    // JSON Validator
    {
        id: 'json-validator',
        title: 'JSON Validator',
        description: 'Validate and format JSON data',
        icon: 'fas fa-check-circle',
        category: 'developers',
        tags: ['json', 'validator', 'formatter', 'developer'],
        render: function(container) {
            container.innerHTML = `
                <div class="tool-content">
                    <h2>JSON Validator</h2>
                    
                    <div class="input-group">
                        <label for="json-input">JSON Input</label>
                        <textarea id="json-input" rows="10" placeholder="Paste your JSON here..."></textarea>
                    </div>
                    
                    <div class="button-group">
                        <button class="btn" onclick="validateJSON()">Validate</button>
                        <button class="btn" onclick="formatJSON()">Format</button>
                        <button class="btn" onclick="minifyJSON()">Minify</button>
                        <button class="btn" onclick="clearJSON()">Clear</button>
                    </div>
                    
                    <div id="json-result" class="result hidden">
                        <div class="result-header">
                            <h3>Result</h3>
                            <div class="result-actions">
                                <span id="json-status"></span>
                                <button class="copy-btn" onclick="copyJSONResult()">Copy</button>
                            </div>
                        </div>
                        <pre id="json-output"></pre>
                    </div>
                </div>
            `;

            // Define JSON Validator functions in global scope
            window.validateJSON = function() {
                const input = document.getElementById('json-input').value.trim();
                const resultContainer = document.getElementById('json-result');
                const statusElement = document.getElementById('json-status');
                const outputElement = document.getElementById('json-output');
                
                if (!input) {
                    alert('Please enter JSON to validate');
                    return;
                }
                
                try {
                    // Parse the JSON to validate it
                    JSON.parse(input);
                    
                    // If no error is thrown, JSON is valid
                    statusElement.innerHTML = '<span class="valid-json">✓ Valid JSON</span>';
                    outputElement.textContent = 'The JSON is valid!';
                    resultContainer.classList.remove('hidden');
                } catch (error) {
                    // JSON is invalid
                    statusElement.innerHTML = '<span class="invalid-json">✗ Invalid JSON</span>';
                    outputElement.textContent = 'Error: ' + error.message;
                    resultContainer.classList.remove('hidden');
                }
            };

            window.formatJSON = function() {
                const input = document.getElementById('json-input').value.trim();
                const resultContainer = document.getElementById('json-result');
                const statusElement = document.getElementById('json-status');
                const outputElement = document.getElementById('json-output');
                
                if (!input) {
                    alert('Please enter JSON to format');
                    return;
                }
                
                try {
                    // Parse and stringify with indentation
                    const parsedJSON = JSON.parse(input);
                    const formattedJSON = JSON.stringify(parsedJSON, null, 2);
                    
                    // Display the formatted JSON
                    statusElement.innerHTML = '<span class="valid-json">✓ Formatted</span>';
                    outputElement.textContent = formattedJSON;
                    resultContainer.classList.remove('hidden');
                    
                    // Update the input with formatted JSON
                    document.getElementById('json-input').value = formattedJSON;
                } catch (error) {
                    // JSON is invalid
                    statusElement.innerHTML = '<span class="invalid-json">✗ Invalid JSON</span>';
                    outputElement.textContent = 'Error: ' + error.message;
                    resultContainer.classList.remove('hidden');
                }
            };

            window.minifyJSON = function() {
                const input = document.getElementById('json-input').value.trim();
                const resultContainer = document.getElementById('json-result');
                const statusElement = document.getElementById('json-status');
                const outputElement = document.getElementById('json-output');
                
                if (!input) {
                    alert('Please enter JSON to minify');
                    return;
                }
                
                try {
                    // Parse and stringify without indentation
                    const parsedJSON = JSON.parse(input);
                    const minifiedJSON = JSON.stringify(parsedJSON);
                    
                    // Display the minified JSON
                    statusElement.innerHTML = '<span class="valid-json">✓ Minified</span>';
                    outputElement.textContent = minifiedJSON;
                    resultContainer.classList.remove('hidden');
                } catch (error) {
                    // JSON is invalid
                    statusElement.innerHTML = '<span class="invalid-json">✗ Invalid JSON</span>';
                    outputElement.textContent = 'Error: ' + error.message;
                    resultContainer.classList.remove('hidden');
                }
            };

            window.clearJSON = function() {
                document.getElementById('json-input').value = '';
                document.getElementById('json-result').classList.add('hidden');
            };

            window.copyJSONResult = function() {
                const output = document.getElementById('json-output').textContent;
                navigator.clipboard.writeText(output).then(() => {
                    alert('Copied to clipboard!');
                });
            };
            
            // Add some CSS for the JSON Validator
            const style = document.createElement('style');
            style.textContent = `
                .valid-json {
                    color: #28a745;
                    font-weight: bold;
                }
                
                .invalid-json {
                    color: #dc3545;
                    font-weight: bold;
                }
                
                .button-group {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                    flex-wrap: wrap;
                }
                
                .result-actions {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                
                #json-output {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: var(--border-radius);
                    overflow-x: auto;
                    white-space: pre-wrap;
                    word-break: break-word;
                    max-height: 300px;
                    overflow-y: auto;
                }
            `;
            document.head.appendChild(style);
        }
    },
    
    // CSS Minifier
    {
        id: 'css-minifier',
        title: 'CSS Minifier',
        description: 'Minify and beautify CSS code',
        icon: 'fab fa-css3-alt',
        category: 'developers',
        tags: ['css', 'minify', 'beautify', 'developer'],
        render: function(container) {
            container.innerHTML = `
                <div class="tool-content">
                    <h2>CSS Minifier & Beautifier</h2>
                    
                    <div class="input-group">
                        <label for="css-input">CSS Code</label>
                        <textarea id="css-input" rows="10" placeholder="Paste your CSS code here..."></textarea>
                    </div>
                    
                    <div class="button-group">
                        <button class="btn" onclick="minifyCSS()">Minify CSS</button>
                        <button class="btn" onclick="beautifyCSS()">Beautify CSS</button>
                        <button class="btn" onclick="clearCSS()">Clear</button>
                    </div>
                    
                    <div id="css-result" class="result hidden">
                        <div class="result-header">
                            <h3>Result</h3>
                            <div class="result-actions">
                                <span id="css-status"></span>
                                <button class="copy-btn" onclick="copyCSSResult()">Copy</button>
                            </div>
                        </div>
                        <pre id="css-output"></pre>
                        <div class="stats">
                            <div class="stat-item">
                                <span class="stat-label">Original Size:</span>
                                <span id="original-size">0 bytes</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Result Size:</span>
                                <span id="result-size">0 bytes</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Savings:</span>
                                <span id="size-savings">0%</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Define CSS Minifier functions in global scope
            window.minifyCSS = function() {
                const input = document.getElementById('css-input').value;
                
                if (!input) {
                    alert('Please enter CSS to minify');
                    return;
                }
                
                try {
                    // Simple CSS minification
                    let minified = input
                        // Remove comments
                        .replace(/\/\*[\s\S]*?\*\//g, '')
                        // Remove whitespace around symbols
                        .replace(/\s*([{}:;,])\s*/g, '$1')
                        // Remove whitespace at start/end
                        .trim()
                        // Remove line breaks
                        .replace(/\n/g, '')
                        // Remove multiple spaces
                        .replace(/\s+/g, ' ')
                        // Remove spaces after colons in selectors
                        .replace(/:\s+/g, ':')
                        // Remove spaces after commas
                        .replace(/,\s+/g, ',')
                        // Remove semicolons before closing braces
                        .replace(/;\}/g, '}');
                    
                    displayCSSResult(input, minified, 'Minified');
                } catch (error) {
                    document.getElementById('css-status').innerHTML = '<span class="invalid-css">✗ Error</span>';
                    document.getElementById('css-output').textContent = 'Error: ' + error.message;
                    document.getElementById('css-result').classList.remove('hidden');
                }
            };

            window.beautifyCSS = function() {
                const input = document.getElementById('css-input').value;
                
                if (!input) {
                    alert('Please enter CSS to beautify');
                    return;
                }
                
                try {
                    // Simple CSS beautification
                    let beautified = input
                        // Remove existing whitespace
                        .replace(/\s*([{}:;,])\s*/g, '$1')
                        .trim()
                        // Add line break after closing braces
                        .replace(/}/g, '}\n')
                        // Add line break after semicolons
                        .replace(/;/g, ';\n    ')
                        // Add space after colons
                        .replace(/:/g, ': ')
                        // Add line break and indent after opening braces
                        .replace(/{/g, ' {\n    ')
                        // Fix double indents
                        .replace(/\n\s+\n\s+/g, '\n    ')
                        // Add line breaks between selectors
                        .replace(/}\n([^@])/g, '}\n\n$1')
                        // Preserve media queries formatting
                        .replace(/@media/g, '\n@media');
                    
                    displayCSSResult(input, beautified, 'Beautified');
                } catch (error) {
                    document.getElementById('css-status').innerHTML = '<span class="invalid-css">✗ Error</span>';
                    document.getElementById('css-output').textContent = 'Error: ' + error.message;
                    document.getElementById('css-result').classList.remove('hidden');
                }
            };

            window.displayCSSResult = function(input, output, action) {
                const originalSize = new Blob([input]).size;
                const resultSize = new Blob([output]).size;
                const savings = originalSize > 0 ? ((originalSize - resultSize) / originalSize * 100).toFixed(2) : 0;
                
                document.getElementById('css-status').innerHTML = `<span class="valid-css">✓ ${action}</span>`;
                document.getElementById('css-output').textContent = output;
                document.getElementById('original-size').textContent = formatBytes(originalSize);
                document.getElementById('result-size').textContent = formatBytes(resultSize);
                
                if (action === 'Minified') {
                    document.getElementById('size-savings').textContent = `${savings}% saved`;
                } else {
                    document.getElementById('size-savings').textContent = `${Math.abs(savings)}% added`;
                }
                
                document.getElementById('css-result').classList.remove('hidden');
            };

            window.formatBytes = function(bytes, decimals = 2) {
                if (bytes === 0) return '0 Bytes';
                
                const k = 1024;
                const dm = decimals < 0 ? 0 : decimals;
                const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            };

            window.clearCSS = function() {
                document.getElementById('css-input').value = '';
                document.getElementById('css-result').classList.add('hidden');
            };

            window.copyCSSResult = function() {
                const output = document.getElementById('css-output').textContent;
                navigator.clipboard.writeText(output).then(() => {
                    alert('Copied to clipboard!');
                });
            };
            
            // Add some CSS for the CSS Minifier
            const style = document.createElement('style');
            style.textContent = `
                .valid-css {
                    color: #28a745;
                    font-weight: bold;
                }
                
                .invalid-css {
                    color: #dc3545;
                    font-weight: bold;
                }
                
                .stats {
                    display: flex;
                    justify-content: space-between;
                    background-color: #f8f9fa;
                    padding: 10px 15px;
                    border-radius: var(--border-radius);
                    margin-top: 15px;
                    flex-wrap: wrap;
                }
                
                .stat-item {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                
                .stat-label {
                    font-weight: bold;
                    color: var(--text-light);
                }
            `;
            document.head.appendChild(style);
        }
    }
];

// Combine with main tools array
tools.push(...devTools);
