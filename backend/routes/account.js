import express from "express";
import Account from "../models/accountModel.js";

const router = express.Router();

// Create Account
router.post("/", async (req, res) => {
  try {
    const newAccount = new Account(req.body);
    await newAccount.save();
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(400).json({ error: "Failed to create account" });
  }
});

// Get All Accounts (with optional search)
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    const query = search
      ? { name: { $regex: search, $options: "i" } }
      : {};
    const accounts = await Account.find(query).sort({ createdAt: -1 });
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch accounts" });
  }
});

// Update Account
router.put("/:id", async (req, res) => {
  try {
    const updated = await Account.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update account" });
  }
});

// Delete Account
router.delete("/:id", async (req, res) => {
  try {
    await Account.findByIdAndDelete(req.params.id);
    res.json({ message: "Account deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete account" });
  }
});

// Bulk Delete
router.post("/bulk-delete", async (req, res) => {
  try {
    const { ids } = req.body;
    await Account.deleteMany({ _id: { $in: ids } });
    res.json({ message: "Accounts deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed bulk delete" });
  }
});

export default router;
