import React from "react";

const SortDropdown = ({ sortBy, sortOrder, onChange }) => {
  const handleSortBy = (e) => onChange({ sortBy: e.target.value });
  const handleOrder = (e) => onChange({ sortOrder: e.target.value });

  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
      <div style={{ flex: 1 }}>
        <label className="label">Sort By</label>
        <select className="input" value={sortBy} onChange={handleSortBy}>
          <option value="date">Date</option>
          <option value="quantity">Quantity</option>
          <option value="customerName">Customer Name</option>
          <option value="finalAmount">Final Amount</option>
        </select>
      </div>
      <div style={{ flex: 1 }}>
        <label className="label">Order</label>
        <select className="input" value={sortOrder} onChange={handleOrder}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
};

export default SortDropdown;
