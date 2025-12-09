import React from "react";

const FilterPanel = ({ query, onChange }) => {
  const handleInput = (field) => (e) => {
    onChange({ [field]: e.target.value });
  };

  return (
    <div className="card">
      <h3 className="card-title">Filters</h3>

      <div className="field-group">
        <label className="label">Customer Region</label>
        <input
          className="input"
          type="text"
          placeholder="e.g., North, South, East"
          value={query.customerRegion}
          onChange={handleInput("customerRegion")}
        />
      </div>

      <div className="field-group">
        <label className="label">Gender</label>
        <input
          className="input"
          type="text"
          placeholder="e.g., Male, Female"
          value={query.gender}
          onChange={handleInput("gender")}
        />
      </div>

      <div className="field-inline">
        <div className="field-group" style={{ marginBottom: 0 }}>
          <label className="label">Age Min</label>
          <input
            className="input"
            type="number"
            placeholder="Min"
            min="0"
            value={query.ageMin}
            onChange={handleInput("ageMin")}
          />
        </div>
        <div className="field-group" style={{ marginBottom: 0 }}>
          <label className="label">Age Max</label>
          <input
            className="input"
            type="number"
            placeholder="Max"
            min="0"
            value={query.ageMax}
            onChange={handleInput("ageMax")}
          />
        </div>
      </div>

      <div className="field-group">
        <label className="label">Product Category</label>
        <input
          className="input"
          type="text"
          placeholder="e.g., Electronics, Clothing"
          value={query.productCategory}
          onChange={handleInput("productCategory")}
        />
      </div>

      <div className="field-group">
        <label className="label">Tags</label>
        <input
          className="input"
          type="text"
          placeholder="e.g., premium, sale"
          value={query.tags}
          onChange={handleInput("tags")}
        />
      </div>

      <div className="field-group">
        <label className="label">Payment Method</label>
        <input
          className="input"
          type="text"
          placeholder="e.g., Credit Card, Cash"
          value={query.paymentMethod}
          onChange={handleInput("paymentMethod")}
        />
      </div>

      <div className="field-inline">
        <div className="field-group" style={{ marginBottom: 0 }}>
          <label className="label">Date From</label>
          <input
            className="input"
            type="date"
            value={query.dateFrom}
            onChange={handleInput("dateFrom")}
          />
        </div>
        <div className="field-group" style={{ marginBottom: 0 }}>
          <label className="label">Date To</label>
          <input
            className="input"
            type="date"
            value={query.dateTo}
            onChange={handleInput("dateTo")}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
