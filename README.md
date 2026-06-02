# 🎓 Offline-First Placement Prep Tracker (PWA)

A high-performance, **Progressive Web Application (PWA)** engineered to help students log and track data structures, algorithms, aptitude, and interview preparation tasks seamlessly—even with zero network connectivity.

Built following my **Progressive Web Applications** certification from **Infosys Springboard** to turn theoretical service worker lifecycles into a practical solution.

## 🚀 Key Technical Features
* **Offline-First CRUD Operations:** Integrated browser-native **IndexedDB** for structured client-side storage, ensuring your progress survives network dead-zones and page refreshes.
* **Instant UI Shell Architecture:** Formulated a custom Service Worker script (`sw.js`) that caches core UI assets and Tailwind CSS dependencies via a cache-first strategy.
* **Hardware API Notification Integration:** Utilizes the **Service Worker Registration Notifications API** to trigger native operating system alert badges completely offline, reading metrics directly from client-side transactions.
* **Installable Native Experience:** Fully configured `manifest.json` allowing the web app to be added directly to mobile/desktop home screens with a standalone native UI layout.

## 🛠️ Built With
* **Frontend:** HTML5, Tailwind CSS
* **Core Logic:** Vanilla JavaScript (ES6+)
* **PWA Engine:** Service Workers API, Cache Storage API
* **Database:** Native Client-Side IndexedDB API

## 💻 How to Run Locally

Because Service Workers require a secure local origin layout to execute safely, you cannot run this app by simply double-clicking the `index.html` file. 

1. Clone this repository:
```bash
   git clone [https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git](https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git)
