import React from "react";

const Pagination = ({ page, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="pagination">
      <button className="btn" onClick={handlePrev} disabled={page <= 1}>
        ← Previous
      </button>
      <span className="page-info">
        Page {page} of {totalPages}
      </span>
      <button className="btn" onClick={handleNext} disabled={page >= totalPages}>
        Next →
      </button>
    </div>
  );
};

export default Pagination;
