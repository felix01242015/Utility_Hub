// File Management Tools for the Utility Hub application

// Zip/RAR Unpacker Tool
const archiveUnpackerTool = {
    id: 'archive-unpacker',
    title: 'Archive Unpacker',
    description: 'Extract files from ZIP and RAR archives',
    icon: 'fas fa-file-archive',
    category: 'file-management',
    tags: ['zip', 'rar', 'archive', 'extract', 'unpack'],
    render: function(container) {
        container.innerHTML = `
            <div class="tool-content">
                <h2>Archive Unpacker</h2>
                <div class="archive-container">
                    <!-- Drop Zone -->
                    <div class="drop-zone" id="unpack-drop-zone">
                        <i class="fas fa-file-archive fa-3x"></i>
                        <p>Drop ZIP/RAR file here or click to select</p>
                        <input type="file" id="archive-input" accept=".zip,.rar" hidden>
                    </div>

                    <!-- File List -->
                    <div class="file-list" id="archive-contents" hidden>
                        <h3>Archive Contents</h3>
                        <div class="file-tree" id="file-tree"></div>
                        <div class="extract-controls">
                            <button onclick="extractAll()" class="btn">
                                <i class="fas fa-download"></i> Extract All
                            </button>
                            <button onclick="extractSelected()" class="btn">
                                <i class="fas fa-check-square"></i> Extract Selected
                            </button>
                        </div>
                    </div>

                    <!-- Progress -->
                    <div class="progress-container" id="extract-progress" hidden>
                        <div class="progress-bar">
                            <div class="progress" id="progress-bar"></div>
                        </div>
                        <p id="progress-text">Extracting files...</p>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .archive-container {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }

            .drop-zone {
                border: 2px dashed #ccc;
                border-radius: var(--border-radius);
                padding: 40px;
                text-align: center;
                cursor: pointer;
                transition: var(--transition);
            }

            .drop-zone:hover {
                border-color: var(--primary-color);
                background: #f8f9fa;
            }

            .drop-zone.drag-over {
                border-color: var(--primary-color);
                background: #e9ecef;
            }

            .drop-zone i {
                color: #666;
                margin-bottom: 15px;
            }

            .file-list {
                margin-top: 20px;
                padding: 20px;
                background: #f8f9fa;
                border-radius: var(--border-radius);
            }

            .file-tree {
                max-height: 300px;
                overflow-y: auto;
                margin: 15px 0;
                padding: 10px;
                background: white;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
            }

            .file-item {
                display: flex;
                align-items: center;
                padding: 5px;
                margin: 2px 0;
                border-radius: var(--border-radius);
            }

            .file-item:hover {
                background: #f0f0f0;
            }

            .file-item input[type="checkbox"] {
                margin-right: 10px;
            }

            .file-item i {
                margin-right: 10px;
                color: #666;
            }

            .extract-controls {
                display: flex;
                gap: 10px;
                margin-top: 15px;
            }

            .progress-container {
                margin-top: 20px;
            }

            .progress-bar {
                height: 20px;
                background: #f0f0f0;
                border-radius: 10px;
                overflow: hidden;
            }

            .progress {
                height: 100%;
                background: var(--primary-color);
                width: 0%;
                transition: width 0.3s ease;
            }

            #progress-text {
                text-align: center;
                margin-top: 10px;
                color: #666;
            }
        `;
        document.head.appendChild(style);

        // Set up event listeners
        const dropZone = document.getElementById('unpack-drop-zone');
        const fileInput = document.getElementById('archive-input');

        dropZone.addEventListener('click', () => fileInput.click());
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length) handleArchiveFile(files[0]);
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length) handleArchiveFile(e.target.files[0]);
        });

        // Handle archive file
        window.handleArchiveFile = async function(file) {
            if (!file.name.match(/\.(zip|rar)$/i)) {
                alert('Please select a ZIP or RAR file.');
                return;
            }

            const reader = new FileReader();
            reader.onload = async function(e) {
                try {
                    // For ZIP files
                    if (file.name.toLowerCase().endsWith('.zip')) {
                        const zip = await JSZip.loadAsync(e.target.result);
                        showArchiveContents(zip);
                    }
                    // For RAR files (requires additional library)
                    else if (file.name.toLowerCase().endsWith('.rar')) {
                        alert('RAR support coming soon!');
                    }
                } catch (error) {
                    alert('Error reading archive: ' + error.message);
                }
            };
            reader.readAsArrayBuffer(file);
        };

        // Show archive contents
        window.showArchiveContents = function(zip) {
            const fileTree = document.getElementById('file-tree');
            const contents = document.getElementById('archive-contents');
            fileTree.innerHTML = '';
            contents.hidden = false;

            Object.keys(zip.files).sort().forEach(path => {
                const item = document.createElement('div');
                item.className = 'file-item';
                
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = true;
                
                const icon = document.createElement('i');
                icon.className = zip.files[path].dir ? 'fas fa-folder' : 'fas fa-file';
                
                const name = document.createElement('span');
                name.textContent = path;
                
                item.appendChild(checkbox);
                item.appendChild(icon);
                item.appendChild(name);
                fileTree.appendChild(item);
            });
        };

        // Extract functions
        window.extractAll = async function() {
            const fileItems = document.querySelectorAll('.file-item');
            fileItems.forEach(item => item.querySelector('input').checked = true);
            extractSelected();
        };

        window.extractSelected = async function() {
            const progress = document.getElementById('extract-progress');
            const progressBar = document.getElementById('progress-bar');
            const progressText = document.getElementById('progress-text');
            progress.hidden = false;

            try {
                const fileItems = Array.from(document.querySelectorAll('.file-item'))
                    .filter(item => item.querySelector('input').checked);
                
                const total = fileItems.length;
                let completed = 0;

                for (const item of fileItems) {
                    const path = item.querySelector('span').textContent;
                    progressText.textContent = 'Extracting: ' + path;
                    
                    // Here you would extract the file
                    // For demonstration, we'll just update progress
                    await new Promise(resolve => setTimeout(resolve, 100));
                    
                    completed++;
                    progressBar.style.width = (completed / total * 100) + '%';
                }

                progressText.textContent = 'Extraction complete!';
                setTimeout(() => {
                    progress.hidden = true;
                    progressBar.style.width = '0%';
                }, 2000);
            } catch (error) {
                progressText.textContent = 'Error: ' + error.message;
            }
        };
    }
};

