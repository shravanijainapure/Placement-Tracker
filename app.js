// --- 1. IndexedDB Setup (Offline Database) ---
let db;
const dbRequest = indexedDB.open("PlacementTrackerDB", 1);

dbRequest.onupgradeneeded = (e) => {
    db = e.target.result;
    if (!db.objectStoreNames.contains("tasks")) {
        db.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
    }
};

dbRequest.onsuccess = (e) => {
    db = e.target.result;
    displayTasks();
};

dbRequest.onerror = (e) => console.error("IndexedDB Error:", e.target.error);

// --- 2. DOM Elements ---
const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskCategory = document.getElementById("task-category");
const tasksContainer = document.getElementById("tasks-container");
const taskCount = document.getElementById("task-count");
const networkStatus = document.getElementById("network-status");

// --- 3. CRUD Database Operations ---
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTask = {
        title: taskTitle.value,
        category: taskCategory.value,
        status: "In Progress",
        date: new Date().toLocaleDateString()
    };

    const transaction = db.transaction(["tasks"], "readwrite");
    const store = transaction.objectStore("tasks");
    store.add(newTask);

    transaction.oncomplete = () => {
        taskForm.reset();
        displayTasks();
    };
});

function displayTasks() {
    const transaction = db.transaction(["tasks"], "readonly");
    const store = transaction.objectStore("tasks");
    const request = store.getAll();

    request.onsuccess = () => {
        const tasks = request.result;
        taskCount.textContent = `${tasks.length} items tracked`;

        if (tasks.length === 0) {
            tasksContainer.innerHTML = `<p class="text-gray-400 text-sm text-center py-6">No tasks added yet. Start logging your progress!</p>`;
            return;
        }

        tasksContainer.innerHTML = tasks.map(task => `
            <div class="flex justify-between items-center p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition">
                <div>
                    <h3 class="font-semibold text-gray-800 text-sm sm:text-base">${task.title}</h3>
                    <div class="flex gap-2 items-center mt-1">
                        <span class="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-100 text-indigo-700">${task.category}</span>
                        <span class="text-xs text-gray-400">${task.date}</span>
                    </div>
                </div>
                <button onclick="deleteTask(${task.id})" class="text-xs text-red-500 hover:text-red-700 font-medium px-3 py-1 rounded-md border border-red-200 hover:bg-red-50 transition">
                    Remove
                </button>
            </div>
        `).join("");
    };
}

window.deleteTask = (id) => {
    const transaction = db.transaction(["tasks"], "readwrite");
    const store = transaction.objectStore("tasks");
    store.delete(id);
    transaction.oncomplete = () => displayTasks();
};

// --- 4. Live Network Connection Listeners ---
window.addEventListener('online', updateNetworkStatus);
window.addEventListener('offline', updateNetworkStatus);

function updateNetworkStatus() {
    if (navigator.onLine) {
        networkStatus.textContent = "Online";
        networkStatus.className = "px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white";
    } else {
        networkStatus.textContent = "Offline Mode";
        networkStatus.className = "px-3 py-1 rounded-full text-xs font-semibold bg-orange-500 text-white";
    }
}
updateNetworkStatus();

// --- 5. Service Worker Registration ---
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
            .then(reg => console.log("Service Worker Active ✅", reg.scope))
            .catch(err => console.error("Service Worker Failed ❌", err));
    });
}