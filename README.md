# Doctor Appointment

**Doctor Appointment management system**. Patients can easily book, view, and cancel appointments, while doctors can efficiently manage their schedules by updating appointment statuses (Pending, Completed, Cancelled) in real-time. The interface offers advanced features such as filters, pagination, and a calendar selector, along with confirmation dialogs to prevent accidental actions. Instant toast notifications provide clear feedback for successful or failed operations, ensuring a seamless and user-friendly experience.


* **Live Demo**: [https://medicare-doctor-appointments.netlify.app/](https://medicare-doctor-appointments.netlify.app/)
* **Repo**: [https://github.com/istiak19/Doctor-Appointment-Management-System](https://github.com/istiak19/Doctor-Appointment-Management-System)

---

## Features

* 🔑 **Authentication** for patients and doctors
* 📅 **Book, view, and cancel** appointments
* 👩‍⚕️ **Search doctors** by name or specialization
* ✅ **Doctors update status** (Pending → Completed / Cancelled)
* 🎛️ **Filters, pagination, and calendar selector** for easy navigation
* ⚡ **Confirmation dialogs** to avoid accidental actions
* 🔔 **Instant toast notifications** for success/error feedback
* 📱 Fully responsive design

---

## Tech Stack

* **React** `^19.1.1`
* **React Router** `^7.8.2`
* **Redux Toolkit** + **React Redux**
* **React Hook Form** + **Zod** (form validation)
* **Tailwind CSS v4** + Radix UI components
* **axios** (API requests)
* **react-toastify** (notifications)
* **date-fns** + **react-day-picker** (date handling)
* **lucide-react** (icons)
* Built with **Vite** + **TypeScript**

---

## Getting Started

### Prerequisites

* Node.js ≥ 18
* npm / yarn / pnpm

### Installation

```bash
# clone repo
git clone https://github.com/istiak19/Doctor-Appointment-Management-System.git
cd Doctor-Appointment-Management-System

# install dependencies
npm install

# run dev server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## Configuration

Create a `.env.local` file in the project root:

```bash
VITE_API_BASE_URL=https://appointment-manager-node.onrender.com/api/v1
VITE_APP_NAME=doctor-appointment
```

---

## Scripts

* `npm run dev` – Start Vite dev server
* `npm run build` – Build with TypeScript + Vite
* `npm run preview` – Preview production build
* `npm run lint` – Run ESLint

---

## Project Structure

```
DOCTOR-APPOINTMENT/
├── dist/
├── node_modules/
├── public/
│   ├── _redirects
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   ├── modules/
│   │   └── ui/
│   │       ├── app-sidebar.tsx
│   │       ├── search-form.tsx
│   │       └── version-switcher.tsx
│   ├── config/
│   ├── constants/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── redux/
│   ├── routes/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── vite-env.d.ts
├── .env
└── .gitignore
```

**Explanation of main folders:**

* `dist/` – Production build output.
* `node_modules/` – Installed dependencies.
* `public/` – Static assets like images or redirect config.
* `src/` – Source code:

  * `assets/` – Images, icons, fonts, etc.
  * `components/` – Reusable UI components:

    * `layout/` – Layout-specific components (header, sidebar, etc.).
    * `modules/` – Feature-specific components (appointments, dashboard, etc.).
    * `ui/` – Generic UI elements like buttons, forms, or switches.
  * `config/` – App configuration files.
  * `constants/` – Constant values like enums or static data.
  * `hooks/` – Custom React hooks.
  * `lib/` – Utility libraries or helpers.
  * `pages/` – Route-based pages.
  * `redux/` – Redux slices and API services.
  * `routes/` – App routing logic.
  * `types/` – TypeScript types and interfaces.
  * `utils/` – General utility functions.
  * `App.tsx`, `main.tsx` – Entry points for the React app.
  * `index.css` – Global styles.

---

## API Integration

This frontend connects to the backend API:

* **Base URL**: `https://appointment-manager-node.onrender.com/api/v1`
* Uses **axios** with an interceptor for JWT authentication.
* Endpoints include:

  * `/auth/login`
  * `/auth/register/patient`
  * `/auth/register/doctor`
  * `/doctors`
  * `/appointments` (create/list/update status)

---

## State Management

* **Redux Toolkit** stores:

  * `auth` → JWT, user, role (DOCTOR / PATIENT)
  * `doctors` → list, filters, pagination
  * `appointments` → patient & doctor views
* **Async thunks** handle API requests.

---

## Styling

* **Tailwind CSS v4** for utilities
* **clsx** + **tailwind-merge** for class composition
* **Radix UI** for accessible components (dialogs, selects, tooltips, etc.)
* **lucide-react** icons

## Accounts

Use these demo accounts to test the system:

| Role    | Email                    | Password   |
| ------- | ------------------------ | ---------- |
| Patient | `istiak15-14128@diu.edu.bd` | `Abcd@123` |
| Doctor  | `istiakanik79@gmail.com`  | `Abcd@123` |

---

## Contributors

* **@istiak19** – Maintainer