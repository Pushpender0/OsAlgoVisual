# OsAlgoVisual
OS Algorithm Visualizer ⚙️🖥️
An interactive, browser-based CPU scheduling visualizer built with pure HTML, CSS, and JavaScript – perfect for OS students and enthusiasts who love visuals.​

This project turns classic CPU scheduling algorithms into colorful, animated timelines so you can “see” how the CPU works, not just calculate on paper.​

✨ Key Highlights
🔁 Multiple CPU scheduling algorithms:

⏱️ FCFS (First Come First Serve)

📏 SJF (Shortest Job First – Non-preemptive)

⚡ SRTF (Shortest Remaining Time First – Preemptive)

🔄 Round Robin (with time quantum)

🎯 Priority Scheduling (Non-preemptive)​

🧮 Smart input system:

Choose number of processes.

Edit arrival time, burst time, and priority (where needed).

Delete rows with a single click.​

📊 Animated Gantt charts:

Color-coded process blocks.

Idle time clearly highlighted.

Hover effects for better focus.​

📉 Auto-calculated metrics:

Turnaround Time (TAT)

Waiting Time (WT)

Response Time (RT)

Beautiful metric cards showing average TAT, WT, RT.​

🎨 Modern responsive UI:

Gradient hero header.

Card-based layout.

Works smoothly on laptops, tabs, and mobiles.​

🧠 Tech Stack
🧩 HTML5 – structure and content of all sections and algorithm tabs.​

🎨 CSS3 – theming, gradients, responsive grid, hover animations, and cards.​

🧮 JavaScript (Vanilla) – algorithm logic, DOM manipulation, Gantt chart rendering, and metrics calculation.​

🧾 Algorithms Inside
Each algorithm computes:

Completion time

Turnaround time (TAT)

Waiting time (WT)

Response time (RT)
and generates both a Gantt chart and a detailed result table.​

Implemented:

⏱️ FCFS:

Non-preemptive; processes execute in order of arrival.​

📏 SJF (Non-preemptive):

Picks the process with the smallest burst time among arrived ones.​

⚡ SRTF:

Preemptive version of SJF using remaining burst time at each time unit.​

🔄 Round Robin:

Time-sharing with configurable time quantum and a ready queue.​

🎯 Priority (Non-preemptive):

Chooses the process with the highest priority (smaller number = higher priority).​

🚀 Getting Started
Clone or download this repository.

Open index-os.html directly in any modern browser (Chrome, Edge, Firefox, etc.).​

Click on an algorithm tab: FCFS, SJF, SRTF, RR, or Priority.​

Enter:

Number of processes.

Arrival time, burst time, and priority (where needed).

Time quantum for Round Robin.​

Hit “Calculate & Visualize”:

Gantt chart appears.

Metric cards show avg TAT, WT, RT.

Process table shows all computed values.​

Use “Reset” to clear and generate a fresh table anytime.​

No server, no frameworks – just open and run. ⚡

📁 Project Structure
index-os.html – Main UI, navigation tabs, sections for each algorithm, footer, and script includes.​

style.css – Global theme, gradients, layout grids, Gantt chart styling, buttons, result cards, and responsive tweaks.​

script.js – All logic:

Generate process tables.

Implement FCFS, SJF, SRTF, RR, and Priority scheduling.

Render Gantt charts and metrics.

Handle navigation and delete-row actions.​

🎓 Perfect For
College OS mini projects and lab demos.

Teachers explaining scheduling visually in class.

Students practicing problems and instantly checking their logic with visual feedback.​

🙌 Credits
Created with ❤️ by:

Suvojit

Pushpender

CS443 Operating Systems Project (2025).
