import React from "react";

const SummaryBoxes = ({ aggregates, loading }) => {
  const formatCurrency = (amount) => {
    if (amount == null) return "₹0";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    if (num == null) return "0";
    return new Intl.NumberFormat("en-IN").format(num);
  };

  if (loading) {
    return (
      <div className="summary-boxes">
        <div className="summary-box">
          <div className="summary-box-header">
            <h3>Total Units Sold</h3>
            <span className="info-icon">ℹ️</span>
          </div>
          <div className="summary-box-value">-</div>
        </div>
        <div className="summary-box">
          <div className="summary-box-header">
            <h3>Total Amount</h3>
            <span className="info-icon">ℹ️</span>
          </div>
          <div className="summary-box-value">-</div>
        </div>
        <div className="summary-box">
          <div className="summary-box-header">
            <h3>Total Discount</h3>
            <span className="info-icon">ℹ️</span>
          </div>
          <div className="summary-box-value">-</div>
        </div>
      </div>
    );
  }

  return (
    <div className="summary-boxes">
      <div className="summary-box">
        <div className="summary-box-header">
          <h3>Total Units Sold</h3>
          <span className="info-icon">ℹ️</span>
        </div>
        <div className="summary-box-value">{formatNumber(aggregates?.totalUnitsSold || 0)}</div>
      </div>
      <div className="summary-box">
        <div className="summary-box-header">
          <h3>Total Amount</h3>
          <span className="info-icon">ℹ️</span>
        </div>
        <div className="summary-box-value">{formatCurrency(aggregates?.totalAmount || 0)}</div>
      </div>
      <div className="summary-box">
        <div className="summary-box-header">
          <h3>Total Discount</h3>
          <span className="info-icon">ℹ️</span>
        </div>
        <div className="summary-box-value">{formatCurrency(aggregates?.totalDiscount || 0)}</div>
      </div>
    </div>
  );
};

export default SummaryBoxes;

