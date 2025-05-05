import  mongoose from 'mongoose';

// const TransactionSchema = new mongoose.Schema({
//   type: { type: String, enum: ['income', 'expense', 'transfer'], required: true },
//   amount: { type: Number, required: true },
//   category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
//   account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
//   date: { type: Date, required: true },
//   payee: { type: String },
//   note: { type: String },
// });

// // module.exports = mongoose.model('Transaction', TransactionSchema);

// export default mongoose.model('Transaction', TransactionSchema);
const transactionSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    amount: { type: Number, required: true },
    payee: { type: String },
    account: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
    note: { type: String },
    type: { type: String, enum: ["income", "expense"], required: true },
  });
  
  const Transaction = mongoose.model("Transaction", transactionSchema);
   export default Transaction;  