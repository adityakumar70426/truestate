# Backend – TruEstate Retail Sales Management System

## Tech Stack
- Node.js
- Express
- MongoDB + Mongoose

## Environment Variables
Create a `.env` file inside `backend/` with:

### For Local MongoDB:
```bash
MONGODB_URI=mongodb://127.0.0.1:27017/truestate
PORT=4000
```

### For Remote MongoDB (MongoDB Atlas):
```bash
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/truestate?retryWrites=true&w=majority
PORT=4000
```

**Note:** If `MONGODB_URI` is not set, it defaults to local MongoDB (`mongodb://127.0.0.1:27017/truestate`) for development convenience.

## Run

```bash
cd backend
npm install
npm run dev
```
