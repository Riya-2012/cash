
// import express from 'express';
// import Transaction from '../models/Transaction.js';
// import Category from '../models/categoryModel.js';
// import Account from '../models/accountModel.js';

// const router = express.Router();

// // Get all transactions
// router.get('/', async (req, res) => {
//   try {
//     const transactions = await Transaction.find()
//       .populate('category')
//       .populate('account')
//       .sort({ date: -1 });
//     res.json(transactions);
//   } catch (err) {
//     console.error('Error fetching transactions:', err);
//     res.status(500).json({ error: 'Internal server error while fetching transactions' });
//   }
// });

// // Create new transaction
// // router.post('/', async (req, res) => {
// //   try {
// //     const { date, category, payee, amount, account, note, type } = req.body;

// //     if (!category || !payee || !amount || !account || !date || !type) {
// //       return res.status(400).json({ error: 'All required fields must be provided' });
// //     }

// //     // Find or create category
// //     let categoryDoc = await Category.findOne({ name: category });
// //     if (!categoryDoc) {
// //       categoryDoc = new Category({ name: category });
// //       await categoryDoc.save();
// //     }

// //     // Find or create account
// //     let accountDoc = await Account.findOne({ name: account });
// //     if (!accountDoc) {
// //       accountDoc = new Account({ name: account });
// //       await accountDoc.save();
// //     }

// //     const transaction = new Transaction({
// //       date,
// //       category: categoryDoc._id,
// //       payee,
// //       amount,
// //       account: accountDoc._id,
// //       note,
// //       type,
// //     });

// //     await transaction.save();
// //     res.status(201).json(transaction);
// //   } catch (err) {
// //     console.error('Error saving transaction:', err);
// //     res.status(500).json({ error: 'Internal server error while saving transaction' });
// //   }
// // });
// // router.post("/", async (req, res) => {
// //     try {
// //       const { date, category, type, payee, amount, account, note, transactionType } = req.body;
  
// //       // Validate type
// //       if (!type || !["income", "expense"].includes(type)) {
// //         return res.status(400).json({ error: "Type must be 'income' or 'expense'" });
// //       }
  
// //       // Find or create category with type
// //       let categoryDoc = await Category.findOne({ name: category });
// //       if (!categoryDoc) {
// //         categoryDoc = new Category({ name: category, type }); // Ensure type is passed here
// //         await categoryDoc.save();
// //       }
  
// //       // Find or create account
// //       let accountDoc = await Account.findOne({ name: account });
// //       if (!accountDoc) {
// //         accountDoc = new Account({ name: account });
// //         await accountDoc.save();
// //       }
  
// //       const transaction = new Transaction({
// //         date,
// //         category: categoryDoc._id,
// //         payee,
// //         amount,
// //         account: accountDoc._id,
// //         note,
// //         type: transactionType, // Assuming transactionType represents 'income' or 'expense'
// //       });
  
// //       await transaction.save();
// //       res.status(201).json(transaction);
// //     } catch (err) {
// //       res.status(500).json({ error: err.message });
// //     }
// //   });
// router.post("/", async (req, res) => {
//     try {
//       const { date, category, type, payee, amount, account, note, transactionType } = req.body;
  
//       if (!type || !["income", "expense"].includes(type)) {
//         return res.status(400).json({ error: "Type must be 'income' or 'expense'" });
//       }
  
//       // Find or create category
//       let categoryDoc = await Category.findOne({ name: category });
//       if (!categoryDoc) {
//         categoryDoc = new Category({ name: category, type });
//         await categoryDoc.save();
//       }
  
//       // Find or create account
//     //   let accountDoc = await Account.findOne({ name: account });
//     //   if (!accountDoc) {
//     //     accountDoc = new Account({ name: account });
//     //     await accountDoc.save();
//     //   }
//     let accountDoc = await Account.findOne({ name: account });
//     if (!accountDoc) {
//       const defaultType = "cash"; // or get from req.body if available
//       accountDoc = new Account({ name: account, type: defaultType });
//       await accountDoc.save(); 
//     }
    
//       // Create transaction
//       const transaction = new Transaction({
//         date,
//         category: categoryDoc._id,
//         payee,
//         amount,
//         account: accountDoc._id,
//         note,
//         type: transactionType,
//       });
  
//       await transaction.save();
//       res.status(201).json(transaction);
//     } catch (err) {
//       console.error("Error saving transaction:", err);  // Log the error to debug
//       res.status(500).json({ error: err.message });
//     }
//   });
  
