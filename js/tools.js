// Define all the tools available in the application
const tools = [
    // Calculator Tools
    {
        id: 'basic-calculator',
        title: 'Basic Calculator',
        description: 'Perform simple arithmetic calculations',
        icon: 'fas fa-calculator',
        category: 'calculators',
        tags: ['math', 'arithmetic', 'basic'],
        render: function(container) {
            container.innerHTML = `
                <div class="tool-content">
                    <h2>Basic Calculator</h2>
                    <div class="calculator-display" id="calc-display">0</div>
                    <div class="calculator-grid">
                        <button class="calculator-btn" onclick="clearCalc()">C</button>
                        <button class="calculator-btn" onclick="deleteLastChar()">⌫</button>
                        <button class="calculator-btn operator" onclick="appendToCalc('%')">%</button>
                        <button class="calculator-btn operator" onclick="appendToCalc('/')">/</button>
                        <button class="calculator-btn" onclick="appendToCalc('7')">7</button>
                        <button class="calculator-btn" onclick="appendToCalc('8')">8</button>
                        <button class="calculator-btn" onclick="appendToCalc('9')">9</button>
                        <button class="calculator-btn operator" onclick="appendToCalc('*')">×</button>
                        <button class="calculator-btn" onclick="appendToCalc('4')">4</button>
                        <button class="calculator-btn" onclick="appendToCalc('5')">5</button>
                        <button class="calculator-btn" onclick="appendToCalc('6')">6</button>
                        <button class="calculator-btn operator" onclick="appendToCalc('-')">-</button>
                        <button class="calculator-btn" onclick="appendToCalc('1')">1</button>
                        <button class="calculator-btn" onclick="appendToCalc('2')">2</button>
                        <button class="calculator-btn" onclick="appendToCalc('3')">3</button>
                        <button class="calculator-btn operator" onclick="appendToCalc('+')">+</button>
                        <button class="calculator-btn" onclick="appendToCalc('0')">0</button>
                        <button class="calculator-btn" onclick="appendToCalc('.')">.</button>
                        <button class="calculator-btn equals" onclick="calculateResult()">=</button>
                    </div>
                </div>
            `;

            // Define calculator functions in global scope
            window.clearCalc = function() {
                document.getElementById('calc-display').textContent = '0';
            };

            window.deleteLastChar = function() {
                const display = document.getElementById('calc-display');
                if (display.textContent.length === 1 || display.textContent === 'Error') {
                    display.textContent = '0';
                } else {
                    display.textContent = display.textContent.slice(0, -1);
                }
            };

            window.appendToCalc = function(value) {
                const display = document.getElementById('calc-display');
                if (display.textContent === '0' || display.textContent === 'Error') {
                    display.textContent = value;
                } else {
                    display.textContent += value;
                }
            };

            window.calculateResult = function() {
                const display = document.getElementById('calc-display');
                try {
                    // Replace × with * for evaluation
                    const expression = display.textContent.replace(/×/g, '*');
                    display.textContent = eval(expression);
                } catch (error) {
                    display.textContent = 'Error';
                }
            };
        }
    },
    {
        id: 'bmi-calculator',
        title: 'BMI Calculator',
        description: 'Calculate your Body Mass Index',
        icon: 'fas fa-weight',
        category: 'calculators',
        tags: ['health', 'fitness', 'body'],
        render: function(container) {
            container.innerHTML = `
                <div class="tool-content">
                    <h2>BMI Calculator</h2>
                    <div class="tool-tabs">
                        <button class="tool-tab active" onclick="switchBmiTab('metric')">Metric</button>
                        <button class="tool-tab" onclick="switchBmiTab('imperial')">Imperial</button>
                    </div>
                    
                    <div id="metric-tab" class="tool-tab-content active">
                        <div class="input-group">
                            <label for="height-cm">Height (cm)</label>
                            <input type="number" id="height-cm" placeholder="Enter height">
                        </div>
                        <div class="input-group">
                            <label for="weight-kg">Weight (kg)</label>
                            <input type="number" id="weight-kg" placeholder="Enter weight">
                        </div>
                    </div>
                    
                    <div id="imperial-tab" class="tool-tab-content">
                        <div class="input-group">
                            <label for="height-ft">Height (ft)</label>
                            <input type="number" id="height-ft" placeholder="Feet">
                        </div>
                        <div class="input-group">
                            <label for="height-in">Height (in)</label>
                            <input type="number" id="height-in" placeholder="Inches">
                        </div>
                        <div class="input-group">
                            <label for="weight-lb">Weight (lb)</label>
                            <input type="number" id="weight-lb" placeholder="Enter weight">
                        </div>
                    </div>
                    
                    <button class="btn" onclick="calculateBmi()">Calculate BMI</button>
                    
                    <div id="bmi-result" class="result hidden">
                        <h3>Your BMI: <span id="bmi-value"></span></h3>
                        <p>Category: <span id="bmi-category"></span></p>
                        <p id="bmi-description"></p>
                    </div>
                </div>
            `;

            // Define BMI calculator functions in global scope
            window.switchBmiTab = function(tab) {
                document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tool-tab-content').forEach(t => t.classList.remove('active'));
                
                document.querySelector(`.tool-tab[onclick*="${tab}"]`).classList.add('active');
                document.getElementById(`${tab}-tab`).classList.add('active');
            };

            window.calculateBmi = function() {
                const resultDiv = document.getElementById('bmi-result');
                const bmiValue = document.getElementById('bmi-value');
                const bmiCategory = document.getElementById('bmi-category');
                const bmiDescription = document.getElementById('bmi-description');
                
                let bmi;
                
                if (document.getElementById('metric-tab').classList.contains('active')) {
                    const height = parseFloat(document.getElementById('height-cm').value) / 100; // convert to meters
                    const weight = parseFloat(document.getElementById('weight-kg').value);
                    
                    if (!height || !weight) {
                        alert('Please enter both height and weight');
                        return;
                    }
                    
                    bmi = weight / (height * height);
                } else {
                    const feet = parseFloat(document.getElementById('height-ft').value) || 0;
                    const inches = parseFloat(document.getElementById('height-in').value) || 0;
                    const pounds = parseFloat(document.getElementById('weight-lb').value);
                    
                    if (!pounds || (feet === 0 && inches === 0)) {
                        alert('Please enter both height and weight');
                        return;
                    }
                    
                    const totalInches = (feet * 12) + inches;
                    bmi = (pounds * 703) / (totalInches * totalInches);
                }
                
                bmiValue.textContent = bmi.toFixed(1);
                
                // Determine BMI category
                let category, description;
                if (bmi < 18.5) {
                    category = 'Underweight';
                    description = 'You are in the underweight range. Consider consulting with a healthcare professional.';
                } else if (bmi < 25) {
                    category = 'Normal weight';
                    description = 'You are in the normal weight range. Maintain a healthy lifestyle.';
                } else if (bmi < 30) {
                    category = 'Overweight';
                    description = 'You are in the overweight range. Consider healthy lifestyle changes.';
                } else {
                    category = 'Obese';
                    description = 'You are in the obese range. Consider consulting with a healthcare professional.';
                }
                
                bmiCategory.textContent = category;
                bmiDescription.textContent = description;
                resultDiv.classList.remove('hidden');
            };
        }
    },
    {
        id: 'percentage-calculator',
        title: 'Percentage Calculator',
        description: 'Calculate percentages easily',
        icon: 'fas fa-percent',
        category: 'calculators',
        tags: ['math', 'percentage', 'business'],
        render: function(container) {
            container.innerHTML = `
                <div class="tool-content">
                    <h2>Percentage Calculator</h2>
                    
                    <div class="tool-tabs">
                        <button class="tool-tab active" onclick="switchPercentTab('find-percent')">Find Percentage</button>
                        <button class="tool-tab" onclick="switchPercentTab('find-value')">Find Value</button>
                        <button class="tool-tab" onclick="switchPercentTab('find-percent-change')">Percentage Change</button>
                    </div>
                    
                    <div id="find-percent-tab" class="tool-tab-content active">
                        <p>Calculate what percent X is of Y</p>
                        <div class="input-group">
                            <label for="percent-x">X</label>
                            <input type="number" id="percent-x" placeholder="Enter value">
                        </div>
                        <div class="input-group">
                            <label for="percent-y">Y</label>
                            <input type="number" id="percent-y" placeholder="Enter value">
                        </div>
                        <button class="btn" onclick="calculatePercent()">Calculate</button>
                        <div id="percent-result" class="result hidden"></div>
                    </div>
                    
                    <div id="find-value-tab" class="tool-tab-content">
                        <p>Calculate X% of Y</p>
                        <div class="input-group">
                            <label for="value-x">X (%)</label>
                            <input type="number" id="value-x" placeholder="Enter percentage">
                        </div>
                        <div class="input-group">
                            <label for="value-y">Y</label>
                            <input type="number" id="value-y" placeholder="Enter value">
                        </div>
                        <button class="btn" onclick="calculateValue()">Calculate</button>
                        <div id="value-result" class="result hidden"></div>
                    </div>
                    
                    <div id="find-percent-change-tab" class="tool-tab-content">
                        <p>Calculate percentage change from X to Y</p>
                        <div class="input-group">
                            <label for="change-x">Original Value (X)</label>
                            <input type="number" id="change-x" placeholder="Enter original value">
                        </div>
                        <div class="input-group">
                            <label for="change-y">New Value (Y)</label>
                            <input type="number" id="change-y" placeholder="Enter new value">
                        </div>
                        <button class="btn" onclick="calculatePercentChange()">Calculate</button>
                        <div id="change-result" class="result hidden"></div>
                    </div>
                </div>
            `;

            // Define percentage calculator functions in global scope
            window.switchPercentTab = function(tab) {
                document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tool-tab-content').forEach(t => t.classList.remove('active'));
                
                document.querySelector(`.tool-tab[onclick*="${tab}"]`).classList.add('active');
                document.getElementById(`${tab}-tab`).classList.add('active');
            };

            window.calculatePercent = function() {
                const x = parseFloat(document.getElementById('percent-x').value);
                const y = parseFloat(document.getElementById('percent-y').value);
                const resultDiv = document.getElementById('percent-result');
                
                if (!x || !y) {
                    alert('Please enter both values');
                    return;
                }
                
                const percentage = (x / y) * 100;
                resultDiv.innerHTML = `<p>${x} is ${percentage.toFixed(2)}% of ${y}</p>`;
                resultDiv.classList.remove('hidden');
            };

            window.calculateValue = function() {
                const x = parseFloat(document.getElementById('value-x').value);
                const y = parseFloat(document.getElementById('value-y').value);
                const resultDiv = document.getElementById('value-result');
                
                if (!x || !y) {
                    alert('Please enter both values');
                    return;
                }
                
                const value = (x / 100) * y;
                resultDiv.innerHTML = `<p>${x}% of ${y} is ${value.toFixed(2)}</p>`;
                resultDiv.classList.remove('hidden');
            };

            window.calculatePercentChange = function() {
                const x = parseFloat(document.getElementById('change-x').value);
                const y = parseFloat(document.getElementById('change-y').value);
                const resultDiv = document.getElementById('change-result');
                
                if (!x || !y) {
                    alert('Please enter both values');
                    return;
                }
                
                const change = ((y - x) / x) * 100;
                let message;
                
                if (change > 0) {
                    message = `<p>Increase of ${Math.abs(change).toFixed(2)}%</p>`;
                } else if (change < 0) {
                    message = `<p>Decrease of ${Math.abs(change).toFixed(2)}%</p>`;
                } else {
                    message = `<p>No change (0%)</p>`;
                }
                
                resultDiv.innerHTML = message;
                resultDiv.classList.remove('hidden');
            };
        }
    },
    // Converter Tools
    {
        id: 'unit-converter',
        title: 'Unit Converter',
        description: 'Convert between different units of measurement',
        icon: 'fas fa-exchange-alt',
        category: 'converters',
        tags: ['measurement', 'units', 'conversion'],
        render: function(container) {
            container.innerHTML = `
                <div class="tool-content">
                    <h2>Unit Converter</h2>
                    
                    <div class="input-group">
                        <label for="unit-category">Category</label>
                        <select id="unit-category" onchange="changeUnitCategory()">
                            <option value="length">Length</option>
                            <option value="weight">Weight</option>
                            <option value="temperature">Temperature</option>
                            <option value="area">Area</option>
                            <option value="volume">Volume</option>
                            <option value="speed">Speed</option>
                        </select>
                    </div>
                    
                    <div class="two-columns">
                        <div class="input-group">
                            <label for="from-unit">From</label>
                            <select id="from-unit"></select>
                        </div>
                        <div class="input-group">
                            <label for="to-unit">To</label>
                            <select id="to-unit"></select>
                        </div>
                    </div>
                    
                    <div class="input-group">
                        <label for="unit-value">Value</label>
                        <input type="number" id="unit-value" placeholder="Enter value to convert">
                    </div>
                    
                    <button class="btn" onclick="convertUnit()">Convert</button>
                    
                    <div id="conversion-result" class="result hidden"></div>
                </div>
            `;

            // Define unit conversion functions and data in global scope
            window.unitData = {
                length: {
                    units: ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Mile', 'Yard', 'Foot', 'Inch'],
                    conversions: {
                        Meter: 1,
                        Kilometer: 0.001,
                        Centimeter: 100,
                        Millimeter: 1000,
                        Mile: 0.000621371,
                        Yard: 1.09361,
                        Foot: 3.28084,
                        Inch: 39.3701
                    }
                },
                weight: {
                    units: ['Kilogram', 'Gram', 'Milligram', 'Pound', 'Ounce', 'Ton', 'Stone'],
                    conversions: {
                        Kilogram: 1,
                        Gram: 1000,
                        Milligram: 1000000,
                        Pound: 2.20462,
                        Ounce: 35.274,
                        Ton: 0.001,
                        Stone: 0.157473
                    }
                },
                temperature: {
                    units: ['Celsius', 'Fahrenheit', 'Kelvin']
                },
                area: {
                    units: ['Square Meter', 'Square Kilometer', 'Square Centimeter', 'Square Millimeter', 'Square Mile', 'Square Yard', 'Square Foot', 'Square Inch', 'Acre', 'Hectare'],
                    conversions: {
                        'Square Meter': 1,
                        'Square Kilometer': 0.000001,
                        'Square Centimeter': 10000,
                        'Square Millimeter': 1000000,
                        'Square Mile': 3.861e-7,
                        'Square Yard': 1.19599,
                        'Square Foot': 10.7639,
                        'Square Inch': 1550,
                        'Acre': 0.000247105,
                        'Hectare': 0.0001
                    }
                },
                volume: {
                    units: ['Cubic Meter', 'Cubic Centimeter', 'Liter', 'Milliliter', 'Gallon (US)', 'Quart (US)', 'Pint (US)', 'Cup (US)', 'Fluid Ounce (US)', 'Tablespoon (US)', 'Teaspoon (US)'],
                    conversions: {
                        'Cubic Meter': 1,
                        'Cubic Centimeter': 1000000,
                        'Liter': 1000,
                        'Milliliter': 1000000,
                        'Gallon (US)': 264.172,
                        'Quart (US)': 1056.69,
                        'Pint (US)': 2113.38,
                        'Cup (US)': 4226.75,
                        'Fluid Ounce (US)': 33814,
                        'Tablespoon (US)': 67628,
                        'Teaspoon (US)': 202884
                    }
                },
                speed: {
                    units: ['Meter per second', 'Kilometer per hour', 'Mile per hour', 'Knot', 'Foot per second'],
                    conversions: {
                        'Meter per second': 1,
                        'Kilometer per hour': 3.6,
                        'Mile per hour': 2.23694,
                        'Knot': 1.94384,
                        'Foot per second': 3.28084
                    }
                }
            };

            window.changeUnitCategory = function() {
                const category = document.getElementById('unit-category').value;
                const fromSelect = document.getElementById('from-unit');
                const toSelect = document.getElementById('to-unit');
                
                // Clear previous options
                fromSelect.innerHTML = '';
                toSelect.innerHTML = '';
                
                // Add new options based on selected category
                unitData[category].units.forEach(unit => {
                    fromSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
                    toSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
                });
                
                // Set default second option for "to" select
                if (toSelect.options.length > 1) {
                    toSelect.selectedIndex = 1;
                }
            };

            window.convertUnit = function() {
                const category = document.getElementById('unit-category').value;
                const fromUnit = document.getElementById('from-unit').value;
                const toUnit = document.getElementById('to-unit').value;
                const value = parseFloat(document.getElementById('unit-value').value);
                const resultDiv = document.getElementById('conversion-result');
                
                if (!value) {
                    alert('Please enter a value to convert');
                    return;
                }
                
                let result;
                
                // Special case for temperature
                if (category === 'temperature') {
                    result = convertTemperature(value, fromUnit, toUnit);
                } else {
                    // For other units using conversion factors
                    const fromFactor = unitData[category].conversions[fromUnit];
                    const toFactor = unitData[category].conversions[toUnit];
                    result = (value / fromFactor) * toFactor;
                }
                
                resultDiv.innerHTML = `<p>${value} ${fromUnit} = ${result.toFixed(6)} ${toUnit}</p>`;
                resultDiv.classList.remove('hidden');
            };

            window.convertTemperature = function(value, fromUnit, toUnit) {
                if (fromUnit === toUnit) return value;
                
                let celsius;
                
                // Convert to Celsius first
                if (fromUnit === 'Celsius') {
                    celsius = value;
                } else if (fromUnit === 'Fahrenheit') {
                    celsius = (value - 32) * (5/9);
                } else if (fromUnit === 'Kelvin') {
                    celsius = value - 273.15;
                }
                
                // Convert from Celsius to target unit
                if (toUnit === 'Celsius') {
                    return celsius;
                } else if (toUnit === 'Fahrenheit') {
                    return (celsius * (9/5)) + 32;
                } else if (toUnit === 'Kelvin') {
                    return celsius + 273.15;
                }
            };
            
            // Initialize the unit options
            changeUnitCategory();
        }
    }
];

// More tools will be defined in tools2.js
