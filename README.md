# Portfolio Builder

This is a dynamic, client-side portfolio builder application built with Next.js 15 and Tailwind CSS. It allows users to create, edit, and preview a professional portfolio, which is then persisted in the browser's local storage.

<!-- ![Portfolio Builder Preview](https://i.imgur.com/rG7iXyL.png) -->

## Features

- **Dynamic Editing**: A user-friendly form to edit profile information, work experiences, and images.
- **Live Preview**: A full-screen modal provides an instant preview of the portfolio as it's being edited.
- **Client-Side Persistence**: Uses Zustand and `localStorage` to save the user's portfolio data directly in their browser.
- **Form Validation**: Real-time feedback on required fields and image uploads to guide the user.
- **Custom Notifications**: Non-blocking toast notifications for success and error messages.
- **Image Handling**: Supports image uploads with previews and client-side compression to prevent storage errors.

---

## 🚀 Running the Website

To run this project locally, you will need to have Node.js and npm (or yarn/pnpm) installed.

### 1. Clone the Repository

First, clone the project repository to your local machine.

```bash
git clone https://github.com/itsDevJokers/portfolio-builder.git
cd portfolio-builder
```

### 2. Install Dependencies

Install all the required packages using npm.

```bash
npm install
```

### 3. Run the Development Server

Start the Next.js development server.

```bash
npm run dev
```

The application will now be running and accessible at http://localhost:3000.

---

## 🗂️ Data Schema

The application's state is managed by Zustand and persisted in localStorage under the key portfolio-storage. The data follows the structure defined in src/types/portfolio.ts.

The main state object has the following shape:

```
{
  // The user's main profile information.
  "profile": {
    "name": "string",
    "title": "string",
    "description": "string"
  },

  // An array of work experience items.
  "portfolios": [
    {
      "id": "number", // Unique identifier, typically a timestamp
      "position": "string",
      "company": "string",
      "startDate": "string", // Format: "YYYY-MM"
      "endDate": "string",   // Format: "YYYY-MM"
      "description": "string"
    }
  ],

  // Holds the Base64 encoded strings for the saved images.
  "images": {
    "background": "string | null",
    "profile": "string | null"
  }
}
```

---

## 🏗️ Architectural Changes & Reasoning

Several key improvements were made to the initial design to enhance user experience, reliability, and maintainability.

### 1. State Management: localStorage -> Zustand

- Change: Instead of manipulating localStorage and the DOM directly with vanilla JavaScript, the application's state is managed by Zustand, a modern and lightweight state management library.
- Reason: Zustand provides a centralized, predictable "single source of truth" for the portfolio data. This simplifies component logic, prevents state synchronization bugs, and makes the application much easier to debug and scale. The persist middleware handles all localStorage interactions automatically.

### 2. Preview Functionality: New Tab -> Full-Screen Modal

- Change: The initial plan to open the preview in a new browser tab was replaced with a full-screen modal that overlays the edit page.
- Reason: Opening a new tab after an async operation (like image compression) is often blocked by browser popup blockers, leading to a frustrating and unreliable user experience. A modal is instantaneous, completely avoids popup blockers, and simplifies the code by removing the need for sessionStorage and BroadcastChannel for cross-tab communication.

### 3. Custom Toast Notification

- Change: Added custom, non-blocking toast-style notification components for success and error messages.
- Reason: Custom notifications provide a modern, professional user experience by delivering feedback without interrupting the user's workflow.

### 4. Validation Feedback

- Change: A ValidationStatus component was added to the edit page, showing a real-time checklist of what the user needs to complete before saving.
- Reason: The original design did not provide clear feedback on why the "Save" button might be disabled. This component guides the user by explicitly stating which requirements (e.g., "Upload Profile Image," "Fill Required Fields") are met, improving usability.

### 5. Image Handling & Storage

- Change: Added client-side image compression using browser-image-compression before saving images to the Zustand store.
- Reason: High-resolution images, when converted to Base64, can easily exceed the ~3MB localStorage quota. Compressing images before saving prevents "quota exceeded" errors and ensures the application remains functional even with large image files.
