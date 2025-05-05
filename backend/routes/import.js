// const express = require('express');
// const router = express.Router();
// const Transaction = require('../models/Transaction');
// const { Parser } = require('json2csv');
// const multer = require('multer');
// const csv = require('csv-parser');
// const fs = require('fs');

// // Export transactions to CSV
// router.get('/export', async (req, res) => {
//   try {
//     const transactions = await Transaction.find().populate('category').populate('account');
//     const fields = ['type', 'amount', 'category.name', 'account.name', 'date', 'payee', 'note'];
//     const parser = new Parser({ fields });
//     const csvData = parser.parse(transactions);
//     res.header('Content-Type', 'text/csv');
//     res.attachment('transactions.csv');
//     return res.send(csvData);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Import transactions from CSV
// const upload = multer({ dest: 'uploads/' });

// router.post('/import', upload.single('file'), (req, res) => {
//   const transactions = [];
//   fs.createReadStream(req.file.path)
//     .pipe(csv())
//     .on('data', (row) => {
//       transactions.push(row);
//     })
//     .on('end', async () => {
//       try {
//         // Map category and account names to their respective IDs
//         // This requires additional logic to match names to IDs
//         // For simplicity, assuming category and account IDs are provided
//         await Transaction.insertMany(transactions);
//         fs.unlinkSync(req.file.path);
//         res.status(201).json({ message: 'Transactions imported' });
//       } catch (err) {
//         res.status(400).json({ error: 'Invalid data' });
//       }
//     });
// });

// module.exports = router; // Corrected export
import express from 'express';
import Transaction from '../models/Transaction.js';
import { Parser } from 'json2csv';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';

const router = express.Router();

// Export transactions to CSV
router.get('/export', async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('category').populate('account');
    const fields = ['type', 'amount', 'category.name', 'account.name', 'date', 'payee', 'note'];
    const parser = new Parser({ fields });
    const csvData = parser.parse(transactions);
    res.header('Content-Type', 'text/csv');
    res.attachment('transactions.csv');
    return res.send(csvData);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Import transactions from CSV
const upload = multer({ dest: 'uploads/' });

router.post('/import', upload.single('file'), (req, res) => {
  const transactions = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (row) => {
      transactions.push(row);
    })
    .on('end', async () => {
      try {
        // Map category and account names to their respective IDs
        // This requires additional logic to match names to IDs
        // For simplicity, assuming category and account IDs are provided
        await Transaction.insertMany(transactions);
        fs.unlinkSync(req.file.path);
        res.status(201).json({ message: 'Transactions imported' });
      } catch (err) {
        res.status(400).json({ error: 'Invalid data' });
      }
    });
});

export default router; // Export using ES Modules syntax
