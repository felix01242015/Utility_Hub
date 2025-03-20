// Rich Text Editor Tool for the Utility Hub application
const richTextEditorTool = {
    id: 'rich-text-editor',
    title: 'Rich Text Editor',
    description: 'WYSIWYG text editor with formatting options',
    icon: 'fas fa-edit',
    category: 'text-edit',
    tags: ['editor', 'rich text', 'wysiwyg', 'formatting'],
    render: function(container) {
        container.innerHTML = `
            <div class="tool-content">
                <h2>Rich Text Editor</h2>
                <div class="file-actions">
                    <div class="file-input-wrapper">
                        <input type="file" id="rich-text-file" accept=".txt,.md" onchange="importTextFile(this)">
                        <label for="rich-text-file" class="btn">Import .txt/.md file</label>
                    </div>
                    <div class="export-buttons">
                        <button class="btn" onclick="exportContent('.md')">Export as .md</button>
                        <button class="btn" onclick="exportContent('.txt')">Export as .txt</button>
                    </div>
                </div>
                <div class="editor-toolbar">
                    <button onclick="execCommand('bold')" title="Bold"><i class="fas fa-bold"></i></button>
                    <button onclick="execCommand('italic')" title="Italic"><i class="fas fa-italic"></i></button>
                    <button onclick="execCommand('underline')" title="Underline"><i class="fas fa-underline"></i></button>
                    <span class="separator">|</span>
                    <button onclick="execCommand('justifyLeft')" title="Align Left"><i class="fas fa-align-left"></i></button>
                    <button onclick="execCommand('justifyCenter')" title="Align Center"><i class="fas fa-align-center"></i></button>
                    <button onclick="execCommand('justifyRight')" title="Align Right"><i class="fas fa-align-right"></i></button>
                    <span class="separator">|</span>
                    <button onclick="execCommand('insertUnorderedList')" title="Bullet List"><i class="fas fa-list-ul"></i></button>
                    <button onclick="execCommand('insertOrderedList')" title="Numbered List"><i class="fas fa-list-ol"></i></button>
                    <span class="separator">|</span>
                    <select onchange="execCommand('formatBlock', this.value)" title="Heading">
                        <option value="p">Paragraph</option>
                        <option value="h1">Heading 1</option>
                        <option value="h2">Heading 2</option>
                        <option value="h3">Heading 3</option>
                    </select>
                    <select onchange="execCommand('fontName', this.value)" title="Font">
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Verdana">Verdana</option>
                    </select>
                    <select onchange="execCommand('fontSize', this.value)" title="Size">
                        <option value="1">Small</option>
                        <option value="3" selected>Normal</option>
                        <option value="5">Large</option>
                        <option value="7">Extra Large</option>
                    </select>
                    <input type="color" onchange="execCommand('foreColor', this.value)" title="Text Color">
                    <span class="separator">|</span>
                    <button onclick="clearFormat()" title="Clear Formatting"><i class="fas fa-remove-format"></i></button>
                </div>
                <div id="rich-text-content" contenteditable="true" class="editor-content"></div>
                <div class="editor-actions">
                    <button class="btn" onclick="copyContent()">Copy to Clipboard</button>
                    <button class="btn" onclick="clearContent()">Clear Content</button>
                </div>
            </div>
        `;

        // Define editor functions in global scope
        // Export content function
        window.exportContent = function(fileType) {
            const content = document.getElementById('rich-text-content');
            if (!content.textContent.trim()) {
                alert('No content to export!');
                return;
            }

            let exportContent = '';
            if (fileType === '.md') {
                // Convert HTML to Markdown
                exportContent = htmlToMarkdown(content);
            } else {
                // For .txt, just get the text content
                exportContent = content.innerText;
            }

            const blob = new Blob([exportContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
            a.href = url;
            a.download = `rich-text-export-${timestamp}${fileType}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        };

        // Convert HTML to Markdown
        function htmlToMarkdown(element) {
            let markdown = '';
            const nodes = element.childNodes;

            for (const node of nodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    markdown += node.textContent;
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    const tagName = node.tagName.toLowerCase();
                    const content = node.innerHTML;

                    switch (tagName) {
                        case 'h1':
                            markdown += `# ${node.textContent}\n\n`;
                            break;
                        case 'h2':
                            markdown += `## ${node.textContent}\n\n`;
                            break;
                        case 'h3':
                            markdown += `### ${node.textContent}\n\n`;
                            break;
                        case 'p':
                            markdown += `${node.textContent}\n\n`;
                            break;
                        case 'strong':
                        case 'b':
                            markdown += `**${node.textContent}**`;
                            break;
                        case 'em':
                        case 'i':
                            markdown += `*${node.textContent}*`;
                            break;
                        case 'code':
                            markdown += `\`${node.textContent}\``;
                            break;
                        case 'pre':
                            markdown += `\`\`\`\n${node.textContent}\n\`\`\`\n\n`;
                            break;
                        case 'a':
                            markdown += `[${node.textContent}](${node.href})`;
                            break;
                        case 'ul':
                            for (const li of node.children) {
                                markdown += `* ${li.textContent}\n`;
                            }
                            markdown += '\n';
                            break;
                        case 'ol':
                            let i = 1;
                            for (const li of node.children) {
                                markdown += `${i}. ${li.textContent}\n`;
                                i++;
                            }
                            markdown += '\n';
                            break;
                        case 'br':
                            markdown += '\n';
                            break;
                        default:
                            markdown += node.textContent;
                    }
                }
            }

            return markdown.trim();
        }

        window.importTextFile = function(input) {
            const file = input.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const content = e.target.result;
                // Check if it's a markdown file
                if (file.name.toLowerCase().endsWith('.md')) {
                    // Convert markdown to HTML
                    const html = simpleMarkdownToHtml(content);
                    document.getElementById('rich-text-content').innerHTML = html;
                } else {
                    // For .txt files, preserve line breaks
                    const textWithBreaks = content.replace(/\n/g, '<br>');
                    document.getElementById('rich-text-content').innerHTML = textWithBreaks;
                }
            };
            reader.onerror = function(e) {
                alert('Error reading file: ' + e.target.error);
            };
            reader.readAsText(file);
        };

        // Simple Markdown to HTML converter for imported MD files
        function simpleMarkdownToHtml(markdown) {
            if (!markdown) return '';
            
            // Handle headings
            let html = markdown
                .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                .replace(/^# (.+)$/gm, '<h1>$1</h1>');
            
            // Handle bold and italic
            html = html
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.+?)\*/g, '<em>$1</em>')
                .replace(/\_\_(.+?)\_\_/g, '<strong>$1</strong>')
                .replace(/\_(.+?)\_/g, '<em>$1</em>');
            
            // Handle links
            html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
            
            // Handle code blocks
            html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
            
            // Handle inline code
            html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
            
            // Handle lists
            html = html
                .replace(/^\* (.+)$/gm, '<ul><li>$1</li></ul>')
                .replace(/^\d+\. (.+)$/gm, '<ol><li>$1</li></ol>');
            
            // Handle paragraphs
            html = html.replace(/^([^<].*?)$/gm, '<p>$1</p>');
            
            // Fix any double tags
            html = html
                .replace(/<\/ul>\s*<ul>/g, '')
                .replace(/<\/ol>\s*<ol>/g, '')
                .replace(/<p><p>/g, '<p>')
                .replace(/<\/p><\/p>/g, '</p>');
            
            return html;
        }

        window.execCommand = function(command, value = null) {
            document.execCommand(command, false, value);
            document.getElementById('rich-text-content').focus();
        };

        window.clearFormat = function() {
            const content = document.getElementById('rich-text-content');
            const text = content.innerText;
            content.innerHTML = text;
        };

        window.copyContent = function() {
            const content = document.getElementById('rich-text-content');
            const range = document.createRange();
            range.selectNode(content);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            
            try {
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
                alert('Content copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy text. Please try again.');
            }
        };

        window.clearContent = function() {
            if (confirm('Are you sure you want to clear all content?')) {
                document.getElementById('rich-text-content').innerHTML = '';
            }
        };

        // Add CSS for the Rich Text Editor
        const style = document.createElement('style');
        style.textContent = `
            .editor-toolbar {
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
                padding: 10px;
                background-color: #f8f9fa;
                border: 1px solid #ddd;
                border-bottom: none;
                border-radius: var(--border-radius) var(--border-radius) 0 0;
            }
            
            .editor-toolbar button {
                padding: 5px 10px;
                background-color: white;
                border: 1px solid #ddd;
                border-radius: 3px;
                cursor: pointer;
                transition: var(--transition);
            }
            
            .editor-toolbar button:hover {
                background-color: #e9ecef;
            }
            
            .editor-toolbar select {
                padding: 5px;
                border: 1px solid #ddd;
                border-radius: 3px;
                background-color: white;
            }
            
            .editor-toolbar input[type="color"] {
                width: 30px;
                height: 30px;
                padding: 0;
                border: 1px solid #ddd;
                border-radius: 3px;
                cursor: pointer;
            }
            
            .separator {
                color: #ddd;
                margin: 0 5px;
            }
            
            .editor-content {
                min-height: 300px;
                max-height: 600px;
                padding: 15px;
                border: 1px solid #ddd;
                border-top: none;
                border-radius: 0 0 var(--border-radius) var(--border-radius);
                overflow-y: auto;
                background-color: white;
            }
            
            .editor-content:focus {
                outline: none;
            }
            
            .editor-actions {
                display: flex;
                gap: 10px;
                margin-top: 15px;
            }
            
            @media (max-width: 768px) {
                .editor-toolbar {
                    gap: 2px;
                    padding: 5px;
                }
                
                .editor-toolbar button {
                    padding: 3px 6px;
                }
                
                .editor-toolbar select {
                    max-width: 80px;
                }
                
                .separator {
                    margin: 0 2px;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

// Add the Rich Text Editor tool to the main tools array
tools.push(richTextEditorTool);
