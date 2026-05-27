# Caravio — Luxury Car Rental Platform

Caravio is a full-stack car rental web application where users can browse premium vehicles, check availability, and book cars for specific dates. Car owners can list their vehicles, manage bookings, and track revenue through a dedicated dashboard.

---

## Features

**For Users**
- Browse and search available cars by brand, model, category, or transmission
- Check car availability by location and date range
- Book cars with pickup and return dates
- View and manage personal bookings

**For Owners**
- List cars with full specifications and images
- Manage car availability (toggle on/off)
- Approve, confirm, or cancel bookings
- View dashboard with stats — total cars, bookings, monthly revenue

---

## Technologies Used

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI framework |
| React Router DOM | Client-side routing |
| Tailwind CSS v4 | Styling and layout |
| Framer Motion | Animations and transitions |
| Axios | HTTP requests |
| React Hot Toast | Notifications |
| Vite | Build tool and dev server |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | REST API framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| Multer | Image uploads |
| Cloudinary | Image storage |
| bcrypt | Password hashing |

---

## Project Structure

```
caravio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── assets/         # Images, icons, static assets
│   │   ├── components/     # Reusable UI components
│   │   │   └── owner/      # Owner dashboard components
│   │   ├── context/        # React context (AppContext)
│   │   ├── pages/          # Page components
│   │   │   └── owner/      # Owner dashboard pages
│   │   ├── index.css       # Global styles and theme
│   │   └── main.jsx        # App entry point
│   ├── .env                # Frontend environment variables
│   └── package.json
│
└── server/                 # Express backend
    ├── controllers/        # Route logic
    ├── models/             # Mongoose models
    ├── routes/             # API routes
    ├── middleware/         # Auth middleware
    ├── .env                # Backend environment variables
    └── package.json
```

---

## Getting Started

### Prerequisites
Make sure you have these installed:
- [Node.js](https://nodejs.org/) (v18 or above)
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud)
- [Git](https://git-scm.com/)

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/caravio.git
cd caravio
```

### 2. Set up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend server:

```bash
npm run dev
```

The backend runs on `http://localhost:5000`

---

### 3. Set up the Frontend

```bash
cd ../client
npm install
```

Create a `.env` file inside the `client/` folder:

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_CURRENCY=$
```

Start the frontend:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173`

---