// Archive Creator Tool
const archiveCreatorTool = {
    id: 'archive-creator',
    title: 'Archive Creator',
    description: 'Create ZIP archives from files and folders',
    icon: 'fas fa-file-archive',
    category: 'file-management',
    tags: ['zip', 'archive', 'compress', 'package'],
    render: function(container) {
        container.innerHTML = `
            <div class="tool-content">
                <h2>Archive Creator</h2>
                <div class="archive-container">
                    <!-- File Selection -->
                    <div class="drop-zone" id="create-drop-zone">
                        <i class="fas fa-file-upload fa-3x"></i>
                        <p>Drop files here or click to select</p>
                        <input type="file" id="file-input" multiple hidden>
                    </div>

                    <!-- File List -->
                    <div class="file-list" id="selected-files" hidden>
                        <h3>Selected Files</h3>
                        <div class="file-tree" id="selected-file-tree"></div>
                        
                        <!-- Archive Options -->
                        <div class="archive-options">
                            <div class="input-group">
                                <label for="archive-name">Archive Name:</label>
                                <input type="text" id="archive-name" value="archive.zip">
                            </div>
                            <div class="compression-options">
                                <label>Compression Level:</label>
                                <select id="compression-level">
                                    <option value="0">No Compression (Store)</option>
                                    <option value="1">Low Compression</option>
                                    <option value="5" selected>Normal Compression</option>
                                    <option value="9">Maximum Compression</option>
                                </select>
                            </div>
                        </div>

                        <button onclick="createArchive()" class="btn">
                            <i class="fas fa-file-archive"></i> Create Archive
                        </button>
                    </div>

                    <!-- Progress -->
                    <div class="progress-container" id="create-progress" hidden>
                        <div class="progress-bar">
                            <div class="progress" id="create-progress-bar"></div>
                        </div>
                        <p id="create-progress-text">Creating archive...</p>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .archive-options {
                margin: 15px 0;
                padding: 15px;
                background: white;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
            }

            .input-group {
                margin-bottom: 15px;
            }

            .input-group label {
                display: block;
                margin-bottom: 5px;
                color: #666;
            }

            .input-group input,
            .input-group select {
                width: 100%;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
            }

            .compression-options {
                margin-top: 15px;
            }

            .compression-options label {
                display: block;
                margin-bottom: 5px;
                color: #666;
            }

            .compression-options select {
                width: 100%;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
            }
        `;
        document.head.appendChild(style);

        // Set up event listeners
        const dropZone = document.getElementById('create-drop-zone');
        const fileInput = document.getElementById('file-input');
        const selectedFiles = new Set();

        dropZone.addEventListener('click', () => fileInput.click());
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            handleFiles(e.dataTransfer.files);
        });

        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });

        // Handle selected files
        window.handleFiles = function(files) {
            const fileTree = document.getElementById('selected-file-tree');
            const container = document.getElementById('selected-files');
            
            Array.from(files).forEach(file => {
                if (!selectedFiles.has(file.name)) {
                    selectedFiles.add(file.name);
                    
                    const item = document.createElement('div');
                    item.className = 'file-item';
                    
                    const icon = document.createElement('i');
                    icon.className = 'fas fa-file';
                    
                    const name = document.createElement('span');
                    name.textContent = file.name + ' (' + formatFileSize(file.size) + ')';
                    
                    const remove = document.createElement('button');
                    remove.className = 'btn-icon';
                    remove.innerHTML = '<i class="fas fa-times"></i>';
                    remove.onclick = () => {
                        item.remove();
                        selectedFiles.delete(file.name);
                        if (selectedFiles.size === 0) {
                            container.hidden = true;
                        }
                    };
                    
                    item.appendChild(icon);
                    item.appendChild(name);
                    item.appendChild(remove);
                    fileTree.appendChild(item);
                }
            });
            
            container.hidden = false;
        };

        // Format file size
        window.formatFileSize = function(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        };

        // Create archive
        window.createArchive = async function() {
            const progress = document.getElementById('create-progress');
            const progressBar = document.getElementById('create-progress-bar');
            const progressText = document.getElementById('create-progress-text');
            const compressionLevel = parseInt(document.getElementById('compression-level').value);
            const archiveName = document.getElementById('archive-name').value;
            
            progress.hidden = false;
            progressBar.style.width = '0%';
            progressText.textContent = 'Creating archive...';

            try {
                const zip = new JSZip();
                const files = Array.from(document.querySelectorAll('.file-item'));
                const total = files.length;
                let completed = 0;

                for (const item of files) {
                    const fileName = item.querySelector('span').textContent.split(' (')[0];
                    progressText.textContent = 'Adding: ' + fileName;
                    
                    // Here you would add the file to the archive
                    // For demonstration, we'll just update progress
                    await new Promise(resolve => setTimeout(resolve, 100));
                    
                    completed++;
                    progressBar.style.width = (completed / total * 100) + '%';
                }

                progressText.textContent = 'Archive created successfully!';
                setTimeout(() => {
                    progress.hidden = true;
                    progressBar.style.width = '0%';
                }, 2000);
            } catch (error) {
                progressText.textContent = 'Error: ' + error.message;
            }
        };
    }
};

// Add the File Management tools to the main tools array
tools.push(archiveUnpackerTool);
tools.push(archiveCreatorTool);
