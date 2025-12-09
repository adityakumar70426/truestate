import React, { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import FilterPanel from "./components/FilterPanel.jsx";
import SortDropdown from "./components/SortDropdown.jsx";
import Pagination from "./components/Pagination.jsx";
import TransactionsTable from "./components/TransactionsTable.jsx";
import useSalesQuery from "./hooks/useSalesQuery.js";

const App = () => {
  const [query, setQuery] = useState({
    search: "",
    customerRegion: "",
    gender: "",
    ageMin: "",
    ageMax: "",
    productCategory: "",
    tags: "",
    paymentMethod: "",
    dateFrom: "",
    dateTo: "",
    sortBy: "date",
    sortOrder: "desc",
    page: 1
  });

  const { data, loading, error } = useSalesQuery(query);

  const handleUpdate = (patch) => {
    setQuery((prev) => ({ ...prev, ...patch, page: patch.page ?? 1 }));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Retail Sales Management</h1>
        <p>Search, filter, sort and paginate sales transactions</p>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <SearchBar value={query.search} onChange={(value) => handleUpdate({ search: value })} />
          <FilterPanel query={query} onChange={handleUpdate} />
        </aside>

        <main className="content">
          <div className="toolbar">
            <div className="card toolbar-card">
              <SortDropdown
                sortBy={query.sortBy}
                sortOrder={query.sortOrder}
                onChange={(patch) => handleUpdate(patch)}
              />
            </div>
          </div>

          {loading && <div className="status">Loading transactions...</div>}
          {error && <div className="status error">{error}</div>}
          {!loading && !error && data && (
            <>
              {data.items && data.items.length === 0 ? (
                <div className="status">No results found for the selected criteria.</div>
              ) : (
                <>
                  <div className="table-container">
                    <TransactionsTable items={data.items || []} />
                  </div>
                  <Pagination
                    page={data.page || 1}
                    totalPages={data.totalPages || 1}
                    onPageChange={(page) => handleUpdate({ page })}
                  />
                </>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
