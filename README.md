# Role-Based Access Control (RBAC) Login System

A full-stack **Role-Based Access Control (RBAC) Login System** built using **FastAPI**, **React**, **JWT Authentication**, **SQLAlchemy**, and **PostgreSQL**. The system provides secure authentication, role-based authorization, and separate dashboards for administrators and students.

---

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected API Endpoints

### User Management
- View Users
- Add User
- Edit User
- Delete User
- Assign Roles

### Role Management
- Create Role
- View Roles
- Edit Role
- Delete Role

### Role-Based Access Control
- Admin-only protected routes
- Role verification using JWT
- Separate Admin and Student dashboards

### Frontend
- Responsive UI using React and Tailwind CSS
- Modern Admin Dashboard
- Student Dashboard
- Custom confirmation dialogs
- Clean and user-friendly interface

---

## Technologies Used

### Backend
- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT (python-jose)
- Passlib (bcrypt)
- Pydantic

### Frontend
- React
- React Router DOM
- Axios
- Tailwind CSS
- Vite

---

## Project Structure

```text
RBAC-Login-System/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── routers/
│   ├── auth.py
│   ├── users.py
│   └── roles.py
│
├── auth.py
├── database.py
├── dependencies.py
├── models.py
├── schemas.py
├── main.py
├── requirements.txt
├── .env
└── README.md
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd RBAC-Login-System
```

---

## Backend Setup

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

### Windows

```bash
venv\Scripts\activate
```

### Linux/macOS

```bash
source venv/bin/activate
```

Install the required packages:

```bash
pip install -r requirements.txt
```

Create a `.env` file and configure your PostgreSQL database and JWT settings.

Run the backend:

```bash
uvicorn main:app --reload
```

The backend will run at:

```
http://127.0.0.1:8000
```

Swagger API Documentation:

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will run at:

```
http://localhost:5173
```

---

## API Endpoints

### Authentication

| Method | Endpoint |
|--------|----------|
| POST | `/auth/register` |
| POST | `/auth/login` |

### Users

| Method | Endpoint |
|--------|----------|
| GET | `/users` |
| GET | `/users/{id}` |
| PUT | `/users/{id}` |
| DELETE | `/users/{id}` |
| PUT | `/users/{user_id}/role` |

### Roles

| Method | Endpoint |
|--------|----------|
| POST | `/roles` |
| GET | `/roles` |
| GET | `/roles/{id}` |
| PUT | `/roles/{id}` |
| DELETE | `/roles/{id}` |
| GET | `/roles/admin` |

---

## Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Role-Based Authorization
- Protected API Endpoints
- Secure Password Verification
- SQLAlchemy ORM for database operations

---

## Testing

The application was tested using:

- Swagger UI

---

## Future Improvements

- Refresh Tokens
- Forgot Password
- Password Reset via Email
- User Profile Management
- Audit Logging
- Fine-Grained Permissions

---

## Authors

- **Noor ul Ain**
- **Nawal Abid**

---

## License

This project was developed for educational purposes.