# User Management System

This is a full-stack user management system, built with the following technologies:

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: Vue.js, Vue Router, Pinia
- **Other**: Nodemailer for email verification and password reset functionality
- **Package Manager**: pnpm

## Table of Contents

1. [Demo](#demo)
2. [Project Setup](#project-setup)
3. [Backend Environment Variables](#backend-environment-variables)
4. [Frontend Environment Variables](#frontend-environment-variables)
5. [Running the Development Servers](#running-the-development-servers)
6. [Production Setup](#production-setup)
7. [Backend API Routes](#backend-api-routes)

---

## Demo

[Click here For Demo](https://mern-user-management-x79a.vercel.app/)

```bash
Admin: mailforward347@gmail.com
Pass: 123456
```

## Project Setup

This project is divided into two parts: the backend and the frontend. The backend is located in the `backend` folder and the frontend in the `frontend` folder.

### Prerequisites

- Install **pnpm** (if you haven't already):
  ```bash
  npm install -g pnpm
  ```

---

## Backend Environment Variables

The following environment variables need to be set for the backend:

- `PORT`: The port the backend will run on (default: `5000`).
- `MONGO_URI`: MongoDB connection string.
- `EMAIL_USER`: The email address used for sending emails (Nodemailer).
- `EMAIL_PASS`: The password for the email account.
- `EMAIL_FROM`: The email address from which emails will be sent.
- `FRONTEND_URI`: The URI of the frontend (default: `http://localhost:5173`).
- `JWT_SECRET`: A secret key for JWT token encryption.

Example `.env` for the backend:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/myDatabase?retryWrites=true&w=majority
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
EMAIL_FROM=example@site.com
FRONTEND_URI=http://localhost:5173
JWT_SECRET=your-jwt-secret
```

---

## Frontend Environment Variables

The following environment variable is needed for the frontend:

- `VITE_API_URL`: The backend API URL (default: `http://localhost:5000`).

Example `.env` for the frontend:

```env
VITE_API_URL=http://localhost:5000
```

---

## Running the Development Servers

1. **Backend**:

   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     pnpm install
     ```
   - Start the development server:
     ```bash
     pnpm dev
     ```

2. **Frontend**:
   - Navigate to the `frontend` folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     pnpm install
     ```
   - Start the frontend development server:
     ```bash
     pnpm dev
     ```

---

## Production Setup

1. **Frontend**:

   - Build the frontend for production:
     ```bash
     cd frontend
     pnpm build
     ```

2. **Backend**:
   - Start the backend for production:
     ```bash
     cd backend
     pnpm start
     ```

---

## Backend API Routes

Here are the available routes in the backend:

### 1. User Authentication & Management

- **POST** `/api/users/signup`: Sign up a new user.
- **POST** `/api/users/signin`: Sign in an existing user.
- **POST** `/api/users/forget-password`: Request a password reset.
- **POST** `/api/users/reset-password`: Reset the password using a token.
- **POST** `/api/users/verify-token`: Verify the reset token.
- **GET** `/api/users/me`: Get information of the current authenticated user.
- **GET** `/api/users`: Get all users (admin only).
- **GET** `/api/users/:id`: Get a user by ID (admin only).
- **PUT** `/api/users/:id`: Update a user's information (admin only).
- **DELETE** `/api/users/:id`: Delete a user (admin only).

### 2. Middleware

- **authMiddleware**: Ensures the user is authenticated.
- **adminMiddleware**: Ensures the user has an admin role.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
