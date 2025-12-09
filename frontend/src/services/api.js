export const fetchSales = async (params) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });

  const url = `https://truestate-xxeo.onrender.com/api/sales?${searchParams.toString()}`;
  console.log("Fetching from:", url);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to fetch sales: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Received data:", { total: data.total, itemsCount: data.items?.length });
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
