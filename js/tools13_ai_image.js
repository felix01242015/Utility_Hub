// AI Image Generator Tool for the Utility Hub application

const aiImageGeneratorTool = {
    id: 'ai-image-generator',
    title: 'AI Image Generator',
    description: 'Generate images using AI with Stable Diffusion',
    icon: 'fas fa-robot',
    category: 'generators',
    tags: ['ai', 'image', 'generator', 'stable diffusion'],
    render: function(container) {
        container.innerHTML = `
            <div class="tool-content">
                <h2>AI Image Generator</h2>
                <div class="generator-container">
                    <!-- Input Section -->
                    <div class="input-section">
                        <div class="prompt-container">
                            <label for="image-prompt">Describe your image:</label>
                            <textarea id="image-prompt" 
                                placeholder="Enter a detailed description of the image you want to generate..."
                                rows="4"></textarea>
                            <div class="prompt-controls">
                                <span id="prompt-length">0/1000</span>
                                <button onclick="generateRandomPrompt()" class="btn-icon" title="Random Prompt">
                                    <i class="fas fa-dice"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Style Options -->
                        <div class="style-options">
                            <h3>Style Options</h3>
                            <div class="option-grid">
                                <div class="option-item">
                                    <label for="art-style">Art Style:</label>
                                    <select id="art-style">
                                        <option value="">Default</option>
                                        <option value="digital art">Digital Art</option>
                                        <option value="oil painting">Oil Painting</option>
                                        <option value="watercolor">Watercolor</option>
                                        <option value="pencil sketch">Pencil Sketch</option>
                                        <option value="anime">Anime</option>
                                        <option value="photorealistic">Photorealistic</option>
                                        <option value="3D render">3D Render</option>
                                    </select>
                                </div>
                                <div class="option-item">
                                    <label for="image-size">Image Size:</label>
                                    <select id="image-size">
                                        <option value="512x512">512x512</option>
                                        <option value="768x768" selected>768x768</option>
                                        <option value="1024x1024">1024x1024</option>
                                    </select>
                                </div>
                                <div class="option-item">
                                    <label for="num-images">Number of Images:</label>
                                    <select id="num-images">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- API Key Input -->
                        <div class="api-key-section">
                            <div class="api-key-input">
                                <label for="api-key">Stability AI API Key:</label>
                                <input type="password" id="api-key" placeholder="Enter your API key">
                                <button onclick="toggleApiKey()" class="btn-icon" title="Toggle visibility">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                            <div class="api-key-help">
                                <p>Don't have an API key? Get one for free:</p>
                                <ol>
                                    <li>Go to <a href="https://platform.stability.ai/docs/getting-started" target="_blank">Stability AI</a></li>
                                    <li>Sign up for a free account</li>
                                    <li>Go to your dashboard</li>
                                    <li>Copy your API key</li>
                                </ol>
                                <p>Free tier includes 25 image generations per month!</p>
                            </div>
                        </div>

                        <!-- Generate Button -->
                        <button onclick="generateImages()" class="btn generate-btn">
                            <i class="fas fa-magic"></i> Generate Images
                        </button>
                    </div>

                    <!-- Output Section -->
                    <div class="output-section">
                        <h3>Generated Images</h3>
                        <div id="loading-indicator" hidden>
                            <div class="spinner"></div>
                            <p>Generating your images...</p>
                        </div>
                        <div id="image-grid"></div>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .generator-container {
                display: grid;
                grid-template-columns: 1fr;
                gap: 20px;
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
            }

            @media (min-width: 1024px) {
                .generator-container {
                    grid-template-columns: 400px 1fr;
                }
            }

            .input-section {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .prompt-container {
                background: #f8f9fa;
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
            }

            .prompt-container textarea {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                font-size: 14px;
                resize: vertical;
            }

            .prompt-controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;
            }

            .style-options {
                background: #f8f9fa;
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
            }

            .option-grid {
                display: grid;
                gap: 15px;
                margin-top: 10px;
            }

            .option-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            .option-item select {
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                background: white;
            }

            .api-key-section {
                background: #f8f9fa;
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
            }

            .api-key-input {
                display: flex;
                gap: 10px;
                align-items: center;
            }

            .api-key-input input {
                flex: 1;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
            }

            .api-key-help {
                margin-top: 15px;
                font-size: 14px;
                color: #666;
            }

            .api-key-help ol {
                margin: 10px 0;
                padding-left: 20px;
            }

            .generate-btn {
                width: 100%;
                padding: 12px;
                font-size: 16px;
                background: var(--primary-color);
                color: white;
            }

            .generate-btn:hover {
                background: var(--primary-color-dark);
            }

            .output-section {
                background: #f8f9fa;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                min-height: 400px;
            }

            #image-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-top: 20px;
            }

            .image-item {
                position: relative;
                background: white;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                overflow: hidden;
            }

            .image-item img {
                width: 100%;
                height: auto;
                border-radius: var(--border-radius);
            }

            .image-controls {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
            }

            .spinner {
                width: 50px;
                height: 50px;
                border: 5px solid #f3f3f3;
                border-top: 5px solid var(--primary-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 20px auto;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            #loading-indicator {
                text-align: center;
                color: #666;
            }
        `;
        document.head.appendChild(style);

        // Set up event listeners
        const promptInput = document.getElementById('image-prompt');
        const promptLength = document.getElementById('prompt-length');

        promptInput.addEventListener('input', () => {
            const length = promptInput.value.length;
            promptLength.textContent = length + '/1000';
            if (length > 1000) {
                promptLength.style.color = 'red';
                promptInput.value = promptInput.value.slice(0, 1000);
            } else {
                promptLength.style.color = '';
            }
        });

        // Define global functions
        window.toggleApiKey = function() {
            const input = document.getElementById('api-key');
            const icon = input.nextElementSibling.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'fas fa-eye';
            }
        };

        window.generateRandomPrompt = function() {
            const prompts = [
                "A serene Japanese garden with cherry blossoms and a small koi pond",
                "A futuristic cityscape at night with flying cars and neon lights",
                "A cozy cabin in the woods during a snowy winter evening",
                "An underwater scene with colorful coral reefs and tropical fish",
                "A magical forest with glowing mushrooms and fairy lights",
                "A steampunk-inspired flying machine with brass gears and steam pipes",
                "A peaceful mountain landscape with a misty valley at sunrise",
                "A whimsical treehouse village connected by rope bridges",
                "A cosmic scene with swirling galaxies and nebulas",
                "A medieval castle on a cliff overlooking the ocean at sunset"
            ];
            const prompt = prompts[Math.floor(Math.random() * prompts.length)];
            document.getElementById('image-prompt').value = prompt;
            document.getElementById('prompt-length').textContent = prompt.length + '/1000';
        };

        window.generateImages = async function() {
            const prompt = document.getElementById('image-prompt').value.trim();
            const apiKey = document.getElementById('api-key').value.trim();
            const style = document.getElementById('art-style').value;
            const size = document.getElementById('image-size').value;
            const numImages = parseInt(document.getElementById('num-images').value);

            if (!prompt) {
                alert('Please enter a prompt for your image.');
                return;
            }

            if (!apiKey) {
                alert('Please enter your Stability AI API key.');
                return;
            }

            const [width, height] = size.split('x').map(Number);
            const fullPrompt = style ? prompt + ', ' + style : prompt;

            const loadingIndicator = document.getElementById('loading-indicator');
            const imageGrid = document.getElementById('image-grid');
            loadingIndicator.hidden = false;
            imageGrid.innerHTML = '';

            try {
                const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + apiKey,
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        text_prompts: [{ text: fullPrompt }],
                        cfg_scale: 7,
                        height: height,
                        width: width,
                        samples: numImages,
                        steps: 30,
                    })
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Failed to generate images');
                }

                const data = await response.json();
                
                data.artifacts.forEach((image, index) => {
                    const item = document.createElement('div');
                    item.className = 'image-item';
                    
                    const img = document.createElement('img');
                    img.src = 'data:image/png;base64,' + image.base64;
                    img.alt = 'Generated image ' + (index + 1);
                    
                    const controls = document.createElement('div');
                    controls.className = 'image-controls';
                    
                    const downloadBtn = document.createElement('button');
                    downloadBtn.className = 'btn-icon';
                    downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
                    downloadBtn.onclick = () => {
                        const link = document.createElement('a');
                        link.href = img.src;
                        link.download = 'generated-image-' + (index + 1) + '.png';
                        link.click();
                    };
                    
                    controls.appendChild(downloadBtn);
                    item.appendChild(img);
                    item.appendChild(controls);
                    imageGrid.appendChild(item);
                });
            } catch (error) {
                alert('Error: ' + error.message);
            } finally {
                loadingIndicator.hidden = true;
            }
        };
    }
};

// Add the AI Image Generator tool to the main tools array
tools.push(aiImageGeneratorTool);
