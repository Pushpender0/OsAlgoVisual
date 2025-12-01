// Color palette for processes
const processColors = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

// Navigation between sections
function showSection(sectionId) {
  const sections = document.querySelectorAll(".content-section");
  const buttons = document.querySelectorAll(".nav-btn");

  sections.forEach((section) => section.classList.remove("active"));
  buttons.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(sectionId).classList.add("active");
  event.target.classList.add("active");
}

// ========== FCFS FUNCTIONS ==========
function generateFCFSTable() {
  const n = parseInt(document.getElementById("fcfs-processes").value);
  const tbody = document.getElementById("fcfs-tbody");
  tbody.innerHTML = "";

  for (let i = 1; i <= n; i++) {
    tbody.innerHTML += `
                    <tr>
                        <td>P${i}</td>
                        <td><input type="number" id="fcfs-at-${i}" value="0" min="0" style="width: 80px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;"></td>
                        <td><input type="number" id="fcfs-bt-${i}" value="${
      i * 2
    }" min="1" style="width: 80px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;"></td>
                        <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
                    </tr>
                `;
  }
}

function calculateFCFS() {
  const n = parseInt(document.getElementById("fcfs-processes").value);
  const processes = [];

  for (let i = 1; i <= n; i++) {
    const at = parseInt(document.getElementById(`fcfs-at-${i}`).value) || 0;
    const bt = parseInt(document.getElementById(`fcfs-bt-${i}`).value) || 0;
    processes.push({ id: `P${i}`, at, bt });
  }

  // Sort by arrival time
  processes.sort((a, b) => a.at - b.at);

  let currentTime = 0;
  const ganttData = [];
  const results = [];

  processes.forEach((p, index) => {
    if (currentTime < p.at) {
      ganttData.push({ id: "Idle", start: currentTime, end: p.at });
      currentTime = p.at;
    }

    const start = currentTime;
    const end = currentTime + p.bt;
    const ct = end;
    const tat = ct - p.at;
    const wt = tat - p.bt;
    const rt = start - p.at;

    ganttData.push({
      id: p.id,
      start,
      end,
      color: processColors[index % processColors.length],
    });
    results.push({ id: p.id, at: p.at, bt: p.bt, ct, tat, wt, rt });

    currentTime = end;
  });

  displayResults("fcfs-output", ganttData, results);
}

function resetFCFS() {
  generateFCFSTable();
  document.getElementById("fcfs-output").innerHTML = "";
}

// ========== SJF FUNCTIONS ==========
function generateSJFTable() {
  const n = parseInt(document.getElementById("sjf-processes").value);
  const tbody = document.getElementById("sjf-tbody");
  tbody.innerHTML = "";

  for (let i = 1; i <= n; i++) {
    tbody.innerHTML += `
                    <tr>
                        <td>P${i}</td>
                        <td><input type="number" id="sjf-at-${i}" value="${
      i - 1
    }" min="0" style="width: 80px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;"></td>
                        <td><input type="number" id="sjf-bt-${i}" value="${
      Math.floor(Math.random() * 8) + 2
    }" min="1" style="width: 80px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;"></td>
                        <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
                    </tr>
                `;
  }
}

function calculateSJF() {
  const n = parseInt(document.getElementById("sjf-processes").value);
  const processes = [];

  for (let i = 1; i <= n; i++) {
    const at = parseInt(document.getElementById(`sjf-at-${i}`).value) || 0;
    const bt = parseInt(document.getElementById(`sjf-bt-${i}`).value) || 0;
    processes.push({
      id: `P${i}`,
      at,
      bt,
      completed: false,
      colorIndex: i - 1,
    });
  }

  let currentTime = 0;
  const ganttData = [];
  const results = [];
  let completed = 0;

  while (completed < n) {
    const available = processes.filter(
      (p) => !p.completed && p.at <= currentTime
    );

    if (available.length === 0) {
      const nextArrival = Math.min(
        ...processes.filter((p) => !p.completed).map((p) => p.at)
      );
      ganttData.push({
        id: "Idle",
        start: currentTime,
        end: nextArrival,
      });
      currentTime = nextArrival;
      continue;
    }

    available.sort((a, b) => a.bt - b.bt);
    const p = available[0];

    const start = currentTime;
    const end = currentTime + p.bt;
    const ct = end;
    const tat = ct - p.at;
    const wt = tat - p.bt;
    const rt = start - p.at;

    ganttData.push({
      id: p.id,
      start,
      end,
      color: processColors[p.colorIndex % processColors.length],
    });
    results.push({ id: p.id, at: p.at, bt: p.bt, ct, tat, wt, rt });

    p.completed = true;
    currentTime = end;
    completed++;
  }

  displayResults("sjf-output", ganttData, results);
}

