import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema(
  {
    transactionId: String, 
    customerId: String,
    customerName: String,
    phoneNumber: String,
    gender: String,
    age: Number,
    customerRegion: String,
    customerType: String,
    productId: String,
    productName: String,
    brand: String,
    productCategory: String,
    tags: [String],
    quantity: Number,
    pricePerUnit: Number,
    discountPercentage: Number,
    totalAmount: Number,
    finalAmount: Number,
    date: Date,
    paymentMethod: String,
    orderStatus: String,
    deliveryType: String,
    storeId: String,
    storeLocation: String,
    salespersonId: String,
    employeeName: String
  },
  { timestamps: true }
);

const Sale = mongoose.model("Sale", SaleSchema);

export default Sale;
