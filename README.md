# Task Management Application

This application is designed to help users easily manage their tasks, organize them into projects or categories, and stay on top of their responsibilities. It aims to provide a seamless experience for task creation, organization, and retrieval.

## **Setup Instructions**

Follow these steps to set up the application:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Ron-Itzhak/task-management
   cd task-management
   ```

2. **Install**:
   You can run the development server with docker:

   ```bash
   docker-compose up --build
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the UI.
   Open [http://localhost:9000](http://localhost:9000) with your browser to see the API.

   the app is initiating the DB with script mongo-init.js
   and database is MongoDB with indexing.
   API - Nestjs
   UI - Next.js

---

## **Implemented Features**

### **Core Features**

1. **Add New Tasks Easily**:

   - Users can quickly add new tasks with minimal input and expand to add optional details like priority, category, and due date.

2. **Organize Tasks into Projects or Categories**:

   - Tasks can be grouped into categories for better organization.
   - Categories are displayed with the number of tasks they contain.

3. **Mark Tasks as Complete**:

   - Tasks can be marked as complete.

4. **Find Tasks When Needed**:
   - Search and filter tasks by title, category, or completion status to find specific tasks efficiently.
   - Added complex filters for searching tasks by priority, status, or due date range.

---

## **Bonus Features**

- Real-time task updates using server and client-side hooks.
- Responsive design for a seamless experience across devices.

---

## **Future Improvements**

1. **Work-Life Balance Mode**:

   - Introduce two main categories: `Work` and `Personal`.
   - Toggle visibility of work-related tasks during off-hours or with a single button press.

2. **User Sharing**:

   - Add multi-user support to share and collaborate on tasks with other users.
   - Introduce role-based permissions for task editing and completion.

3. **Notification Service**:

   - Build a notification service to inform users when new tasks are added or updated, or due date is close using event pipeline like **KAFKA**.

4. **Cross-Device Synchronization**:

   - Implement caching with **Redis** to keep task data fresh across multiple sessions and devices.
   - Allow users to retrieve their latest searches and tasks.

5. **Advanced Search and Filtering**:

   - Support for natural language queries like "Show tasks due tomorrow."

6. **Task Subcategories**:

   - Enable subcategories for better task organization within projects.

7. **AI Adding Tasks**:
   - Support for natural language adding tasks like "change bed sheets due this saturday"

---

## **Description of Additional Features**

1. **Task Priority Management**:

   - Tasks can be assigned a priority (`Low`, `Medium`, `High`) to help users focus on important items first.

2. **Category Badges**:

   - Each category displays a badge with the count of tasks assigned to it for quick reference.

3. **Real-Time Updates**:
   - The application automatically updates the task and category list when changes are made, ensuring users always see the latest data.

---
