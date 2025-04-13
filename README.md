
# SmartFarm Direct - Local Setup Guide

SmartFarm Direct is a platform connecting farmers and consumers directly, promoting sustainable agriculture and community support.

## Running Locally

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- SQL Database (MySQL, PostgreSQL, or SQLite)

### Setup Steps

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/smartfarm-direct.git
cd smartfarm-direct
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Configure Environment Variables**

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_USE_PRODUCTION_API=true

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=smartfarm
```

4. **Setup Database**

- Create a new database named 'smartfarm' (or use the name you specified in the .env file)
- Run the database migration scripts (located in the `/scripts` directory)

```bash
npm run migrate
# or
yarn migrate
```

5. **Start the Development Server**

```bash
npm run dev
# or
yarn dev
```

6. **Access the Application**

Open your browser and navigate to `http://localhost:3000`

## Admin Access

Use the following credentials to access the admin dashboard:

- **Email:** surajsurve5411@gmail.com
- **Password:** password-suraj

## Directory Structure

```
smartfarm-direct/
├── public/              # Static assets
├── scripts/             # Database migration scripts
├── src/
│   ├── components/      # UI components
│   ├── config/          # Application configuration
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries
│   ├── pages/           # Application pages/routes
│   ├── services/        # Service layer for API communications
│   └── main.tsx         # Application entry point
├── .env                 # Environment variables (create this)
└── package.json         # Project dependencies
```

## Additional Setup Notes

### API Backend

For local development, you'll need to set up a backend API service. You can use:

1. **Express.js API**
   - Create a simple Express server to handle API requests
   - Connect it to your SQL database
   - Implement authentication endpoints

2. **Mock API**
   - For testing purposes, you can set `VITE_USE_PRODUCTION_API=false` to use mock data

### SQL Database Schema

The basic schema includes tables for:

- Users (Customers, Farmers, Admins)
- Products
- Categories
- Orders
- Farms

A full database schema will be provided in the `scripts/schema.sql` file.

## Deployment

For production deployment:

1. Build the application:
```bash
npm run build
# or
yarn build
```

2. Deploy the built files (from the `dist` directory) to your hosting service

3. Ensure your API backend is properly deployed and accessible

## Contact

For questions or support, contact:
- Email: support@smartfarmdirect.com
