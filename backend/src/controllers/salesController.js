// import { getSales } from "../services/salesService.js";

// export const listSales = async (req, res) => {
//   try {
//     const result = await getSales(req.query);
//     res.json(result);
//   } catch (err) {
//     console.error("Error fetching sales", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// import { getSales } from "../services/salesService.js";

// export const listSales = async (req, res) => {
//   try {
//     const result = await getSales(req.query);
//     res.json(result);
//   } catch (err) {
//     console.error("Error fetching sales", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// import { getSales } from "../services/salesService.js";

// export const listSales = async (req, res) => {
//   try {
//     console.log("Incoming query >>>", req.query);   // 👈 add this line
//     const result = await getSales(req.query);
//     res.json(result);
//   } catch (err) {
//     console.error("Error fetching sales", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
import { getSales } from "../services/salesService.js";

export const listSales = async (req, res) => {
  try {
    console.log("Incoming query >>>", req.query);
    const result = await getSales(req.query);
    res.json(result);
  } catch (err) {
    console.error("Error fetching sales", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
