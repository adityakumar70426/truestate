export const buildFilters = (query) => {
  const filter = {};

  if (query.search) {
    const regex = new RegExp(query.search, "i");
    filter.$or = [{ customerName: regex }, { phoneNumber: regex }];
  }

  if (query.customerRegion) {
    const regions = query.customerRegion.split(",").map((x) => x.trim()).filter(Boolean);
    if (regions.length) filter.customerRegion = { $in: regions };
  }

  if (query.gender) {
    const genders = query.gender.split(",").map((x) => x.trim()).filter(Boolean);
    if (genders.length) filter.gender = { $in: genders };
  }

  const ageMin = query.ageMin ? Number(query.ageMin) : undefined;
  const ageMax = query.ageMax ? Number(query.ageMax) : undefined;
  if (!Number.isNaN(ageMin) || !Number.isNaN(ageMax)) {
    filter.age = {};
    if (!Number.isNaN(ageMin)) filter.age.$gte = ageMin;
    if (!Number.isNaN(ageMax)) filter.age.$lte = ageMax;
    if (filter.age.$gte && filter.age.$lte && filter.age.$gte > filter.age.$lte) {
      const temp = filter.age.$gte;
      filter.age.$gte = filter.age.$lte;
      filter.age.$lte = temp;
    }
  }

  if (query.productCategory) {
    const cats = query.productCategory.split(",").map((x) => x.trim()).filter(Boolean);
    if (cats.length) filter.productCategory = { $in: cats };
  }

  if (query.tags) {
    const tags = query.tags.split(",").map((x) => x.trim()).filter(Boolean);
    if (tags.length) filter.tags = { $in: tags };
  }

  if (query.paymentMethod) {
    const methods = query.paymentMethod.split(",").map((x) => x.trim()).filter(Boolean);
    if (methods.length) filter.paymentMethod = { $in: methods };
  }

  const dateFrom = query.dateFrom ? new Date(query.dateFrom) : undefined;
  const dateTo = query.dateTo ? new Date(query.dateTo) : undefined;
  if (dateFrom || dateTo) {
    filter.date = {};
    if (dateFrom) filter.date.$gte = dateFrom;
    if (dateTo) filter.date.$lte = dateTo;
  }

  return filter;
};

export const buildSort = (query) => {
  const sort = {};
  const sortBy = query.sortBy || "date";
  const order = query.sortOrder === "asc" ? 1 : -1;

  if (sortBy === "date") sort.date = order;
  else if (sortBy === "quantity") sort.quantity = order;
  else if (sortBy === "customerName") sort.customerName = order;
  else sort.date = -1;

  return sort;
};
