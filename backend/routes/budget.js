// import express from "express";
// import Budget from "../models/Budget.js";

// const router = express.Router();

// // Create a new budget
// router.post("/", async (req, res) => {
//   try {
//     const newBudget = new Budget(req.body);
//     const saved = await newBudget.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get all budgets for a user
// router.get("/:userId", async (req, res) => {
//   try {
//     const budgets = await Budget.find({ userId: req.params.userId }).sort({ createdAt: -1 });
//     res.json(budgets);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
// const express = require("express");
// const router = express.Router();
// const Budget = require("../models/Budget");
import express from "express";
import Budget from "../models/Budget.js";

const router = express.Router();
// GET all budgets
router.get("/", async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const budgets = await Budget.find({ userId });
      res.json(budgets);
    } catch (err) {
      console.error("Error fetching budgets:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  

// POST create a new budget
router.post("/", async (req, res) => {
    try {
      const { userId, category, amount, allocated, startDate, period, recurring, notifications } = req.body;
  
      if (!userId || !category || !amount || !allocated || !startDate || !period) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const newBudget = new Budget({
        userId,
        category,
        amount,
        allocated,
        startDate,
        period,
        recurring,
        notifications,
        spent: 0,
      });
  
      const saved = await newBudget.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error("Error creating budget:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
export default router;
