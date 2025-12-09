import React from "react";

const TransactionsTable = ({ items }) => {
  if (!items.length) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    if (amount == null) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusClass = (status) => {
    const statusLower = (status || "").toLowerCase();
    if (statusLower.includes("completed") || statusLower.includes("delivered")) {
      return "status-badge status-success";
    } else if (statusLower.includes("pending") || statusLower.includes("processing")) {
      return "status-badge status-warning";
    } else if (statusLower.includes("cancelled") || statusLower.includes("failed")) {
      return "status-badge status-error";
    }
    return "status-badge";
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>Phone</th>
          <th>Region</th>
          <th>Product</th>
          <th>Category</th>
          <th>Qty</th>
          <th>Final Amount</th>
          <th>Payment</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {items.map((row) => (
          <tr key={row._id}>
            <td>{formatDate(row.date)}</td>
            <td>{row.customerName || "-"}</td>
            <td>{row.phoneNumber || "-"}</td>
            <td>{row.customerRegion || "-"}</td>
            <td>{row.productName || "-"}</td>
            <td>{row.productCategory || "-"}</td>
            <td>{row.quantity ?? "-"}</td>
            <td style={{ fontWeight: 500 }}>{formatCurrency(row.finalAmount)}</td>
            <td>{row.paymentMethod || "-"}</td>
            <td>
              <span className={getStatusClass(row.orderStatus)}>
                {row.orderStatus || "-"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
