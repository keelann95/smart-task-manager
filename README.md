# Smart Task Manager

A modern, AI-powered task management application built with Node.js, Express, MongoDB, and EJS, designed to help users organize, prioritize, and track tasks efficiently.

![Smart Task Manager Screenshot](/assets/screenshot.png)

---

## Table of Contents

- [Smart Task Manager](#smart-task-manager)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
    - [Task Management](#task-management)
    - [Subtasks](#subtasks)
    - [AI-Powered Prioritization](#ai-powered-prioritization)
    - [Task Status](#task-status)
    - [Urgency Score](#urgency-score)
    - [Responsive UI](#responsive-ui)
    - [CRUD Operations](#crud-operations)
  - [Technologies Used](#technologies-used)
  - [Project Architecture](#project-architecture)
  - [Installation \& Setup](#installation--setup)
    - [1. Clone the repository](#1-clone-the-repository)
    - [2. Install dependencies](#2-install-dependencies)
    - [3. Set up environment variables](#3-set-up-environment-variables)
    - [4. Start the server](#4-start-the-server)
    - [5. Open in browser](#5-open-in-browser)
  - [Database Schema](#database-schema)
    - [Task Model (Task.js)](#task-model-taskjs)
  - [Routes \& API Endpoints](#routes--api-endpoints)
  - [Front-End Pages](#front-end-pages)
    - [1. Dashboard](#1-dashboard)
    - [2. Add Task](#2-add-task)
    - [3. Task Details](#3-task-details)
    - [4. Edit Task](#4-edit-task)
    - [5. Error Page](#5-error-page)
  - [Usage](#usage)
  - [Future Enhancements](#future-enhancements)
  - [Credits](#credits)
  - [License](#license)

---

## Project Overview

The **Smart Task Manager** allows users to create, update, view, and delete tasks, while also providing AI-driven task prioritization suggestions. Users can manage subtasks, track progress, view urgency scores, and categorize tasks based on priority or type.

It is ideal for students, professionals, or anyone looking to improve personal or team productivity.

---

## Features

### Task Management
- Create, view, edit, and delete tasks
- Add task title, description, due date, category, priority, and estimated time

### Subtasks
- Add multiple subtasks for detailed task tracking
- Mark subtasks as completed
- View overall progress with a progress bar

### AI-Powered Prioritization
- Automatic task priority suggestion based on urgency, due date, and complexity
- AI reasoning displayed for better task management

### Task Status
- Track task status: pending, in-progress, completed
- Update task status from the task detail page

### Urgency Score
- AI-calculated score (0–100) showing urgency of each task

### Responsive UI
- Dashboard, task details, and edit pages are fully responsive
- Easy-to-read badges, buttons, and cards

### CRUD Operations
- RESTful routes for managing tasks
- Full backend using Express and MongoDB

---

## Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** EJS templates, HTML, CSS, JavaScript
- **Database:** MongoDB, Mongoose ORM
- **Version Control:** Git & GitHub
- **Utilities:** Method-Override (for PUT & DELETE forms), Body-Parser

---

## Project Architecture

```
smart-task-manager/
│
├── node_modules/
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── routes/
│   └── taskRoutes.js
├── views/
│   ├── add-task.ejs
│   ├── dashboard.ejs
│   ├── edit-task.ejs
│   ├── task-detail.ejs
│   └── error.ejs
├── models/
│   └── Task.js
├── app.js
├── package.json
└── README.md
```

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/keelann95/smart-task-manager
cd smart-task-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file:

```ini
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

### 4. Start the server

```bash
npm run dev
```

### 5. Open in browser

Visit: `http://localhost:3000`

---

## Database Schema

### Task Model (Task.js)

```javascript
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  priority: { type: String, enum: ['Low','Medium','High','Urgent'], default: 'Low' },
  category: String,
  subtasks: [String],
  estimatedTime: String,
  urgencyScore: Number,
  ai_reason: String,
  status: { type: String, enum: ['pending','in_progress','completed'], default: 'pending' },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
```

---

## Routes & API Endpoints

| Route | Method | Description |
|-------|--------|-------------|
| `/tasks` | GET | View all tasks (Dashboard) |
| `/tasks/new` | GET | Render Add Task page |
| `/tasks` | POST | Create a new task |
| `/tasks/:id` | GET | View task details |
| `/tasks/:id/edit` | GET | Render edit task page |
| `/tasks/:id` | PUT | Update task |
| `/tasks/:id` | DELETE | Delete task |
| `/tasks/:id/complete` | POST | Mark task as completed |
| `/tasks/:id/status` | POST | Update task status |

---

## Front-End Pages

### 1. Dashboard
- Displays all tasks with badges for priority and status
- AI reason and urgency score for each task
- Buttons: View Details, Edit, Delete

### 2. Add Task
- Form to add new task
- Input fields: title, description, due date, priority, category, estimated time, subtasks

### 3. Task Details
- Displays full task details, subtasks with progress bar
- AI reasoning & insights
- Update status buttons
- Edit & Delete buttons

### 4. Edit Task
- Pre-filled form with current task data
- Update title, description, due date, priority, category, estimated time, subtasks
- Save changes with PUT request

### 5. Error Page
- Friendly message when task not found or server error

---

## Usage

1. Navigate to **Dashboard** to see all tasks
2. Click **+ New Task** to create a task
3. Click **View Details** to see task info and subtasks
4. Update task status using **Pending**, **In Progress**, or **Mark Complete** buttons
5. Edit or delete tasks using **✏️ Edit Task** or **🗑️ Delete Task**
6. Track overall progress using subtask completion and urgency scores

---

## Future Enhancements

- User authentication & multi-user support
- Drag-and-drop subtasks
- Notifications for upcoming due dates
- AI suggestions for task splitting or time allocation
- Dark mode for better UX

---

## Credits

Built by  __Stephen Mwaniki__

Inspired by modern productivity tools

Uses Node.js, Express, MongoDB, EJS

---

## License

This project is open source and available under the [MIT License](LICENSE).