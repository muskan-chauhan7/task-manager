document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('add-task-form');
    const tasksList = document.getElementById('tasks-list');
    const socket = io();

    // Fetch initial data
    fetchTasks();
    fetchAnalytics();

    // Handle form submission
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskData = {
            title: document.getElementById('task-title').value,
            description: document.getElementById('task-desc').value,
            priority: document.getElementById('task-priority').value,
            status: 'Pending'
        };

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });
            if (response.ok) {
                taskForm.reset();
                // We don't need to manually refresh, WebSocket will handle it
            }
        } catch (err) {
            console.error('Error adding task:', err);
        }
    });

    // WebSocket Listeners
    socket.on('task_update', (data) => {
        console.log('Task update received:', data);
        fetchTasks();
        fetchAnalytics();
    });

    async function fetchTasks() {
        try {
            const response = await fetch('/api/tasks');
            const tasks = await response.json();
            renderTasks(tasks);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        }
    }

    async function fetchAnalytics() {
        try {
            const response = await fetch('/api/analytics');
            const stats = await response.json();
            updateAnalyticsUI(stats);
        } catch (err) {
            console.error('Error fetching analytics:', err);
        }
    }

    function renderTasks(tasks) {
        tasksList.innerHTML = '';
        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'task-card';
            taskCard.innerHTML = `
                <div class="task-header">
                    <span class="task-title">${task.title}</span>
                    <span class="priority-badge priority-${task.priority}">${task.priority}</span>
                </div>
                <div class="task-desc">${task.description || 'No description'}</div>
                <div class="task-footer">
                    <span class="status-toggle status-${task.status}" onclick="toggleStatus(${task.id}, '${task.status}')">
                        ${task.status}
                    </span>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            tasksList.appendChild(taskCard);
        });
    }

    function updateAnalyticsUI(stats) {
        document.getElementById('total-tasks').textContent = stats.total_tasks;
        document.getElementById('completed-tasks').textContent = stats.completed_tasks;
        document.getElementById('pending-tasks').textContent = stats.pending_tasks;
        document.getElementById('completion-percent').textContent = `${stats.completion_percentage}%`;
    }
});

async function toggleStatus(taskId, currentStatus) {
    const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
    try {
        await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
    } catch (err) {
        console.error('Error updating status:', err);
    }
}

async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    try {
        await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
        });
    } catch (err) {
        console.error('Error deleting task:', err);
    }
}
