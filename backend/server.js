import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import categoryRoutes from './routes/categoryRoutes.js';
import  accountsRouter from "./routes/account.js";
import transactionsRoute from './routes/transaction.js';

import importExportRoute from './routes/import.js';
import budgetRoutes from "./routes/budget.js";
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/categories', categoryRoutes);

app.use("/api/accounts", accountsRouter);
app.use('/api/transactions', transactionsRoute);
app.use('/api/import-export', importExportRoute);
app.use("/api/budgets", budgetRoutes);

// Connect DB and Start server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