function resetSJF() {
  generateSJFTable();
  document.getElementById("sjf-output").innerHTML = "";
}

// ========== SRTF FUNCTIONS ==========
function generateSRTFTable() {
  const n = parseInt(document.getElementById("srtf-processes").value);
  const tbody = document.getElementById("srtf-tbody");
  tbody.innerHTML = "";

  for (let i = 1; i <= n; i++) {
    tbody.innerHTML += `
                    <tr>
                        <td>P${i}</td>
                        <td><input type="number" id="srtf-at-${i}" value="${
      i - 1
    }" min="0" style="width: 80px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;"></td>
                        <td><input type="number" id="srtf-bt-${i}" value="${
      Math.floor(Math.random() * 8) + 2
    }" min="1" style="width: 80px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;"></td>
                        <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
                    </tr>
                `;
  }
}

function calculateSRTF() {
  const n = parseInt(document.getElementById("srtf-processes").value);
  const processes = [];

  for (let i = 1; i <= n; i++) {
    const at = parseInt(document.getElementById(`srtf-at-${i}`).value) || 0;
    const bt = parseInt(document.getElementById(`srtf-bt-${i}`).value) || 0;
    processes.push({
      id: `P${i}`,
      at,
      bt,
      remaining: bt,
      colorIndex: i - 1,
    });
  }

  let currentTime = 0;
  const ganttData = [];
  const results = [];
  const maxTime =
    Math.max(...processes.map((p) => p.at)) +
    processes.reduce((sum, p) => sum + p.bt, 0);
  const responseTime = {};

  while (currentTime < maxTime) {
    const available = processes.filter(
      (p) => p.remaining > 0 && p.at <= currentTime
    );

    if (available.length === 0) {
      currentTime++;
      continue;
    }

    available.sort((a, b) => a.remaining - b.remaining);
    const p = available[0];

    if (responseTime[p.id] === undefined) {
      responseTime[p.id] = currentTime - p.at;
    }

    const lastGantt = ganttData[ganttData.length - 1];
    if (lastGantt && lastGantt.id === p.id) {
      lastGantt.end = currentTime + 1;
    } else {
      ganttData.push({
        id: p.id,
        start: currentTime,
        end: currentTime + 1,
        color: processColors[p.colorIndex % processColors.length],
      });
    }

    p.remaining--;
    currentTime++;

    if (p.remaining === 0) {
      const ct = currentTime;
      const tat = ct - p.at;
      const wt = tat - p.bt;
      const rt = responseTime[p.id];
      results.push({ id: p.id, at: p.at, bt: p.bt, ct, tat, wt, rt });
    }
  }

  results.sort((a, b) => parseInt(a.id.slice(1)) - parseInt(b.id.slice(1)));
  displayResults("srtf-output", ganttData, results);
}

function resetSRTF() {
  generateSRTFTable();
  document.getElementById("srtf-output").innerHTML = "";
}

// ========== ROUND ROBIN FUNCTIONS ==========
function generateRRTable() {
  const n = parseInt(document.getElementById("rr-processes").value);
  const tbody = document.getElementById("rr-tbody");
  tbody.innerHTML = "";

  for (let i = 1; i <= n; i++) {
    tbody.innerHTML += `
                    <tr>
                        <td>P${i}</td>
                        <td><input type="number" id="rr-at-${i}" value="${
      i - 1
    }" min="0" style="width: 80px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;"></td>
                        <td><input type="number" id="rr-bt-${i}" value="${
      Math.floor(Math.random() * 8) + 3
    }" min="1" style="width: 80px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;"></td>
                        <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
                    </tr>
                `;
  }
}

