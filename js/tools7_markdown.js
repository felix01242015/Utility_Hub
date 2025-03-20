// Markdown Editor Tool for the Utility Hub application
const markdownEditorTool = {
    id: 'markdown-editor',
    title: 'Markdown Editor',
    description: 'Write and preview Markdown content live',
    icon: 'fas fa-file-alt',
    category: 'text-edit',
    tags: ['markdown', 'editor', 'preview', 'developer'],
    render: function(container) {
        container.innerHTML = `
            <div class="tool-content">
                <h2>Markdown Editor</h2>
                <div class="editor-actions">
                    <div class="file-actions">
                        <div class="file-input-wrapper">
                            <input type="file" id="markdown-file" accept=".txt,.md" onchange="importMarkdownFile(this)">
                            <label for="markdown-file" class="btn">Import .txt/.md file</label>
                        </div>
                        <div class="export-buttons">
                            <button class="btn" onclick="exportMarkdown('.md')">Export as .md</button>
                            <button class="btn" onclick="exportMarkdown('.txt')">Export as .txt</button>
                        </div>
                    </div>
                </div>
                <div class="editor-container">
                    <textarea id="markdown-input" rows="10" placeholder="Write your markdown here..."></textarea>
                    <div id="preview" class="preview"></div>
                </div>
            </div>
        `;

        // Add event listener to update preview on input
        const input = document.getElementById('markdown-input');
        input.addEventListener('input', updatePreview);

        // Initial call to render preview
        updatePreview();
    }
};

// Import Markdown file
// Export Markdown content
window.exportMarkdown = function(fileType) {
    const content = document.getElementById('markdown-input').value;
    if (!content.trim()) {
        alert('No content to export!');
        return;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    a.href = url;
    a.download = `markdown-export-${timestamp}${fileType}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};

window.importMarkdownFile = function(input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('markdown-input').value = e.target.result;
        updatePreview();
    };
    reader.onerror = function(e) {
        alert('Error reading file: ' + e.target.error);
    };
    reader.readAsText(file);
};

function updatePreview() {
    const markdownText = document.getElementById('markdown-input').value;
    const previewContainer = document.getElementById('preview');
    
    // Simple Markdown to HTML conversion
    let htmlContent = simpleMarkdownToHtml(markdownText);
    previewContainer.innerHTML = htmlContent;
}

// Simple Markdown to HTML converter
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
    let lines = html.split('\n');
    let inList = false;
    
    for (let i = 0; i < lines.length; i++) {
        // Unordered lists
        if (lines[i].match(/^\* (.+)$/)) {
            if (!inList) {
                lines[i] = '<ul>\n<li>' + lines[i].replace(/^\* (.+)$/, '$1') + '</li>';
                inList = true;
            } else {
                lines[i] = '<li>' + lines[i].replace(/^\* (.+)$/, '$1') + '</li>';
            }
        } 
        // Ordered lists
        else if (lines[i].match(/^\d+\. (.+)$/)) {
            if (!inList) {
                lines[i] = '<ol>\n<li>' + lines[i].replace(/^\d+\. (.+)$/, '$1') + '</li>';
                inList = true;
            } else {
                lines[i] = '<li>' + lines[i].replace(/^\d+\. (.+)$/, '$1') + '</li>';
            }
        } 
        // End list if line is not a list item
        else if (inList) {
            lines[i-1] += '\n</ul>';
            inList = false;
        }
    }
    
    if (inList) {
        lines[lines.length-1] += '\n</ul>';
    }
    
    // Handle paragraphs
    html = lines.join('\n');
    html = html.replace(/^([^<].*?)$/gm, '<p>$1</p>');
    
    // Fix any double paragraph tags
    html = html.replace(/<p><p>/g, '<p>');
    html = html.replace(/<\/p><\/p>/g, '</p>');
    
    // Handle line breaks
    html = html.replace(/\n\n/g, '<br>');
    
    return html;
}

// Add the Markdown editor tool to the main tools array
// Assuming tools is already defined in the main application
tools.push(markdownEditorTool);

// Add CSS for the Markdown editor
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .editor-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-top: 10px;
        }
        
        .editor-actions {
            margin-bottom: 15px;
        }

        .file-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
        }

        .export-buttons {
            display: flex;
            gap: 10px;
        }
        
        .file-input-wrapper {
            position: relative;
            display: inline-block;
        }
        
        .file-input-wrapper input[type="file"] {
            position: absolute;
            left: -9999px;
        }
        
        .file-input-wrapper label {
            display: inline-block;
            padding: 8px 12px;
            background-color: var(--primary-color);
            color: white;
            border-radius: var(--border-radius);
            cursor: pointer;
            transition: var(--transition);
        }
        
        .file-input-wrapper label:hover {
            background-color: var(--secondary-color);
        }
        
        #markdown-input {
            width: 100%;
            height: 400px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: var(--border-radius);
            font-family: monospace;
            resize: vertical;
        }
        
        .preview {
            border: 1px solid #ddd;
            border-radius: var(--border-radius);
            padding: 15px;
            height: 400px;
            overflow-y: auto;
            background-color: white;
        }
        
        .preview h1, .preview h2, .preview h3 {
            margin-top: 0;
            color: var(--primary-color);
        }
        
        .preview code {
            background-color: #f8f9fa;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: monospace;
        }
        
        .preview pre {
            background-color: #f8f9fa;
            padding: 10px;
            border-radius: var(--border-radius);
            overflow-x: auto;
        }
        
        .preview pre code {
            background-color: transparent;
            padding: 0;
        }
        
        .preview ul, .preview ol {
            padding-left: 20px;
        }
        
        .preview a {
            color: var(--primary-color);
            text-decoration: none;
        }
        
        .preview a:hover {
            text-decoration: underline;
        }
        
        @media (max-width: 768px) {
            .editor-container {
                grid-template-columns: 1fr;
            }
            
            #markdown-input, .preview {
                height: 300px;
            }
        }
    `;
    document.head.appendChild(style);
});
