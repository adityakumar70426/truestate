# TruEstate – Retail Sales Management System

## 1. Overview

The TruEstate Retail Sales Management System is a full-stack web application designed to manage and analyze retail sales transactions. It provides comprehensive search, filtering, sorting, and pagination capabilities on a large-scale sales dataset. The system enables users to efficiently query and navigate through sales data with real-time filtering and sorting options, making it easy to analyze customer behavior, product performance, and sales trends across different regions and time periods.

## 2. Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Additional Libraries**: 
  - `csv-parser` for data import
  - `cors` for cross-origin resource sharing
  - `dotenv` for environment variable management

### Frontend
- **Framework**: React 18.3
- **Build Tool**: Vite
- **Styling**: CSS3 with modern design system
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Fetch API

## 3. Search Implementation Summary

The search functionality allows users to find sales transactions by customer name or phone number. The implementation uses case-insensitive regex pattern matching on the backend.

**Frontend Implementation:**
- Search input field located in the left sidebar (`SearchBar` component)
- Real-time search as user types
- Search query is managed in the main `App` component state
- Query parameters are sent to the backend via the `useSalesQuery` hook

**Backend Implementation:**
- Search parameter is received via query string (`?search=query`)
- MongoDB regex query with case-insensitive flag (`/query/i`)
- Searches across two fields using `$or` operator:
  - `customerName`: Matches customer names
  - `phoneNumber`: Matches phone numbers
- Integrated with other filters and sorting for combined queries

**Code Location:**
- Frontend: `frontend/src/components/SearchBar.jsx`, `frontend/src/App.jsx`
- Backend: `backend/src/services/salesService.js` (lines 54-58)

## 4. Filter Implementation Summary

The filtering system supports multiple filter criteria that can be combined to narrow down search results. Filters include customer demographics, product information, payment methods, and date ranges.

**Available Filters:**
1. **Customer Region**: Comma-separated list of regions (e.g., "North, South, East")
2. **Gender**: Comma-separated gender values (e.g., "Male, Female")
3. **Age Range**: Minimum and maximum age values
4. **Product Category**: Comma-separated product categories
5. **Tags**: Comma-separated product tags
6. **Payment Method**: Comma-separated payment methods (e.g., "Credit Card, Cash")
7. **Date Range**: Start date and end date for transaction dates

**Frontend Implementation:**
- Filter panel component (`FilterPanel`) in the left sidebar
- Individual input fields for each filter type
- Inline fields for age range (min/max) and date range (from/to)
- Filter values are stored in the main query state object
- Changes trigger automatic API calls to fetch filtered results

**Backend Implementation:**
- All filters are processed in `salesService.js`
- Multiple values are handled using MongoDB `$in` operator for array matching
- Age range uses `$gte` (greater than or equal) and `$lte` (less than or equal) operators
- Date range filters include full day coverage (00:00:00 to 23:59:59)
- Empty filter values are ignored to prevent invalid queries
- All filters are combined using MongoDB's implicit `$and` operator

**Code Location:**
- Frontend: `frontend/src/components/FilterPanel.jsx`
- Backend: `backend/src/services/salesService.js` (lines 60-141)

## 5. Sorting Implementation Summary

The sorting functionality allows users to order results by different fields in ascending or descending order. Multiple sort fields are supported with a default fallback.

**Sortable Fields:**
1. **Date**: Transaction date (default)
2. **Quantity**: Product quantity
3. **Customer Name**: Alphabetical sorting
4. **Final Amount**: Transaction amount

**Frontend Implementation:**
- Sort dropdown component (`SortDropdown`) in the main content toolbar
- Two dropdown menus: "Sort By" (field selection) and "Order" (ascending/descending)
- Sort preferences are stored in the query state
- Changes immediately trigger a new API request with updated sort parameters

**Backend Implementation:**
- Sort parameters received via query string (`sortBy` and `sortOrder`)
- MongoDB sort specification built dynamically based on selected field
- Sort order: `1` for ascending, `-1` for descending
- Default sorting by date (descending) if invalid field is provided
- Sorting is applied after filtering but before pagination

**Code Location:**
- Frontend: `frontend/src/components/SortDropdown.jsx`
- Backend: `backend/src/services/salesService.js` (lines 143-153)

## 6. Pagination Implementation Summary

Pagination divides large result sets into manageable pages, improving performance and user experience when dealing with thousands of records.

**Pagination Features:**
- Configurable page size (default: 10 items per page)
- Page navigation with Previous/Next buttons
- Current page and total pages display
- Disabled state for navigation buttons at boundaries

**Frontend Implementation:**
- Pagination component (`Pagination`) at the bottom of the main content area
- Displays current page number and total pages
- Previous/Next buttons with disabled states
- Page changes update the query state and trigger new API calls
- Automatically resets to page 1 when filters or search change

**Backend Implementation:**
- Pagination parameters: `page` (current page number) and `limit` (items per page)
- Default values: page 1, limit 10
- MongoDB `skip()` and `limit()` methods for efficient pagination
- Total count calculated using `countDocuments()` for accurate page calculation
- Response includes: `items` (current page data), `total` (total records), `page`, `limit`, `totalPages`
- Pagination applied after filtering and sorting

**Code Location:**
- Frontend: `frontend/src/components/Pagination.jsx`, `frontend/src/App.jsx`
- Backend: `backend/src/services/salesService.js` (lines 29-31, 161-170)

## 7. Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start MongoDB:**
   - If using local MongoDB, ensure the service is running on `mongodb://127.0.0.1:27017`
   - If using MongoDB Atlas, update the connection string in `backend/src/index.js`

4. **Seed the database (first time only):**
   ```bash
   npm run seed
   ```
   This will import the sales data from `backend/data/sales.csv` into MongoDB.

5. **Start the backend server:**
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:4000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Accessing the Application

1. Open your browser and navigate to `http://localhost:5173`
2. The application will automatically connect to the backend API
3. Use the search bar, filters, sorting options, and pagination to explore the sales data

### API Endpoint

The main API endpoint is:
```
GET /api/sales
```

Query parameters:
- `search`: Search term for customer name or phone
- `customerRegion`: Comma-separated regions
- `gender`: Comma-separated genders
- `ageMin`: Minimum age
- `ageMax`: Maximum age
- `productCategory`: Comma-separated categories
- `tags`: Comma-separated tags
- `paymentMethod`: Comma-separated payment methods
- `dateFrom`: Start date (YYYY-MM-DD)
- `dateTo`: End date (YYYY-MM-DD)
- `sortBy`: Field to sort by (date, quantity, customerName, finalAmount)
- `sortOrder`: Sort direction (asc, desc)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### Troubleshooting

- **No data showing**: Ensure MongoDB is running and the database has been seeded
- **Connection errors**: Verify backend is running on port 4000
- **CORS errors**: Check that CORS is enabled in the backend (`backend/src/index.js`)
- **Empty results**: Verify the database contains data by checking MongoDB directly