// // Update transaction
// router.put('/:id', async (req, res) => {
//   try {
//     const { date, category, payee, amount, account, note, type } = req.body;

//     if (!category || !payee || !amount || !account || !date || !type) {
//       return res.status(400).json({ error: 'All required fields must be provided' });
//     }

//     // Find or create category
//     let categoryDoc = await Category.findOne({ name: category });
//     if (!categoryDoc) {
//       categoryDoc = new Category({ name: category });
//       await categoryDoc.save();
//     }

//     // Find or create account
//     let accountDoc = await Account.findOne({ name: account });
//     if (!accountDoc) {
//       accountDoc = new Account({ name: account });
//       await accountDoc.save();
//     }

//     const transaction = await Transaction.findByIdAndUpdate(
//       req.params.id,
//       {
//         date,
//         category: categoryDoc._id,
//         payee,
//         amount,
//         account: accountDoc._id,
//         note,
//         type,
//       },
//       { new: true }
//     );

//     res.json(transaction);
//   } catch (err) {
//     console.error('Error updating transaction:', err);
//     res.status(500).json({ error: 'Internal server error while updating transaction' });
//   }
// });

// // Delete transaction
// router.delete('/:id', async (req, res) => {
//   try {
//     const transaction = await Transaction.findByIdAndDelete(req.params.id);
//     if (!transaction) {
//       return res.status(404).json({ error: 'Transaction not found' });
//     }
//     res.json({ message: 'Transaction deleted' });
//   } catch (err) {
//     console.error('Error deleting transaction:', err);
//     res.status(500).json({ error: 'Internal server error while deleting transaction' });
//   }
// });

// export default router;
import express from 'express';
import Transaction from '../models/Transaction.js';
import Category from '../models/categoryModel.js';
import Account from '../models/accountModel.js';

const router = express.Router();

// ==========================
// GET all transactions
// ==========================
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('category')
      .populate('account')
      .sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ error: 'Internal server error while fetching transactions' });
  }
});

// ==========================
// CREATE new transaction
// ==========================
router.post('/', async (req, res) => {
  try {
    const { date, category, payee, amount, account, note, type } = req.body;

    // Debug incoming data
    // console.log("Transaction POST body:", req.body);

    if (!type || !['income', 'expense'].includes(type)) {
      return res.status(400).json({ error: "Transaction type must be 'income' or 'expense'" });
    }

    if (!category || !payee || !amount || !account || !date) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Find or create category with type
    let categoryDoc = await Category.findOne({ name: category, type });
    if (!categoryDoc) {
      categoryDoc = new Category({ name: category, type });
      await categoryDoc.save();
    }

    // Find or create account with fallback type
    let accountDoc = await Account.findOne({ name: account });
    if (!accountDoc) {
      const defaultAccountType = 'cash'; // Default fallback if not passed
      accountDoc = new Account({ name: account, type: defaultAccountType });
      await accountDoc.save();
    }

    // Create and save transaction
    const transaction = new Transaction({
      date,
      category: categoryDoc._id,
      payee,
      amount,
      account: accountDoc._id,
      note,
      type,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    console.error('Error saving transaction:', err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// UPDATE transaction
// ==========================
router.put('/:id', async (req, res) => {
  try {
    const { date, category, payee, amount, account, note, type } = req.body;

    if (!category || !payee || !amount || !account || !date || !type) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    let categoryDoc = await Category.findOne({ name: category, type });
    if (!categoryDoc) {
      categoryDoc = new Category({ name: category, type });
      await categoryDoc.save();
    }

    let accountDoc = await Account.findOne({ name: account });
    if (!accountDoc) {
      const defaultType = 'cash';
      accountDoc = new Account({ name: account, type: defaultType });
      await accountDoc.save();
    }

    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        date,
        category: categoryDoc._id,
        payee,
        amount,
        account: accountDoc._id,
        note,
        type,
      },
      { new: true }
    );

    res.json(transaction);
  } catch (err) {
    console.error('Error updating transaction:', err);
    res.status(500).json({ error: 'Internal server error while updating transaction' });
  }
});

// ==========================
// DELETE transaction
// ==========================
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    console.error('Error deleting transaction:', err);
    res.status(500).json({ error: 'Internal server error while deleting transaction' });
  }
});

export default router;
