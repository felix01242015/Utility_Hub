// Additional tools for the Utility Hub application - Part 3
const moreTools = [
    // Formatter Tools
    {
        id: 'text-formatter',
        title: 'Text Formatter',
        description: 'Format and transform text in various ways',
        icon: 'fas fa-font',
        category: 'formatters',
        tags: ['text', 'format', 'transform'],
        render: function(container) {
            container.innerHTML = `
                <div class="tool-content">
                    <h2>Text Formatter</h2>
                    
                    <div class="input-group">
                        <label for="format-input">Enter Text</label>
                        <textarea id="format-input" rows="5" placeholder="Enter your text here..."></textarea>
                    </div>
                    
                    <div class="input-group">
                        <label>Format Options</label>
                        <div class="format-options">
                            <button class="btn" onclick="formatText('uppercase')">UPPERCASE</button>
                            <button class="btn" onclick="formatText('lowercase')">lowercase</button>
                            <button class="btn" onclick="formatText('capitalize')">Capitalize</button>
                            <button class="btn" onclick="formatText('reverse')">Reverse</button>
                            <button class="btn" onclick="formatText('trim')">Trim Spaces</button>
                            <button class="btn" onclick="formatText('count')">Count</button>
                        </div>
                    </div>
                    
                    <div id="format-result" class="result hidden">
                        <div class="result-header">
                            <h3>Result</h3>
                            <button class="copy-btn" onclick="copyFormattedText()">Copy</button>
                        </div>
                        <div id="formatted-text"></div>
                    </div>
                </div>
            `;

            // Define text formatter functions in global scope
            window.formatText = function(action) {
                const input = document.getElementById('format-input').value;
                const resultDiv = document.getElementById('format-result');
                const formattedTextDiv = document.getElementById('formatted-text');
                
                if (!input) {
                    alert('Please enter some text to format');
                    return;
                }
                
                let result;
                
                switch (action) {
                    case 'uppercase':
                        result = input.toUpperCase();
                        break;
                    case 'lowercase':
                        result = input.toLowerCase();
                        break;
                    case 'capitalize':
                        result = input.replace(/\b\w/g, c => c.toUpperCase());
                        break;
                    case 'reverse':
                        result = input.split('').reverse().join('');
                        break;
                    case 'trim':
                        result = input.replace(/\s+/g, ' ').trim();
                        break;
                    case 'count':
                        const chars = input.length;
                        const words = input.trim().split(/\s+/).length;
                        const sentences = input.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
                        const paragraphs = input.split(/\n+/).filter(p => p.trim().length > 0).length;
                        
                        result = `Characters: ${chars}\nWords: ${words}\nSentences: ${sentences}\nParagraphs: ${paragraphs}`;
                        break;
                    default:
                        result = input;
                }
                
                formattedTextDiv.innerHTML = result.replace(/\n/g, '<br>');
                resultDiv.classList.remove('hidden');
            };

            window.copyFormattedText = function() {
                const formattedText = document.getElementById('formatted-text').innerText;
                navigator.clipboard.writeText(formattedText).then(() => {
                    alert('Formatted text copied to clipboard!');
                });
            };
        }
    },
    {
        id: 'json-formatter',
        title: 'JSON Formatter',
        description: 'Format and validate JSON data',
        icon: 'fas fa-code',
        category: 'formatters',
        tags: ['json', 'code', 'developer'],
        render: function(container) {
            container.innerHTML = `
                <div class="tool-content">
                    <h2>JSON Formatter</h2>
                    
                    <div class="input-group">
                        <label for="json-input">Enter JSON</label>
                        <textarea id="json-input" rows="8" placeholder='{"example": "Paste your JSON here"}'></textarea>
                    </div>
                    
                    <div class="input-group">
                        <label>Options</label>
                        <div class="format-options">
                            <button class="btn" onclick="formatJson('pretty')">Pretty Print</button>
                            <button class="btn" onclick="formatJson('minify')">Minify</button>
                            <button class="btn" onclick="validateJson()">Validate</button>
                        </div>
                    </div>
                    
                    <div id="json-result" class="result hidden">
                        <div class="result-header">
                            <h3>Result</h3>
                            <button class="copy-btn" onclick="copyJsonResult()">Copy</button>
                        </div>
                        <pre id="formatted-json"></pre>
                    </div>
                </div>
            `;

            // Define JSON formatter functions in global scope
            window.formatJson = function(action) {
                const input = document.getElementById('json-input').value;
                const resultDiv = document.getElementById('json-result');
                const formattedJsonPre = document.getElementById('formatted-json');
                
                if (!input) {
                    alert('Please enter some JSON to format');
                    return;
                }
                
                try {
                    const jsonObj = JSON.parse(input);
                    let result;
                    
                    if (action === 'pretty') {
                        result = JSON.stringify(jsonObj, null, 2);
                    } else if (action === 'minify') {
                        result = JSON.stringify(jsonObj);
                    }
                    
                    formattedJsonPre.textContent = result;
                    formattedJsonPre.className = 'valid-json';
                    resultDiv.classList.remove('hidden');
                } catch (error) {
                    formattedJsonPre.textContent = `Error: ${error.message}`;
                    formattedJsonPre.className = 'invalid-json';
                    resultDiv.classList.remove('hidden');
                }
            };

            window.validateJson = function() {
                const input = document.getElementById('json-input').value;
                const resultDiv = document.getElementById('json-result');
                const formattedJsonPre = document.getElementById('formatted-json');
                
                if (!input) {
                    alert('Please enter some JSON to validate');
                    return;
                }
                
                try {
                    JSON.parse(input);
                    formattedJsonPre.textContent = 'Valid JSON!';
                    formattedJsonPre.className = 'valid-json';
                    resultDiv.classList.remove('hidden');
                } catch (error) {
                    formattedJsonPre.textContent = `Invalid JSON: ${error.message}`;
                    formattedJsonPre.className = 'invalid-json';
                    resultDiv.classList.remove('hidden');
                }
            };

            window.copyJsonResult = function() {
                const formattedJson = document.getElementById('formatted-json').textContent;
                navigator.clipboard.writeText(formattedJson).then(() => {
                    alert('JSON copied to clipboard!');
                });
            };
        }
    },
    {
        id: 'date-calculator',
        title: 'Date Calculator',
        description: 'Calculate differences between dates and more',
        icon: 'fas fa-calendar-alt',
        category: 'calculators',
        tags: ['date', 'time', 'calendar'],
        render: function(container) {
            container.innerHTML = `
                <div class="tool-content">
                    <h2>Date Calculator</h2>
                    
                    <div class="tool-tabs">
                        <button class="tool-tab active" onclick="switchDateTab('difference')">Date Difference</button>
                        <button class="tool-tab" onclick="switchDateTab('add')">Add/Subtract</button>
                        <button class="tool-tab" onclick="switchDateTab('weekday')">Day of Week</button>
                    </div>
                    
                    <div id="difference-tab" class="tool-tab-content active">
                        <div class="input-group">
                            <label for="date-from">From Date</label>
                            <input type="date" id="date-from">
                        </div>
                        <div class="input-group">
                            <label for="date-to">To Date</label>
                            <input type="date" id="date-to">
                        </div>
                        <button class="btn" onclick="calculateDateDifference()">Calculate Difference</button>
                        <div id="date-diff-result" class="result hidden"></div>
                    </div>
                    
                    <div id="add-tab" class="tool-tab-content">
                        <div class="input-group">
                            <label for="date-base">Base Date</label>
                            <input type="date" id="date-base">
                        </div>
                        <div class="input-group">
                            <label for="date-operation">Operation</label>
                            <select id="date-operation">
                                <option value="add">Add</option>
                                <option value="subtract">Subtract</option>
                            </select>
                        </div>
                        <div class="two-columns">
                            <div class="input-group">
                                <label for="date-years">Years</label>
                                <input type="number" id="date-years" value="0" min="0">
                            </div>
                            <div class="input-group">
                                <label for="date-months">Months</label>
                                <input type="number" id="date-months" value="0" min="0">
                            </div>
                            <div class="input-group">
                                <label for="date-days">Days</label>
                                <input type="number" id="date-days" value="0" min="0">
                            </div>
                        </div>
                        <button class="btn" onclick="calculateDateAddSubtract()">Calculate</button>
                        <div id="date-add-result" class="result hidden"></div>
                    </div>
                    
                    <div id="weekday-tab" class="tool-tab-content">
                        <div class="input-group">
                            <label for="weekday-date">Select Date</label>
                            <input type="date" id="weekday-date">
                        </div>
                        <button class="btn" onclick="calculateWeekday()">Get Day of Week</button>
                        <div id="weekday-result" class="result hidden"></div>
                    </div>
                </div>
            `;

            // Define date calculator functions in global scope
            window.switchDateTab = function(tab) {
                document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tool-tab-content').forEach(t => t.classList.remove('active'));
                
                document.querySelector(`.tool-tab[onclick*="${tab}"]`).classList.add('active');
                document.getElementById(`${tab}-tab`).classList.add('active');
            };

            window.calculateDateDifference = function() {
                const fromDate = new Date(document.getElementById('date-from').value);
                const toDate = new Date(document.getElementById('date-to').value);
                const resultDiv = document.getElementById('date-diff-result');
                
                if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
                    alert('Please select both dates');
                    return;
                }
                
                // Calculate difference in milliseconds
                const diffMs = Math.abs(toDate - fromDate);
                
                // Convert to days
                const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                
                // Calculate years, months, and remaining days
                const diffYears = Math.floor(diffDays / 365);
                const remainingDays1 = diffDays % 365;
                const diffMonths = Math.floor(remainingDays1 / 30);
                const remainingDays2 = remainingDays1 % 30;
                
                // Calculate hours, minutes, seconds
                const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                const diffMinutes = Math.floor(diffMs / (1000 * 60));
                const diffSeconds = Math.floor(diffMs / 1000);
                const diffWeeks = Math.floor(diffDays / 7);
                
                resultDiv.innerHTML = `
                    <p><strong>${diffDays}</strong> days</p>
                    <p><strong>${diffYears}</strong> years, <strong>${diffMonths}</strong> months, <strong>${remainingDays2}</strong> days</p>
                    <p><strong>${diffWeeks}</strong> weeks, <strong>${diffDays % 7}</strong> days</p>
                    <p><strong>${diffHours}</strong> hours</p>
                    <p><strong>${diffMinutes}</strong> minutes</p>
                    <p><strong>${diffSeconds}</strong> seconds</p>
                `;
                
                resultDiv.classList.remove('hidden');
            };

            window.calculateDateAddSubtract = function() {
                const baseDate = new Date(document.getElementById('date-base').value);
                const operation = document.getElementById('date-operation').value;
                const years = parseInt(document.getElementById('date-years').value) || 0;
                const months = parseInt(document.getElementById('date-months').value) || 0;
                const days = parseInt(document.getElementById('date-days').value) || 0;
                const resultDiv = document.getElementById('date-add-result');
                
                if (isNaN(baseDate.getTime())) {
                    alert('Please select a base date');
                    return;
                }
                
                if (years === 0 && months === 0 && days === 0) {
                    alert('Please enter at least one value to add or subtract');
                    return;
                }
                
                const resultDate = new Date(baseDate);
                
                if (operation === 'add') {
                    resultDate.setFullYear(resultDate.getFullYear() + years);
                    resultDate.setMonth(resultDate.getMonth() + months);
                    resultDate.setDate(resultDate.getDate() + days);
                } else {
                    resultDate.setFullYear(resultDate.getFullYear() - years);
                    resultDate.setMonth(resultDate.getMonth() - months);
                    resultDate.setDate(resultDate.getDate() - days);
                }
                
                const formatDate = date => {
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    return date.toLocaleDateString(undefined, options);
                };
                
                resultDiv.innerHTML = `
                    <p>Original date: <strong>${formatDate(baseDate)}</strong></p>
                    <p>Result date: <strong>${formatDate(resultDate)}</strong></p>
                `;
                
                resultDiv.classList.remove('hidden');
            };

            window.calculateWeekday = function() {
                const selectedDate = new Date(document.getElementById('weekday-date').value);
                const resultDiv = document.getElementById('weekday-result');
                
                if (isNaN(selectedDate.getTime())) {
                    alert('Please select a date');
                    return;
                }
                
                const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const weekday = weekdays[selectedDate.getDay()];
                
                const formatDate = date => {
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    return date.toLocaleDateString(undefined, options);
                };
                
                resultDiv.innerHTML = `
                    <p>The day of the week for <strong>${formatDate(selectedDate)}</strong> is <strong>${weekday}</strong></p>
                `;
                
                resultDiv.classList.remove('hidden');
            };
            
            // Initialize with today's date
            const today = new Date();
            const formatDateValue = date => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };
            
            document.getElementById('date-from').value = formatDateValue(today);
            document.getElementById('date-to').value = formatDateValue(today);
            document.getElementById('date-base').value = formatDateValue(today);
            document.getElementById('weekday-date').value = formatDateValue(today);
        }
    },
    {
        id: 'loan-calculator',
        title: 'Loan Calculator',
        description: 'Calculate loan payments and interest',
        icon: 'fas fa-dollar-sign',
        category: 'calculators',
        tags: ['finance', 'mortgage', 'money'],
        render: function(container) {
            container.innerHTML = `
                <div class="tool-content">
                    <h2>Loan Calculator</h2>
                    
                    <div class="input-group">
                        <label for="loan-amount">Loan Amount</label>
                        <input type="number" id="loan-amount" placeholder="Enter loan amount">
                    </div>
                    
                    <div class="input-group">
                        <label for="loan-interest">Annual Interest Rate (%)</label>
                        <input type="number" id="loan-interest" placeholder="Enter interest rate" step="0.01">
                    </div>
                    
                    <div class="input-group">
                        <label for="loan-term">Loan Term</label>
                        <div class="term-inputs">
                            <input type="number" id="loan-term" placeholder="Enter term">
                            <select id="loan-term-unit">
                                <option value="years">Years</option>
                                <option value="months">Months</option>
                            </select>
                        </div>
                    </div>
                    
                    <button class="btn" onclick="calculateLoan()">Calculate</button>
                    
                    <div id="loan-result" class="result hidden">
                        <div class="loan-summary">
                            <div class="summary-item">
                                <h4>Monthly Payment</h4>
                                <p id="monthly-payment"></p>
                            </div>
                            <div class="summary-item">
                                <h4>Total Payment</h4>
                                <p id="total-payment"></p>
                            </div>
                            <div class="summary-item">
                                <h4>Total Interest</h4>
                                <p id="total-interest"></p>
                            </div>
                        </div>
                        
                        <div class="loan-details">
                            <h4>Amortization Schedule</h4>
                            <button class="btn" onclick="toggleAmortizationTable()">Show/Hide Schedule</button>
                            <div id="amortization-table" class="hidden"></div>
                        </div>
                    </div>
                </div>
            `;

            // Define loan calculator functions in global scope
            window.calculateLoan = function() {
                const loanAmount = parseFloat(document.getElementById('loan-amount').value);
                const interestRate = parseFloat(document.getElementById('loan-interest').value);
                const loanTerm = parseInt(document.getElementById('loan-term').value);
                const termUnit = document.getElementById('loan-term-unit').value;
                
                if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm)) {
                    alert('Please enter all values');
                    return;
                }
                
                if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
                    alert('All values must be greater than zero');
                    return;
                }
                
                // Convert term to months if in years
                const termMonths = termUnit === 'years' ? loanTerm * 12 : loanTerm;
                
                // Calculate monthly interest rate
                const monthlyRate = interestRate / 100 / 12;
                
                // Calculate monthly payment
                const monthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths) / (Math.pow(1 + monthlyRate, termMonths) - 1);
                
                // Calculate total payment and interest
                const totalPayment = monthlyPayment * termMonths;
                const totalInterest = totalPayment - loanAmount;
                
                // Format currency
                const formatCurrency = amount => {
                    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
                };
                
                // Update result elements
                document.getElementById('monthly-payment').textContent = formatCurrency(monthlyPayment);
                document.getElementById('total-payment').textContent = formatCurrency(totalPayment);
                document.getElementById('total-interest').textContent = formatCurrency(totalInterest);
                
                // Generate amortization schedule
                generateAmortizationSchedule(loanAmount, monthlyRate, monthlyPayment, termMonths);
                
                // Show results
                document.getElementById('loan-result').classList.remove('hidden');
            };

            window.generateAmortizationSchedule = function(principal, monthlyRate, monthlyPayment, termMonths) {
                const tableDiv = document.getElementById('amortization-table');
                
                let tableHTML = `
                    <table class="amortization-table">
                        <thead>
                            <tr>
                                <th>Month</th>
                                <th>Payment</th>
                                <th>Principal</th>
                                <th>Interest</th>
                                <th>Remaining Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                
                let balance = principal;
                const formatCurrency = amount => {
                    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
                };
                
                // Only show first 12 months, last month, and every 12th month in between
                for (let month = 1; month <= termMonths; month++) {
                    const interest = balance * monthlyRate;
                    const principalPaid = monthlyPayment - interest;
                    balance -= principalPaid;
                    
                    if (balance < 0) balance = 0;
                    
                    if (month <= 12 || month === termMonths || month % 12 === 0) {
                        tableHTML += `
                            <tr>
                                <td>${month}</td>
                                <td>${formatCurrency(monthlyPayment)}</td>
                                <td>${formatCurrency(principalPaid)}</td>
                                <td>${formatCurrency(interest)}</td>
                                <td>${formatCurrency(balance)}</td>
                            </tr>
                        `;
                    }
                }
                
                tableHTML += `
                        </tbody>
                    </table>
                `;
                
                tableDiv.innerHTML = tableHTML;
            };

            window.toggleAmortizationTable = function() {
                const tableDiv = document.getElementById('amortization-table');
                tableDiv.classList.toggle('hidden');
            };
        }
    }
];

// Combine with main tools array
tools.push(...moreTools);
