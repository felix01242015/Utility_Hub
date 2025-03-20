// Additional tools for the Utility Hub application
const additionalTools2 = [
    // Tip Calculator
    {
        id: 'tip-calculator',
        title: 'Tip Calculator',
        description: 'Calculate tips and split bills easily',
        icon: 'fas fa-receipt',
        category: 'calculators',
        tags: ['money', 'restaurant', 'finance'],
        render: function(container) {
            container.innerHTML = `
                <div class="tool-content">
                    <h2>Tip Calculator</h2>
                    
                    <div class="input-group">
                        <label for="bill-amount">Bill Amount</label>
                        <input type="number" id="bill-amount" placeholder="Enter bill amount" step="0.01">
                    </div>
                    
                    <div class="input-group">
                        <label for="tip-percentage">Tip Percentage</label>
                        <div class="tip-slider-container">
                            <input type="range" id="tip-percentage" min="0" max="30" value="15" oninput="updateTipPercentage()">
                            <span id="tip-value">15%</span>
                        </div>
                        <div class="tip-buttons">
                            <button class="btn-small" onclick="setTipPercentage(10)">10%</button>
                            <button class="btn-small" onclick="setTipPercentage(15)">15%</button>
                            <button class="btn-small" onclick="setTipPercentage(18)">18%</button>
                            <button class="btn-small" onclick="setTipPercentage(20)">20%</button>
                            <button class="btn-small" onclick="setTipPercentage(25)">25%</button>
                        </div>
                    </div>
                    
                    <div class="input-group">
                        <label for="split-people">Split Between</label>
                        <div class="people-counter">
                            <button class="btn-circle" onclick="decrementPeople()">-</button>
                            <input type="number" id="split-people" value="1" min="1" oninput="calculateTip()">
                            <button class="btn-circle" onclick="incrementPeople()">+</button>
                        </div>
                    </div>
                    
                    <button class="btn" onclick="calculateTip()">Calculate</button>
                    
                    <div id="tip-result" class="result hidden">
                        <div class="tip-summary">
                            <div class="summary-item">
                                <h4>Tip Amount</h4>
                                <p id="tip-amount"></p>
                            </div>
                            <div class="summary-item">
                                <h4>Total Bill</h4>
                                <p id="total-bill"></p>
                            </div>
                            <div class="summary-item">
                                <h4>Per Person</h4>
                                <p id="per-person"></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Define tip calculator functions in global scope
            window.updateTipPercentage = function() {
                const tipPercentage = document.getElementById('tip-percentage').value;
                document.getElementById('tip-value').textContent = `${tipPercentage}%`;
                calculateTip();
            };

            window.setTipPercentage = function(percentage) {
                document.getElementById('tip-percentage').value = percentage;
                document.getElementById('tip-value').textContent = `${percentage}%`;
                calculateTip();
            };

            window.incrementPeople = function() {
                const peopleInput = document.getElementById('split-people');
                peopleInput.value = parseInt(peopleInput.value) + 1;
                calculateTip();
            };

            window.decrementPeople = function() {
                const peopleInput = document.getElementById('split-people');
                const currentValue = parseInt(peopleInput.value);
                if (currentValue > 1) {
                    peopleInput.value = currentValue - 1;
                    calculateTip();
                }
            };

            window.calculateTip = function() {
                const billAmount = parseFloat(document.getElementById('bill-amount').value);
                const tipPercentage = parseInt(document.getElementById('tip-percentage').value);
                const numPeople = parseInt(document.getElementById('split-people').value);
                
                if (isNaN(billAmount) || billAmount <= 0) {
                    alert('Please enter a valid bill amount');
                    return;
                }
                
                if (isNaN(numPeople) || numPeople < 1) {
                    alert('Please enter a valid number of people');
                    return;
                }
                
                const tipAmount = billAmount * (tipPercentage / 100);
                const totalBill = billAmount + tipAmount;
                const perPerson = totalBill / numPeople;
                
                // Format currency
                const formatCurrency = amount => {
                    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
                };
                
                document.getElementById('tip-amount').textContent = formatCurrency(tipAmount);
                document.getElementById('total-bill').textContent = formatCurrency(totalBill);
                document.getElementById('per-person').textContent = formatCurrency(perPerson);
                
                document.getElementById('tip-result').classList.remove('hidden');
            };
            
            // Initialize calculation if values are present
            if (document.getElementById('bill-amount').value) {
                calculateTip();
            }
        }
    },
    
    // Base64 Encoder/Decoder
    {
        id: 'base64-tool',
        title: 'Base64 Encoder/Decoder',
        description: 'Convert text to and from Base64 encoding',
        icon: 'fas fa-exchange-alt',
        category: 'developers',
        tags: ['encoding', 'developer', 'converter'],
        render: function(container) {
            container.innerHTML = `
                <div class="tool-content">
                    <h2>Base64 Encoder/Decoder</h2>
                    
                    <div class="tool-tabs">
                        <button class="tool-tab active" onclick="switchBase64Tab('encode')">Encode</button>
                        <button class="tool-tab" onclick="switchBase64Tab('decode')">Decode</button>
                    </div>
                    
                    <div id="encode-tab" class="tool-tab-content active">
                        <div class="input-group">
                            <label for="text-to-encode">Text to Encode</label>
                            <textarea id="text-to-encode" rows="5" placeholder="Enter text to encode to Base64..."></textarea>
                        </div>
                        
                        <button class="btn" onclick="encodeToBase64()">Encode to Base64</button>
                        
                        <div id="encode-result" class="result hidden">
                            <div class="result-header">
                                <h3>Encoded Result</h3>
                                <button class="copy-btn" onclick="copyEncodeResult()">Copy</button>
                            </div>
                            <div class="encoded-text-container">
                                <pre id="encoded-text"></pre>
                            </div>
                        </div>
                    </div>
                    
                    <div id="decode-tab" class="tool-tab-content">
                        <div class="input-group">
                            <label for="text-to-decode">Base64 to Decode</label>
                            <textarea id="text-to-decode" rows="5" placeholder="Enter Base64 to decode..."></textarea>
                        </div>
                        
                        <button class="btn" onclick="decodeFromBase64()">Decode from Base64</button>
                        
                        <div id="decode-result" class="result hidden">
                            <div class="result-header">
                                <h3>Decoded Result</h3>
                                <button class="copy-btn" onclick="copyDecodeResult()">Copy</button>
                            </div>
                            <div class="decoded-text-container">
                                <pre id="decoded-text"></pre>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Define Base64 tool functions in global scope
            window.switchBase64Tab = function(tab) {
                document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tool-tab-content').forEach(t => t.classList.remove('active'));
                
                document.querySelector(`.tool-tab[onclick*="${tab}"]`).classList.add('active');
                document.getElementById(`${tab}-tab`).classList.add('active');
            };

            window.encodeToBase64 = function() {
                const input = document.getElementById('text-to-encode').value;
                
                if (!input) {
                    alert('Please enter text to encode');
                    return;
                }
                
                try {
                    const encoded = btoa(unescape(encodeURIComponent(input)));
                    document.getElementById('encoded-text').textContent = encoded;
                    document.getElementById('encode-result').classList.remove('hidden');
                } catch (error) {
                    alert('Error encoding text: ' + error.message);
                }
            };

            window.decodeFromBase64 = function() {
                const input = document.getElementById('text-to-decode').value;
                
                if (!input) {
                    alert('Please enter Base64 to decode');
                    return;
                }
                
                try {
                    const decoded = decodeURIComponent(escape(atob(input)));
                    document.getElementById('decoded-text').textContent = decoded;
                    document.getElementById('decode-result').classList.remove('hidden');
                } catch (error) {
                    alert('Error decoding Base64: ' + error.message);
                }
            };

            window.copyEncodeResult = function() {
                const encodedText = document.getElementById('encoded-text').textContent;
                navigator.clipboard.writeText(encodedText).then(() => {
                    alert('Encoded text copied to clipboard!');
                });
            };

            window.copyDecodeResult = function() {
                const decodedText = document.getElementById('decoded-text').textContent;
                navigator.clipboard.writeText(decodedText).then(() => {
                    alert('Decoded text copied to clipboard!');
                });
            };
        }
    },
    
    // Pomodoro Timer
    {
        id: 'pomodoro-timer',
        title: 'Pomodoro Timer',
        description: 'Boost productivity with timed work sessions',
        icon: 'fas fa-stopwatch',
        category: 'productivity',
        tags: ['time', 'productivity', 'focus'],
        render: function(container) {
            container.innerHTML = `
                <div class="tool-content">
                    <h2>Pomodoro Timer</h2>
                    
                    <div class="pomodoro-container">
                        <div class="pomodoro-timer">
                            <div class="timer-display">
                                <span id="timer-minutes">25</span>:<span id="timer-seconds">00</span>
                            </div>
                            <div class="timer-label" id="timer-label">Focus Time</div>
                        </div>
                        
                        <div class="timer-controls">
                            <button class="btn" id="start-timer" onclick="startPomodoroTimer()">Start</button>
                            <button class="btn" id="pause-timer" onclick="pausePomodoroTimer()" disabled>Pause</button>
                            <button class="btn" id="reset-timer" onclick="resetPomodoroTimer()">Reset</button>
                        </div>
                        
                        <div class="pomodoro-settings">
                            <h3>Settings</h3>
                            <div class="input-group">
                                <label for="focus-duration">Focus Duration (minutes)</label>
                                <input type="number" id="focus-duration" value="25" min="1" max="60">
                            </div>
                            <div class="input-group">
                                <label for="short-break-duration">Short Break (minutes)</label>
                                <input type="number" id="short-break-duration" value="5" min="1" max="30">
                            </div>
                            <div class="input-group">
                                <label for="long-break-duration">Long Break (minutes)</label>
                                <input type="number" id="long-break-duration" value="15" min="1" max="60">
                            </div>
                            <div class="input-group">
                                <label for="pomodoro-cycles">Cycles before Long Break</label>
                                <input type="number" id="pomodoro-cycles" value="4" min="1" max="10">
                            </div>
                            <button class="btn" onclick="applyPomodoroSettings()">Apply Settings</button>
                        </div>
                        
                        <div class="pomodoro-stats">
                            <div class="stat-item">
                                <span class="stat-label">Completed:</span>
                                <span class="stat-value" id="completed-pomodoros">0</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Current Cycle:</span>
                                <span class="stat-value" id="current-cycle">1</span>/<span id="total-cycles">4</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Define Pomodoro Timer functions and variables in global scope
            window.pomodoroTimer = {
                interval: null,
                timeLeft: 25 * 60, // 25 minutes in seconds
                isRunning: false,
                mode: 'focus', // 'focus', 'shortBreak', 'longBreak'
                completedPomodoros: 0,
                currentCycle: 1,
                totalCycles: 4,
                settings: {
                    focusDuration: 25,
                    shortBreakDuration: 5,
                    longBreakDuration: 15,
                    cycles: 4
                }
            };

            window.updateTimerDisplay = function() {
                const minutes = Math.floor(pomodoroTimer.timeLeft / 60);
                const seconds = pomodoroTimer.timeLeft % 60;
                
                document.getElementById('timer-minutes').textContent = String(minutes).padStart(2, '0');
                document.getElementById('timer-seconds').textContent = String(seconds).padStart(2, '0');
            };

            window.startPomodoroTimer = function() {
                if (!pomodoroTimer.isRunning) {
                    pomodoroTimer.isRunning = true;
                    document.getElementById('start-timer').disabled = true;
                    document.getElementById('pause-timer').disabled = false;
                    
                    pomodoroTimer.interval = setInterval(() => {
                        if (pomodoroTimer.timeLeft > 0) {
                            pomodoroTimer.timeLeft--;
                            updateTimerDisplay();
                        } else {
                            // Timer completed
                            clearInterval(pomodoroTimer.interval);
                            playTimerEndSound();
                            
                            if (pomodoroTimer.mode === 'focus') {
                                pomodoroTimer.completedPomodoros++;
                                document.getElementById('completed-pomodoros').textContent = pomodoroTimer.completedPomodoros;
                                
                                // Check if it's time for a long break
                                if (pomodoroTimer.currentCycle >= pomodoroTimer.totalCycles) {
                                    switchPomodoroMode('longBreak');
                                    pomodoroTimer.currentCycle = 1;
                                } else {
                                    switchPomodoroMode('shortBreak');
                                    pomodoroTimer.currentCycle++;
                                }
                                
                                document.getElementById('current-cycle').textContent = pomodoroTimer.currentCycle;
                            } else {
                                // After a break, switch back to focus mode
                                switchPomodoroMode('focus');
                            }
                            
                            // Auto-start the next timer
                            startPomodoroTimer();
                        }
                    }, 1000);
                }
            };

            window.pausePomodoroTimer = function() {
                if (pomodoroTimer.isRunning) {
                    clearInterval(pomodoroTimer.interval);
                    pomodoroTimer.isRunning = false;
                    document.getElementById('start-timer').disabled = false;
                    document.getElementById('pause-timer').disabled = true;
                }
            };

            window.resetPomodoroTimer = function() {
                pausePomodoroTimer();
                switchPomodoroMode('focus');
                pomodoroTimer.completedPomodoros = 0;
                pomodoroTimer.currentCycle = 1;
                document.getElementById('completed-pomodoros').textContent = '0';
                document.getElementById('current-cycle').textContent = '1';
            };

            window.switchPomodoroMode = function(mode) {
                pomodoroTimer.mode = mode;
                
                if (mode === 'focus') {
                    pomodoroTimer.timeLeft = pomodoroTimer.settings.focusDuration * 60;
                    document.getElementById('timer-label').textContent = 'Focus Time';
                    document.querySelector('.pomodoro-timer').className = 'pomodoro-timer focus-mode';
                } else if (mode === 'shortBreak') {
                    pomodoroTimer.timeLeft = pomodoroTimer.settings.shortBreakDuration * 60;
                    document.getElementById('timer-label').textContent = 'Short Break';
                    document.querySelector('.pomodoro-timer').className = 'pomodoro-timer short-break-mode';
                } else if (mode === 'longBreak') {
                    pomodoroTimer.timeLeft = pomodoroTimer.settings.longBreakDuration * 60;
                    document.getElementById('timer-label').textContent = 'Long Break';
                    document.querySelector('.pomodoro-timer').className = 'pomodoro-timer long-break-mode';
                }
                
                updateTimerDisplay();
            };

            window.applyPomodoroSettings = function() {
                const focusDuration = parseInt(document.getElementById('focus-duration').value);
                const shortBreakDuration = parseInt(document.getElementById('short-break-duration').value);
                const longBreakDuration = parseInt(document.getElementById('long-break-duration').value);
                const cycles = parseInt(document.getElementById('pomodoro-cycles').value);
                
                if (isNaN(focusDuration) || isNaN(shortBreakDuration) || isNaN(longBreakDuration) || isNaN(cycles)) {
                    alert('Please enter valid numbers for all settings');
                    return;
                }
                
                if (focusDuration < 1 || shortBreakDuration < 1 || longBreakDuration < 1 || cycles < 1) {
                    alert('All values must be greater than zero');
                    return;
                }
                
                pomodoroTimer.settings.focusDuration = focusDuration;
                pomodoroTimer.settings.shortBreakDuration = shortBreakDuration;
                pomodoroTimer.settings.longBreakDuration = longBreakDuration;
                pomodoroTimer.settings.cycles = cycles;
                
                pomodoroTimer.totalCycles = cycles;
                document.getElementById('total-cycles').textContent = cycles;
                
                // Reset the timer with new settings
                pausePomodoroTimer();
                switchPomodoroMode(pomodoroTimer.mode);
                
                alert('Settings applied successfully!');
            };

            window.playTimerEndSound = function() {
                // Create a simple beep sound
                try {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.type = 'sine';
                    oscillator.frequency.value = 800;
                    gainNode.gain.value = 0.5;
                    
                    oscillator.start();
                    
                    setTimeout(() => {
                        oscillator.stop();
                    }, 500);
                } catch (error) {
                    console.error('Could not play sound:', error);
                }
            };
            
            // Add CSS for the Pomodoro Timer
            const style = document.createElement('style');
            style.textContent = `
                .pomodoro-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                }
                
                .pomodoro-timer {
                    width: 250px;
                    height: 250px;
                    border-radius: 50%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin: 20px 0;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }
                
                .focus-mode {
                    background-color: #4a6fa5;
                    color: white;
                }
                
                .short-break-mode {
                    background-color: #4CAF50;
                    color: white;
                }
                
                .long-break-mode {
                    background-color: #9C27B0;
                    color: white;
                }
                
                .timer-display {
                    font-size: 3rem;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                
                .timer-label {
                    font-size: 1.2rem;
                    opacity: 0.9;
                }
                
                .timer-controls {
                    display: flex;
                    gap: 10px;
                }
                
                .pomodoro-settings {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: var(--border-radius);
                    width: 100%;
                    max-width: 400px;
                    margin-top: 20px;
                }
                
                .pomodoro-settings h3 {
                    margin-bottom: 15px;
                    color: var(--primary-color);
                }
                
                .pomodoro-stats {
                    display: flex;
                    justify-content: space-around;
                    width: 100%;
                    max-width: 400px;
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: var(--border-radius);
                    margin-top: 20px;
                }
                
                .stat-item {
                    text-align: center;
                }
                
                .stat-label {
                    color: var(--text-light);
                    margin-right: 5px;
                }
                
                .stat-value {
                    font-weight: bold;
                    color: var(--primary-color);
                }
                
                .btn-small {
                    padding: 5px 10px;
                    font-size: 0.9rem;
                    background-color: #e9ecef;
                    border: none;
                    border-radius: var(--border-radius);
                    cursor: pointer;
                    transition: var(--transition);
                }
                
                .btn-small:hover {
                    background-color: #d1d9e6;
                }
                
                .btn-circle {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: var(--primary-color);
                    color: white;
                    border: none;
                    cursor: pointer;
                    transition: var(--transition);
                }
                
                .btn-circle:hover {
                    background-color: var(--secondary-color);
                }
                
                .people-counter {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .people-counter input {
                    width: 60px;
                    text-align: center;
                }
                
                .tip-slider-container {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }
                
                .tip-slider-container input {
                    flex: 1;
                }
                
                .tip-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 5px;
                    margin-top: 10px;
                }
                
                .tip-summary {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;
                }
                
                .encoded-text-container, .decoded-text-container {
                    max-height: 200px;
                    overflow-y: auto;
                    background-color: #f8f9fa;
                    padding: 10px;
                    border-radius: var(--border-radius);
                    border: 1px solid #ddd;
                    word-break: break-all;
                }
                
                @media (max-width: 768px) {
                    .tip-summary {
                        grid-template-columns: 1fr;
                    }
                    
                    .pomodoro-timer {
                        width: 200px;
                        height: 200px;
                    }
                    
                    .timer-display {
                        font-size: 2.5rem;
                    }
                }
            `;
            
            document.head.appendChild(style);
            
            // Initialize the Pomodoro Timer
            document.querySelector('.pomodoro-timer').className = 'pomodoro-timer focus-mode';
        }
    }
];

// Combine with main tools array
tools.push(...additionalTools2);