function calculateRR() {
  // const n = parseInt(document.getElementById("rr-processes").value);
  // const quantum = parseInt(document.getElementById("rr-quantum").value) || 2;

  const n = parseInt(document.getElementById("rr-processes").value);
  const quantum = parseInt(document.getElementById("rr-quantum").value);

  // Alert and stop if quantum is zero or invalid
  if (!quantum || quantum <= 0) {
    alert("Time quantum must be greater than 0 for Round Robin.");
    return;
  }

  const processes = [];

  for (let i = 1; i <= n; i++) {
    const at = parseInt(document.getElementById(`rr-at-${i}`).value) || 0;
    const bt = parseInt(document.getElementById(`rr-bt-${i}`).value) || 0;
    processes.push({
      id: `P${i}`,
      at,
      bt,
      remaining: bt,
      colorIndex: i - 1,
    });
  }

  processes.sort((a, b) => a.at - b.at);

  let currentTime = 0;
  const ganttData = [];
  const results = [];
  const queue = [];
  const responseTime = {};
  let index = 0;

  while (processes.some((p) => p.remaining > 0) || queue.length > 0) {
    while (index < processes.length && processes[index].at <= currentTime) {
      queue.push(processes[index]);
      index++;
    }

    if (queue.length === 0) {
      currentTime = processes[index].at;
      continue;
    }

    const p = queue.shift();

    if (responseTime[p.id] === undefined) {
      responseTime[p.id] = currentTime - p.at;
    }

    const execTime = Math.min(quantum, p.remaining);
    ganttData.push({
      id: p.id,
      start: currentTime,
      end: currentTime + execTime,
      color: processColors[p.colorIndex % processColors.length],
    });

    p.remaining -= execTime;
    currentTime += execTime;

    while (index < processes.length && processes[index].at <= currentTime) {
      queue.push(processes[index]);
      index++;
    }

    if (p.remaining > 0) {
      queue.push(p);
    } else {
      const ct = currentTime;
      const tat = ct - p.at;
      const wt = tat - p.bt;
      const rt = responseTime[p.id];
      results.push({ id: p.id, at: p.at, bt: p.bt, ct, tat, wt, rt });
    }
  }

  results.sort((a, b) => parseInt(a.id.slice(1)) - parseInt(b.id.slice(1)));
  displayResults("rr-output", ganttData, results);
}

function resetRR() {
  generateRRTable();
  document.getElementById("rr-output").innerHTML = "";
}

// ========== PRIORITY FUNCTIONS ==========
function generatePriorityTable() {
  const n = parseInt(document.getElementById("priority-processes").value);
  const tbody = document.getElementById("priority-tbody");
  tbody.innerHTML = "";

  for (let i = 1; i <= n; i++) {
    tbody.innerHTML += `
                    <tr>
                        <td>P${i}</td>
                        <td><input type="number" id="priority-at-${i}" value="${
      i - 1
    }" min="0" style="width: 80px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;"></td>
                        <td><input type="number" id="priority-bt-${i}" value="${
      Math.floor(Math.random() * 8) + 2
    }" min="1" style="width: 80px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;"></td>
                        <td><input type="number" id="priority-p-${i}" value="${i}" min="0" style="width: 80px; padding: 0.5rem; border: 1px solid #e2e8f0; border-radius: 4px;"></td>
                        <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
                    </tr>
                `;
  }
}

function calculatePriority() {
  const n = parseInt(document.getElementById("priority-processes").value);
  const processes = [];

  for (let i = 1; i <= n; i++) {
    const at = parseInt(document.getElementById(`priority-at-${i}`).value) || 0;
    const bt = parseInt(document.getElementById(`priority-bt-${i}`).value) || 0;
    const priority =
      parseInt(document.getElementById(`priority-p-${i}`).value) || 0;
    processes.push({
      id: `P${i}`,
      at,
      bt,
      priority,
      completed: false,
      colorIndex: i - 1,
    });
  }

  let currentTime = 0;
  const ganttData = [];
  const results = [];
  let completed = 0;

  while (completed < n) {
    const available = processes.filter(
      (p) => !p.completed && p.at <= currentTime
    );

    if (available.length === 0) {
      const nextArrival = Math.min(
        ...processes.filter((p) => !p.completed).map((p) => p.at)
      );
      ganttData.push({
        id: "Idle",
        start: currentTime,
        end: nextArrival,
      });
      currentTime = nextArrival;
      continue;
    }

    available.sort((a, b) => a.priority - b.priority);
    const p = available[0];

    const start = currentTime;
    const end = currentTime + p.bt;
    const ct = end;
    const tat = ct - p.at;
    const wt = tat - p.bt;
    const rt = start - p.at;

    ganttData.push({
      id: p.id,
      start,
      end,
      color: processColors[p.colorIndex % processColors.length],
    });
    results.push({
      id: p.id,
      at: p.at,
      bt: p.bt,
      priority: p.priority,
      ct,
      tat,
      wt,
      rt,
    });

    p.completed = true;
    currentTime = end;
    completed++;
  }

  displayResults("priority-output", ganttData, results);
}

