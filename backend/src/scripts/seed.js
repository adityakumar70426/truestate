import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import csv from "csv-parser";
import Sale from "../models/Sale.js";
import dotenv from "dotenv";
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use environment variable for MongoDB URI, fallback to local for development
const MONGODB_URI = process.env.MONGODB_URI ;
console.log(MONGODB_URI)
const csvFilePath = path.resolve(__dirname, "../../data/sales.csv");

// Insert in chunks to avoid out-of-memory
const BATCH_SIZE = 5000;

// Helper: safe number conversion (handles "", "N/A", etc.)
const toNumber = (value) => {
  if (value === undefined || value === null) return undefined;
  const cleaned = String(value).replace(/,/g, "").trim();
  if (cleaned === "") return undefined;
  const num = Number(cleaned);
  return Number.isNaN(num) ? undefined : num;
};

// Map CSV row -> Sale document
const parseRow = (row) => {
  return {
    transactionId: row["Transaction ID"],
    customerId: row["Customer ID"],
    customerName: row["Customer Name"],
    phoneNumber: row["Phone Number"],
    gender: row["Gender"],
    age: toNumber(row["Age"]),
    customerRegion: row["Customer Region"],
    customerType: row["Customer Type"],
    productId: row["Product ID"],
    productName: row["Product Name"],
    brand: row["Brand"],
    productCategory: row["Product Category"],
    tags: row["Tags"]
      ? String(row["Tags"])
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [],
    quantity: toNumber(row["Quantity"]),
    pricePerUnit: toNumber(row["Price per Unit"]),
    discountPercentage: toNumber(row["Discount Percentage"]),
    totalAmount: toNumber(row["Total Amount"]),
    finalAmount: toNumber(row["Final Amount"]),
    date: row["Date"] ? new Date(row["Date"]) : undefined,
    paymentMethod: row["Payment Method"],
    orderStatus: row["Order Status"],
    deliveryType: row["Delivery Type"],
    storeId: row["Store ID"],
    storeLocation: row["Store Location"],
    salespersonId: row["Salesperson ID"],
    employeeName: row["Employee Name"]
  };
};

const seed = async () => {
  try {
    console.log("Connecting to MongoDB at", MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");

    console.log("Dropping existing sales collection...");
    await Sale.deleteMany({});

    console.log("Reading CSV (streaming) from:", csvFilePath);

    const stream = fs.createReadStream(csvFilePath).pipe(csv());
    let batch = [];
    let count = 0;

    for await (const row of stream) {
      const doc = parseRow(row);
      batch.push(doc);

      if (batch.length >= BATCH_SIZE) {
        await Sale.insertMany(batch);
        count += batch.length;
        console.log(`Inserted ${count} records...`);
        batch = [];
      }
    }

    if (batch.length) {
      await Sale.insertMany(batch);
      count += batch.length;
      console.log(`Inserted final batch, total = ${count}`);
    }

    console.log("🎉 Seeding complete!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed script failed:", err);
    process.exit(1);
  }
};

seed();
