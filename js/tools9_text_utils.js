// Text Utility Tools for the Utility Hub application

// Text Case Converter Tool
const textCaseConverterTool = {
    id: 'text-case-converter',
    title: 'Text Case Converter',
    description: 'Convert text between different cases (uppercase, lowercase, title case, etc.)',
    icon: 'fas fa-font',
    category: 'text-edit',
    tags: ['text', 'case', 'converter', 'formatting'],
    render: function(container) {
        container.innerHTML = `
            <div class="tool-content">
                <h2>Text Case Converter</h2>
                <div class="converter-container">
                    <textarea id="case-input" placeholder="Enter your text here..." rows="6"></textarea>
                    <div class="button-group">
                        <button onclick="convertCase('upper')" class="btn">UPPERCASE</button>
                        <button onclick="convertCase('lower')" class="btn">lowercase</button>
                        <button onclick="convertCase('title')" class="btn">Title Case</button>
                        <button onclick="convertCase('sentence')" class="btn">Sentence case</button>
                        <button onclick="convertCase('camel')" class="btn">camelCase</button>
                        <button onclick="convertCase('snake')" class="btn">snake_case</button>
                        <button onclick="convertCase('kebab')" class="btn">kebab-case</button>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .converter-container {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            .button-group {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            #case-input {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                font-size: 16px;
                resize: vertical;
            }
        `;
        document.head.appendChild(style);

        // Case conversion functions
        window.convertCase = function(type) {
            const input = document.getElementById('case-input');
            const text = input.value;
            
            if (!text.trim()) {
                alert('Please enter some text first!');
                return;
            }

            switch(type) {
                case 'upper':
                    input.value = text.toUpperCase();
                    break;
                case 'lower':
                    input.value = text.toLowerCase();
                    break;
                case 'title':
                    input.value = text.toLowerCase().split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                    break;
                case 'sentence':
                    input.value = text.toLowerCase().split('. ')
                        .map(sentence => sentence.charAt(0).toUpperCase() + sentence.slice(1))
                        .join('. ');
                    break;
                case 'camel':
                    input.value = text.toLowerCase()
                        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
                    break;
                case 'snake':
                    input.value = text.toLowerCase()
                        .replace(/[^a-zA-Z0-9]+/g, '_');
                    break;
                case 'kebab':
                    input.value = text.toLowerCase()
                        .replace(/[^a-zA-Z0-9]+/g, '-');
                    break;
            }
        };
    }
};

