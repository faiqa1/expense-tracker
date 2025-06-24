const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: [0, "Amount must be positive"]
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    default: "",
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Expense", expenseSchema);
