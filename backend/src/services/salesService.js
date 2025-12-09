// import Sale from "../models/Sale.js";

// export const getSales = async (query) => {
//   // Basic pagination
//   const page = Math.max(parseInt(query.page || "1", 10), 1);
//   const limit = Math.max(parseInt(query.limit || "10", 10), 1);
//   const skip = (page - 1) * limit;

//   // ❗ NO FILTERS for now: return ALL rows paginated
//   const [items, total] = await Promise.all([
//     Sale.find({}).skip(skip).limit(limit).lean(),
//     Sale.countDocuments({})
//   ]);

//   const totalPages = Math.ceil(total / limit) || 1;

//   return {
//     items,
//     total,
//     page,
//     limit,
//     totalPages
//   };
// };

import Sale from "../models/Sale.js";

export const getSales = async (query) => {
  const page = Math.max(parseInt(query.page || "1", 10) || 1, 1);
  const limit = Math.max(parseInt(query.limit || "10", 10) || 10, 1);
  const skip = (page - 1) * limit;

  // Frontend params (what we saw in logs)
  const {
    search = "",
    sortBy: sortByRaw = "date",
    sortOrder: sortOrderRaw = "desc",
    region,
    customerRegion,
    gender,
    ageMin,
    ageMax,
    category,
    productCategory,
    tags,
    payment,
    paymentMethod,
    dateFrom,
    dateTo,
  } = query;

  const filter = {};

  // 🔍 Search on customerName / phoneNumber
  if (search && search.trim()) {
    const regex = new RegExp(search.trim(), "i");
    filter.$or = [{ customerName: regex }, { phoneNumber: regex }];
  }

  // 🌍 Region (frontend might send region OR customerRegion)
  const regionValue = region || customerRegion;
  if (regionValue) {
    const regions = regionValue
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
    if (regions.length) filter.customerRegion = { $in: regions };
  }

  // 🚻 Gender
  if (gender) {
    const genders = gender
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
    if (genders.length) filter.gender = { $in: genders };
  }

  // 🎂 Age range
  if (ageMin !== undefined && ageMin !== "" && ageMin !== null) {
    const min = Number(ageMin);
    if (!Number.isNaN(min)) {
      if (!filter.age) filter.age = {};
      filter.age.$gte = min;
    }
  }
  if (ageMax !== undefined && ageMax !== "" && ageMax !== null) {
    const max = Number(ageMax);
    if (!Number.isNaN(max)) {
      if (!filter.age) filter.age = {};
      filter.age.$lte = max;
    }
  }

  // 🏷 Category (frontend sends productCategory)
  const categoryValue = productCategory || category;
  if (categoryValue) {
    const cats = categoryValue
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
    if (cats.length) filter.productCategory = { $in: cats };
  }

  // Tags (tags is an array in the model, so we use $in)
  if (tags) {
    const tagList = tags
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
    if (tagList.length) filter.tags = { $in: tagList };
  }

  // 💳 Payment (frontend might send payment OR paymentMethod)
  const paymentValue = payment || paymentMethod;
  if (paymentValue) {
    const methods = paymentValue
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
    if (methods.length) filter.paymentMethod = { $in: methods };
  }

  // 📅 Date range
  if (dateFrom || dateTo) {
    filter.date = {};
    if (dateFrom) {
      const from = new Date(dateFrom);
      if (!Number.isNaN(from.getTime())) {
        from.setHours(0, 0, 0, 0); // Start of day
        filter.date.$gte = from;
      }
    }
    if (dateTo) {
      const to = new Date(dateTo);
      if (!Number.isNaN(to.getTime())) {
        to.setHours(23, 59, 59, 999); // End of day
        filter.date.$lte = to;
      }
    }
  }

  // 🔽 Sorting
  const sort = {};
  const sortField = sortByRaw || "date";
  const direction = (sortOrderRaw || "desc").toLowerCase();
  const sortOrder = direction === "asc" ? 1 : -1;

  if (sortField === "date") sort.date = sortOrder;
  else if (sortField === "quantity") sort.quantity = sortOrder;
  else if (sortField === "customerName") sort.customerName = sortOrder;
  else if (sortField === "finalAmount") sort.finalAmount = sortOrder;
  else sort.date = -1; // default fallback

  // Debug logging (can be removed in production)
  console.log("Query filter:", JSON.stringify(filter, null, 2));
  console.log("Sort:", sort);
  console.log("Pagination:", { page, limit, skip });

  // Run query
  const [items, total, aggregates] = await Promise.all([
    Sale.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Sale.countDocuments(filter),
    // Calculate aggregates based on filtered data
    Sale.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalUnitsSold: { $sum: { $ifNull: ["$quantity", 0] } },
          totalAmount: { $sum: { $ifNull: ["$finalAmount", 0] } },
          totalDiscount: { 
            $sum: { 
              $ifNull: [
                { $subtract: [{ $ifNull: ["$totalAmount", 0] }, { $ifNull: ["$finalAmount", 0] }] },
                0
              ]
            }
          }
        }
      }
    ])
  ]);

  console.log(`Found ${total} total records, returning ${items.length} items`);

  const totalPages = Math.ceil(total / limit) || 1;

  // Extract aggregate values (default to 0 if no results)
  const aggregateData = aggregates.length > 0 ? aggregates[0] : {
    totalUnitsSold: 0,
    totalAmount: 0,
    totalDiscount: 0
  };

  return { 
    items, 
    total, 
    page, 
    limit, 
    totalPages,
    aggregates: {
      totalUnitsSold: aggregateData.totalUnitsSold || 0,
      totalAmount: aggregateData.totalAmount || 0,
      totalDiscount: aggregateData.totalDiscount || 0
    }
  };
};