// Text Diff Comparison Tool
const textDiffTool = {
    id: 'text-diff',
    title: 'Text Diff Comparison',
    description: 'Compare two texts and see the differences',
    icon: 'fas fa-code-branch',
    category: 'text-edit',
    tags: ['text', 'diff', 'compare', 'difference'],
    render: function(container) {
        container.innerHTML = `
            <div class="tool-content">
                <h2>Text Diff Comparison</h2>
                <div class="diff-container">
                    <div class="input-group">
                        <label>Original Text:</label>
                        <textarea id="original-text" placeholder="Enter original text..." rows="8"></textarea>
                    </div>
                    <div class="input-group">
                        <label>Modified Text:</label>
                        <textarea id="modified-text" placeholder="Enter modified text..." rows="8"></textarea>
                    </div>
                    <button onclick="compareTexts()" class="btn">Compare Texts</button>
                    <div id="diff-result" class="diff-result"></div>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .diff-container {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            .input-group {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            .input-group textarea {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                font-size: 14px;
                resize: vertical;
            }
            .diff-result {
                margin-top: 15px;
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                white-space: pre-wrap;
                font-family: monospace;
            }
            .diff-added {
                background-color: #e6ffe6;
                color: #006600;
            }
            .diff-removed {
                background-color: #ffe6e6;
                color: #cc0000;
            }
        `;
        document.head.appendChild(style);

        // Text comparison function
        window.compareTexts = function() {
            const original = document.getElementById('original-text').value;
            const modified = document.getElementById('modified-text').value;
            
            if (!original.trim() || !modified.trim()) {
                alert('Please enter both original and modified texts!');
                return;
            }

            const diffResult = document.getElementById('diff-result');
            diffResult.innerHTML = '';

            // Simple diff algorithm
            const originalLines = original.split('\\n');
            const modifiedLines = modified.split('\\n');
            
            let output = '';
            let i = 0, j = 0;
            
            while (i < originalLines.length || j < modifiedLines.length) {
                if (i >= originalLines.length) {
                    // All remaining lines are additions
                    output += \`<div class="diff-added">+ \${modifiedLines[j]}</div>\`;
                    j++;
                } else if (j >= modifiedLines.length) {
                    // All remaining lines are removals
                    output += \`<div class="diff-removed">- \${originalLines[i]}</div>\`;
                    i++;
                } else if (originalLines[i] === modifiedLines[j]) {
                    // Lines are the same
                    output += \`<div>\${originalLines[i]}</div>\`;
                    i++;
                    j++;
                } else {
                    // Lines are different
                    output += \`<div class="diff-removed">- \${originalLines[i]}</div>\`;
                    output += \`<div class="diff-added">+ \${modifiedLines[j]}</div>\`;
                    i++;
                    j++;
                }
            }
            
            diffResult.innerHTML = output;
        };
    }
};

// Word Counter Tool
const wordCounterTool = {
    id: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs',
    icon: 'fas fa-calculator',
    category: 'text-edit',
    tags: ['text', 'counter', 'statistics', 'analysis'],
    render: function(container) {
        container.innerHTML = `
            <div class="tool-content">
                <h2>Word Counter</h2>
                <div class="counter-container">
                    <textarea id="counter-input" placeholder="Enter or paste your text here..." rows="10" 
                        oninput="updateCounts()"></textarea>
                    <div class="stats-container">
                        <div class="stat-item">
                            <span class="stat-label">Words:</span>
                            <span id="word-count" class="stat-value">0</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Characters (with spaces):</span>
                            <span id="char-count" class="stat-value">0</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Characters (without spaces):</span>
                            <span id="char-no-spaces" class="stat-value">0</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Sentences:</span>
                            <span id="sentence-count" class="stat-value">0</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Paragraphs:</span>
                            <span id="paragraph-count" class="stat-value">0</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Reading Time:</span>
                            <span id="reading-time" class="stat-value">0 min</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .counter-container {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
            #counter-input {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                font-size: 16px;
                resize: vertical;
            }
            .stats-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                padding: 15px;
                background-color: #f8f9fa;
                border-radius: var(--border-radius);
            }
            .stat-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            .stat-label {
                font-size: 14px;
                color: #666;
            }
            .stat-value {
                font-size: 18px;
                font-weight: bold;
                color: var(--primary-color);
            }
        `;
        document.head.appendChild(style);

        // Word counter function
        window.updateCounts = function() {
            const text = document.getElementById('counter-input').value;
            
            // Word count
            const words = text.trim().split(/\\s+/).filter(word => word.length > 0);
            document.getElementById('word-count').textContent = words.length;
            
            // Character counts
            document.getElementById('char-count').textContent = text.length;
            document.getElementById('char-no-spaces').textContent = text.replace(/\\s/g, '').length;
            
            // Sentence count (basic implementation)
            const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
            document.getElementById('sentence-count').textContent = sentences.length;
            
            // Paragraph count
            const paragraphs = text.split('\\n\\n').filter(para => para.trim().length > 0);
            document.getElementById('paragraph-count').textContent = paragraphs.length;
            
            // Reading time (assuming 200 words per minute)
            const readingMinutes = Math.ceil(words.length / 200);
            document.getElementById('reading-time').textContent = 
                readingMinutes === 1 ? '1 min' : \`\${readingMinutes} mins\`;
        };
    }
};

// Add all tools to the main tools array
tools.push(textCaseConverterTool);
tools.push(textDiffTool);
tools.push(wordCounterTool);
