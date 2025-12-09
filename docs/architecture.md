# Architecture – TruEstate Retail Sales Management System

## Backend Architecture
- **Framework**: Node.js with Express
- **Database**: MongoDB using Mongoose ODM
- **Structure**:
  - `src/index.js`: Express app and MongoDB connection
  - `src/routes/`: API route definitions
  - `src/controllers/`: HTTP request handling and validation
  - `src/services/`: Business logic, search/filter/sort/pagination orchestration
  - `src/models/`: Mongoose models (`Sale`)
  - `src/utils/`: Query builder helpers for filters and sorting

All search, filter, sort, and pagination logic is implemented via a single `/api/sales` GET endpoint with query parameters.

## Frontend Architecture
- **Framework**: React (Vite)
- **State Management**: Local component state + custom hook
- **Structure**:
  - `src/App.jsx`: Page layout and high-level state
  - `src/components/`: UI components (SearchBar, FilterPanel, SortDropdown, Pagination, TransactionsTable)
  - `src/hooks/useSalesQuery.js`: Data fetching and loading/error state
  - `src/services/api.js`: API abstraction for the sales endpoint
  - `src/styles/global.css`: Global layout and component styling

The UI follows the required structure:
- Search bar (top of left sidebar)
- Filter panel (below search)
- Sorting dropdown (top toolbar on main content)
- Transactions table (center)
- Pagination controls (bottom-right)

## Data Flow
1. User interacts with Search / Filters / Sort / Pagination on the frontend.
2. `App` updates a `query` state object.
3. `useSalesQuery` converts this query into URL parameters and calls `/api/sales`.
4. Backend builds MongoDB filters and sort specification using `buildFilters` and `buildSort`.
5. Backend queries the `Sale` collection with pagination (`page`, `limit`).
6. Response returns `{ items, total, page, limit, totalPages }`.
7. Frontend renders the table and pagination from the response.

## Folder Structure

```bash
root/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── salesController.js
│   │   ├── services/
│   │   │   └── salesService.js
│   │   ├── utils/
│   │   │   └── buildQuery.js
│   │   ├── routes/
│   │   │   └── salesRoutes.js
│   │   ├── models/
│   │   │   └── Sale.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/   (unused placeholder; can host static assets)
│   ├── package.json
│   └── README.md
│
├── docs/
│   └── architecture.md
├── README.md
└── package.json
```

## Module Responsibilities
- **Sale model**: Represents a single retail transaction including customer, product, sales, and operational fields.
- **Query utils**: Encapsulate filter and sort construction from raw query parameters, handling edge cases like invalid ranges.
- **Service layer**: Coordinates MongoDB query, pagination, and combines the result into a consistent response payload.
- **Controller**: Adapts HTTP requests into service calls and returns JSON responses with appropriate status codes.
- **React components**: Pure UI focused on layout and controlled inputs.
- **Hook + API service**: Isolate data fetching, making UI components easier to test and maintain.
