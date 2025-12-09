import { useEffect, useState } from "react";
import { fetchSales } from "../services/api.js";

const useSalesQuery = (query) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    fetchSales(query)
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Error fetching data");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(query)]);

  return { data, loading, error };
};

export default useSalesQuery;
