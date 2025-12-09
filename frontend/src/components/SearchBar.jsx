import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="card">
      <label className="label">Search</label>
      <input
        className="input"
        type="text"
        placeholder="Search by customer name or phone"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