function resetPriority() {
  generatePriorityTable();
  document.getElementById("priority-output").innerHTML = "";
}

// ========== COMMON DISPLAY FUNCTIONS ==========
function displayResults(outputId, ganttData, results) {
  const output = document.getElementById(outputId);

  // Calculate averages
  const avgTAT = (
    results.reduce((sum, r) => sum + r.tat, 0) / results.length
  ).toFixed(2);
  const avgWT = (
    results.reduce((sum, r) => sum + r.wt, 0) / results.length
  ).toFixed(2);
  const avgRT = (
    results.reduce((sum, r) => sum + r.rt, 0) / results.length
  ).toFixed(2);

  // Gantt Chart
  const maxTime = Math.max(...ganttData.map((g) => g.end));
  let ganttHTML =
    '<div class="gantt-container"><h3 class="gantt-title">📊 Gantt Chart</h3><div class="gantt-chart">';

  ganttData.forEach((block) => {
    const width = ((block.end - block.start) / maxTime) * 100;
    const bgColor = block.id === "Idle" ? "#cbd5e1" : block.color;
    ganttHTML += `<div class="gantt-block" style="width: ${width}%; background: ${bgColor};" title="${block.id}: ${block.start} - ${block.end}">${block.id}</div>`;
  });

  ganttHTML += '</div><div class="gantt-timeline">';
  const timePoints = [
    ...new Set(ganttData.flatMap((g) => [g.start, g.end])),
  ].sort((a, b) => a - b);
  timePoints.forEach((time) => {
    ganttHTML += `<span>${time}</span>`;
  });
  ganttHTML += "</div></div>";

  // Results Table
  let tableHTML = `
                <div class="process-table-container">
                    <h3 style="margin: 1.5rem 0 1rem 0; font-size: 1.3rem;">📋 Process Details</h3>
                    <table class="process-table">
                        <thead>
                            <tr>
                                <th>Process</th>
                                <th>Arrival Time</th>
                                <th>Burst Time</th>
                                ${
                                  results[0].priority !== undefined
                                    ? "<th>Priority</th>"
                                    : ""
                                }
                                <th>Completion Time</th>
                                <th>Turnaround Time</th>
                                <th>Waiting Time</th>
                                <th>Response Time</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

  results.forEach((r) => {
    tableHTML += `
                    <tr>
                        <td><strong>${r.id}</strong></td>
                        <td>${r.at}</td>
                        <td>${r.bt}</td>
                        ${
                          r.priority !== undefined
                            ? `<td>${r.priority}</td>`
                            : ""
                        }
                        <td>${r.ct}</td>
                        <td>${r.tat}</td>
                        <td>${r.wt}</td>
                        <td>${r.rt}</td>
                    </tr>
                `;
  });

  tableHTML += "</tbody></table></div>";

  // Metrics Cards
  const metricsHTML = `
                <div class="results-grid">
                    <div class="result-card">
                        <h3>Average Turnaround Time</h3>
                        <div class="value">${avgTAT}</div>
                    </div>
                    <div class="result-card" style="border-left-color: #10b981;">
                        <h3>Average Waiting Time</h3>
                        <div class="value" style="color: #10b981;">${avgWT}</div>
                    </div>
                    <div class="result-card" style="border-left-color: #f59e0b;">
                        <h3>Average Response Time</h3>
                        <div class="value" style="color: #f59e0b;">${avgRT}</div>
                    </div>
                </div>
            `;

  output.innerHTML = ganttHTML + metricsHTML + tableHTML;
}

function deleteRow(btn) {
  btn.closest("tr").remove();
}

// Initialize first table on load
window.onload = function () {
  generateFCFSTable();
};
