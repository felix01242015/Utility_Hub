// Time Zone Converter Tool for the Utility Hub application

const timeZoneConverterTool = {
    id: 'timezone-converter',
    title: 'Time Zone Converter',
    description: 'Convert times between different time zones',
    icon: 'fas fa-clock',
    category: 'productivity',
    tags: ['time', 'converter', 'timezone', 'productivity'],
    render: function(container) {
        // Get all available time zones
        const timeZones = Intl.supportedValuesOf('timeZone');
        const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        container.innerHTML = `
            <div class="tool-content">
                <h2>Time Zone Converter</h2>
                <div class="timezone-container">
                    <!-- Source Time Section -->
                    <div class="time-section">
                        <h3>Source Time</h3>
                        <div class="input-group">
                            <select id="source-timezone" class="timezone-select">
                                ${timeZones.map(zone => 
                                    `<option value="${zone}" ${zone === localZone ? 'selected' : ''}>${zone}</option>`
                                ).join('')}
                            </select>
                            <div class="datetime-inputs">
                                <input type="date" id="source-date" class="date-input">
                                <input type="time" id="source-time" class="time-input">
                            </div>
                            <button onclick="useCurrentTime()" class="btn">Use Current Time</button>
                        </div>
                    </div>

                    <!-- Target Times Section -->
                    <div class="time-section">
                        <h3>Target Times</h3>
                        <div class="target-zones" id="target-zones">
                            <div class="target-zone-row">
                                <select class="timezone-select target-zone">
                                    ${timeZones.map(zone => 
                                        `<option value="${zone}">${zone}</option>`
                                    ).join('')}
                                </select>
                                <span class="converted-time"></span>
                                <button onclick="removeTargetZone(this)" class="btn-icon">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <button onclick="addTargetZone()" class="btn">
                            <i class="fas fa-plus"></i> Add Time Zone
                        </button>
                    </div>

                    <!-- Common Time Zones Section -->
                    <div class="common-zones">
                        <h3>Quick Add Common Time Zones</h3>
                        <div class="common-zone-buttons">
                            <button onclick="addCommonZone('America/New_York')" class="btn">New York</button>
                            <button onclick="addCommonZone('America/Los_Angeles')" class="btn">Los Angeles</button>
                            <button onclick="addCommonZone('Europe/London')" class="btn">London</button>
                            <button onclick="addCommonZone('Asia/Tokyo')" class="btn">Tokyo</button>
                            <button onclick="addCommonZone('Asia/Shanghai')" class="btn">Shanghai</button>
                            <button onclick="addCommonZone('Australia/Sydney')" class="btn">Sydney</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .timezone-container {
                display: flex;
                flex-direction: column;
                gap: 20px;
                max-width: 800px;
                margin: 0 auto;
            }

            .time-section {
                background: #f8f9fa;
                padding: 20px;
                border-radius: var(--border-radius);
                border: 1px solid #ddd;
            }

            .input-group {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .datetime-inputs {
                display: flex;
                gap: 10px;
            }

            .timezone-select {
                width: 100%;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                background: white;
            }

            .date-input, .time-input {
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                flex: 1;
            }

            .target-zones {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin: 10px 0;
            }

            .target-zone-row {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .converted-time {
                flex: 1;
                padding: 8px;
                background: white;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                font-family: monospace;
            }

            .btn-icon {
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: var(--border-radius);
                background: white;
                cursor: pointer;
                transition: var(--transition);
            }

            .btn-icon:hover {
                background: #f0f0f0;
            }

            .common-zones {
                background: #f8f9fa;
                padding: 20px;
                border-radius: var(--border-radius);
                border: 1px solid #ddd;
            }

            .common-zone-buttons {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-top: 10px;
            }

            @media (max-width: 600px) {
                .datetime-inputs {
                    flex-direction: column;
                }
                
                .target-zone-row {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .btn-icon {
                    align-self: flex-end;
                }
            }
        `;
        document.head.appendChild(style);

        // Initialize the current date and time
        const now = new Date();
        document.getElementById('source-date').value = now.toISOString().split('T')[0];
        document.getElementById('source-time').value = now.toTimeString().slice(0, 5);

        // Set up event listeners
        document.getElementById('source-timezone').addEventListener('change', updateAllTimes);
        document.getElementById('source-date').addEventListener('change', updateAllTimes);
        document.getElementById('source-time').addEventListener('change', updateAllTimes);

        // Initial conversion
        updateAllTimes();

        // Define global functions
        window.useCurrentTime = function() {
            const now = new Date();
            document.getElementById('source-date').value = now.toISOString().split('T')[0];
            document.getElementById('source-time').value = now.toTimeString().slice(0, 5);
            updateAllTimes();
        };

        window.addTargetZone = function() {
            const targetZones = document.getElementById('target-zones');
            const newRow = targetZones.children[0].cloneNode(true);
            newRow.querySelector('.converted-time').textContent = '';
            newRow.querySelector('select').value = '';
            targetZones.appendChild(newRow);
            
            // Add event listener to the new select
            newRow.querySelector('select').addEventListener('change', updateAllTimes);
        };

        window.removeTargetZone = function(button) {
            const targetZones = document.getElementById('target-zones');
            if (targetZones.children.length > 1) {
                button.closest('.target-zone-row').remove();
            }
        };

        window.addCommonZone = function(timezone) {
            const targetZones = document.getElementById('target-zones');
            const selects = targetZones.querySelectorAll('select');
            
            // Check if timezone is already added
            for (const select of selects) {
                if (select.value === timezone) {
                    return; // Already exists
                }
            }
            
            // Add new row with the timezone
            const newRow = targetZones.children[0].cloneNode(true);
            newRow.querySelector('select').value = timezone;
            newRow.querySelector('.converted-time').textContent = '';
            targetZones.appendChild(newRow);
            
            // Add event listener and update times
            newRow.querySelector('select').addEventListener('change', updateAllTimes);
            updateAllTimes();
        };

        function updateAllTimes() {
            const sourceZone = document.getElementById('source-timezone').value;
            const sourceDate = document.getElementById('source-date').value;
            const sourceTime = document.getElementById('source-time').value;
            
            if (!sourceDate || !sourceTime) return;
            
            const sourceDateTime = new Date(sourceDate + 'T' + sourceTime);
            const targetRows = document.querySelectorAll('.target-zone-row');
            
            targetRows.forEach(row => {
                const targetZone = row.querySelector('select').value;
                const timeSpan = row.querySelector('.converted-time');
                
                if (!targetZone) {
                    timeSpan.textContent = '';
                    return;
                }
                
                try {
                    const convertedTime = sourceDateTime.toLocaleString('en-US', {
                        timeZone: targetZone,
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });
                    timeSpan.textContent = convertedTime;
                } catch (error) {
                    timeSpan.textContent = 'Invalid time zone';
                }
            });
        }
    }
};

// Add the Time Zone Converter tool to the main tools array
tools.push(timeZoneConverterTool);
