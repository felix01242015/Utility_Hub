// Python Launcher Tool for the Utility Hub application

const pythonLauncherTool = {
    id: 'python-launcher',
    title: 'Python Launcher',
    description: 'Run Python code with an integrated terminal',
    icon: 'fab fa-python',
    category: 'developers',
    tags: ['python', 'code', 'terminal', 'development'],
    render: async function(container) {
        container.innerHTML = `
            <div class="tool-content">
                <h2>Python Launcher</h2>
                <div class="python-container">
                    <!-- Code Editor Section -->
                    <div class="editor-section">
                        <div class="editor-header">
                            <h3>Code Editor</h3>
                            <div class="editor-controls">
                                <button onclick="loadExample()" class="btn-icon" title="Load Example">
                                    <i class="fas fa-book"></i>
                                </button>
                                <button onclick="clearEditor()" class="btn-icon" title="Clear">
                                    <i class="fas fa-eraser"></i>
                                </button>
                                <button onclick="copyCode()" class="btn-icon" title="Copy">
                                    <i class="fas fa-copy"></i>
                                </button>
                                <button onclick="runPython()" class="btn run-btn" title="Run (Ctrl+Enter)">
                                    <i class="fas fa-play"></i> Run
                                </button>
                            </div>
                        </div>
                        <textarea id="python-code" placeholder="Enter your Python code here..." spellcheck="false">print("Hello, World!")</textarea>
                    </div>

                    <!-- Terminal Section -->
                    <div class="terminal-section">
                        <div class="terminal-header">
                            <h3>Terminal Output</h3>
                            <div class="terminal-controls">
                                <button onclick="clearTerminal()" class="btn-icon" title="Clear Terminal">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div id="terminal-output"></div>
                    </div>

                    <!-- Package Manager -->
                    <div class="package-manager">
                        <div class="package-header">
                            <h3>Package Manager</h3>
                            <div class="package-controls">
                                <input type="text" id="package-name" placeholder="Enter package name">
                                <button onclick="installPackage()" class="btn">
                                    <i class="fas fa-download"></i> Install
                                </button>
                            </div>
                        </div>
                        <div id="installed-packages"></div>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .python-container {
                display: grid;
                grid-template-columns: 1fr;
                gap: 20px;
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
            }

            @media (min-width: 1024px) {
                .python-container {
                    grid-template-columns: 1fr 1fr;
                }
                .package-manager {
                    grid-column: 1 / -1;
                }
            }

            .editor-section,
            .terminal-section,
            .package-manager {
                background: #f8f9fa;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                overflow: hidden;
            }

            .editor-header,
            .terminal-header,
            .package-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 15px;
                background: #e9ecef;
                border-bottom: 1px solid #ddd;
            }

            .editor-controls,
            .terminal-controls,
            .package-controls {
                display: flex;
                gap: 10px;
                align-items: center;
            }

            #python-code {
                width: 100%;
                height: 400px;
                padding: 15px;
                font-family: 'Consolas', monospace;
                font-size: 14px;
                line-height: 1.5;
                border: none;
                resize: vertical;
                background: #282c34;
                color: #abb2bf;
            }

            #terminal-output {
                height: 400px;
                padding: 15px;
                font-family: 'Consolas', monospace;
                font-size: 14px;
                line-height: 1.5;
                overflow-y: auto;
                background: #282c34;
                color: #abb2bf;
                white-space: pre-wrap;
            }

            .run-btn {
                background: var(--primary-color);
                color: white;
            }

            .run-btn:hover {
                background: var(--primary-color-dark);
            }

            .package-controls {
                flex: 1;
                margin-left: 20px;
            }

            .package-controls input {
                flex: 1;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                font-size: 14px;
            }

            #installed-packages {
                padding: 15px;
                max-height: 200px;
                overflow-y: auto;
            }

            .package-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px;
                background: white;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                margin-bottom: 5px;
            }

            .package-item button {
                padding: 4px 8px;
                font-size: 12px;
            }

            .error-output {
                color: #e06c75;
            }

            .success-output {
                color: #98c379;
            }

            .info-output {
                color: #61afef;
            }
        `;
        document.head.appendChild(style);

        // Load Pyodide
        const terminal = document.getElementById('terminal-output');
        terminal.textContent = 'Loading Python environment...';

        try {
            // Load Pyodide script
            if (!window.loadPyodide) {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
                document.head.appendChild(script);
                await new Promise(resolve => script.onload = resolve);
            }

            window.pyodide = await loadPyodide({
                stdout: (text) => appendToTerminal(text, 'normal'),
                stderr: (text) => appendToTerminal(text, 'error')
            });

            terminal.textContent = 'Python environment ready!\n';
            appendToTerminal('Python ' + pyodide.version + '\nType your code and click Run or press Ctrl+Enter\n', 'info');
        } catch (error) {
            terminal.textContent = 'Error loading Python environment: ' + error.message;
            return;
        }

        // Set up keyboard shortcuts
        document.getElementById('python-code').addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                runPython();
            }
        });

        // Define global functions
        window.appendToTerminal = function(text, type = 'normal') {
            const terminal = document.getElementById('terminal-output');
            const output = document.createElement('div');
            output.textContent = text;
            output.className = type + '-output';
            terminal.appendChild(output);
            terminal.scrollTop = terminal.scrollHeight;
        };

        window.clearTerminal = function() {
            document.getElementById('terminal-output').textContent = '';
        };

        window.clearEditor = function() {
            document.getElementById('python-code').value = '';
        };

        window.copyCode = function() {
            const code = document.getElementById('python-code');
            navigator.clipboard.writeText(code.value).then(() => {
                const btn = document.querySelector('.fa-copy').parentElement;
                btn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        };

        window.loadExample = function() {
            const examples = [
`# Basic calculation
def calculate_fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib

# Generate first 10 Fibonacci numbers
result = calculate_fibonacci(10)
print("First 10 Fibonacci numbers:")
print(result)`,

`# Data visualization example
import matplotlib.pyplot as plt
import numpy as np

# Generate data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Create plot
plt.figure(figsize=(8, 4))
plt.plot(x, y, 'b-', label='sin(x)')
plt.title('Sine Wave')
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.grid(True)
plt.legend()
plt.show()`,

`# Simple text analysis
text = """
Python is a high-level, interpreted programming language.
It was created by Guido van Rossum and released in 1991.
Python's design philosophy emphasizes code readability.
"""

# Count words
words = text.split()
word_count = len(words)

# Count characters
char_count = len(text)

# Count lines
lines = text.strip().split('\\n')
line_count = len(lines)

print(f"Text Analysis:")
print(f"Words: {word_count}")
print(f"Characters: {char_count}")
print(f"Lines: {line_count}")

# Word frequency
from collections import Counter
word_freq = Counter(words)
print("\\nMost common words:")
for word, count in word_freq.most_common(5):
    print(f"{word}: {count}")`
            ];

            const code = document.getElementById('python-code');
            code.value = examples[Math.floor(Math.random() * examples.length)];
        };

        window.runPython = async function() {
            const code = document.getElementById('python-code').value;
            if (!code.trim()) return;

            appendToTerminal('\n>>> Running Python code...\n', 'info');
            
            try {
                const result = await pyodide.runPythonAsync(code);
                if (result !== undefined) {
                    appendToTerminal(result + '\n');
                }
                appendToTerminal('>>> Execution completed.\n', 'success');
            } catch (error) {
                appendToTerminal(error + '\n', 'error');
            }
        };

        window.installPackage = async function() {
            const packageName = document.getElementById('package-name').value.trim();
            if (!packageName) return;

            appendToTerminal(`\n>>> Installing package: ${packageName}...\n`, 'info');
            
            try {
                await pyodide.loadPackage(packageName);
                appendToTerminal(`Package ${packageName} installed successfully!\n`, 'success');
                
                // Add to installed packages list
                const container = document.getElementById('installed-packages');
                const item = document.createElement('div');
                item.className = 'package-item';
                item.innerHTML = `
                    <span>${packageName}</span>
                    <button onclick="this.parentElement.remove()" class="btn-icon">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                container.appendChild(item);
            } catch (error) {
                appendToTerminal(`Failed to install ${packageName}: ${error}\n`, 'error');
            }
            
            document.getElementById('package-name').value = '';
        };
    }
};

// Add the Python Launcher tool to the main tools array
tools.push(pythonLauncherTool);
