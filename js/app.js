// Main application script for Utility Hub

// DOM Elements
const toolsContainer = document.getElementById('tools-container');
const toolSearch = document.getElementById('tool-search');
const searchBtn = document.getElementById('search-btn');
const categoryTabs = document.querySelectorAll('.tab');
const modal = document.getElementById('tool-modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.querySelector('.close-modal');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Load all tools initially
    loadTools('all');
    
    // Set up event listeners
    setupEventListeners();
});

// Load tools based on category
function loadTools(category) {
    console.log('Loading tools for category:', category);
    toolsContainer.innerHTML = '';
    
    const filteredTools = category === 'all' 
        ? tools 
        : tools.filter(tool => tool.category === category);
    
    if (filteredTools.length === 0) {
        toolsContainer.innerHTML = '<div class="no-tools">No tools found in this category</div>';
        return;
    }
    
    filteredTools.forEach(tool => {
        const toolCard = createToolCard(tool);
        toolsContainer.appendChild(toolCard);
    });
}

// Create a tool card element
function createToolCard(tool) {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.setAttribute('data-id', tool.id);
    
    card.innerHTML = `
        <div class="tool-icon"><i class="${tool.icon}"></i></div>
        <h3 class="tool-title">${tool.title}</h3>
        <p class="tool-description">${tool.description}</p>
        <div class="tool-tags">
            ${tool.tags.map(tag => `<span class="tool-tag">${tag}</span>`).join('')}
        </div>
    `;
    
    card.addEventListener('click', () => openTool(tool));
    
    return card;
}

// Open a tool in the modal
function openTool(tool) {
    modalContent.innerHTML = '';
    tool.render(modalContent);
    modal.style.display = 'block';
    
    // Add tool title to modal
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = tool.title;
    modalContent.insertBefore(modalTitle, modalContent.firstChild);
}

// Set up event listeners
function setupEventListeners() {
    // Category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            loadTools(category);
        });
    });
    
    // Search functionality
    searchBtn.addEventListener('click', searchTools);
    toolSearch.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchTools();
        }
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Search tools
function searchTools() {
    const searchTerm = toolSearch.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        // If search is empty, load current category
        const activeCategory = document.querySelector('.tab.active').getAttribute('data-category');
        loadTools(activeCategory);
        return;
    }
    
    toolsContainer.innerHTML = '';
    
    const results = tools.filter(tool => {
        return tool.title.toLowerCase().includes(searchTerm) || 
               tool.description.toLowerCase().includes(searchTerm) ||
               tool.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    });
    
    if (results.length === 0) {
        toolsContainer.innerHTML = '<div class="no-tools">No tools found matching your search</div>';
        return;
    }
    
    results.forEach(tool => {
        const toolCard = createToolCard(tool);
        toolsContainer.appendChild(toolCard);
    });
}

// Add CSS styles for additional elements
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .checkbox-group {
            margin-bottom: 8px;
        }
        
        .term-inputs {
            display: flex;
            gap: 10px;
        }
        
        .term-inputs input {
            flex: 1;
        }
        
        .term-inputs select {
            width: 100px;
        }
        
        .loan-summary {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .summary-item {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: var(--border-radius);
            text-align: center;
        }
        
        .summary-item h4 {
            margin-bottom: 10px;
            color: var(--text-light);
        }
        
        .summary-item p {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--primary-color);
        }
        
        .loan-details {
            margin-top: 20px;
        }
        
        .amortization-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        
        .amortization-table th, .amortization-table td {
            padding: 8px;
            text-align: right;
            border-bottom: 1px solid #ddd;
        }
        
        .amortization-table th {
            background-color: #f1f3f5;
            font-weight: 600;
        }
        
        .amortization-table tr:hover {
            background-color: #f8f9fa;
        }
        
        .password-display {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f1f3f5;
            padding: 10px 15px;
            border-radius: var(--border-radius);
            margin-bottom: 15px;
            word-break: break-all;
        }
        
        .strength-meter {
            height: 8px;
            background-color: #e9ecef;
            border-radius: 4px;
            margin-top: 5px;
            overflow: hidden;
        }
        
        #strength-bar {
            height: 100%;
            width: 0;
            transition: width 0.3s ease;
        }
        
        .color-palette {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin-top: 15px;
        }
        
        .palette-color {
            text-align: center;
        }
        
        .color-swatch {
            height: 80px;
            border-radius: var(--border-radius);
            margin-bottom: 8px;
            border: 1px solid #ddd;
        }
        
        .converter-input {
            margin-top: 10px;
        }
        
        .note {
            font-size: 0.9rem;
            color: var(--text-light);
            font-style: italic;
            margin-bottom: 15px;
        }
        
        .small {
            font-size: 0.85rem;
            color: var(--text-light);
        }
        
        .valid-json {
            color: #28a745;
        }
        
        .invalid-json {
            color: #dc3545;
        }
        
        .format-options {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 10px;
        }
        
        .result-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        
        @media (max-width: 768px) {
            .loan-summary {
                grid-template-columns: 1fr;
            }
            
            .color-palette {
                grid-template-columns: repeat(3, 1fr);
            }
        }
    `;
    
    document.head.appendChild(style);
});
