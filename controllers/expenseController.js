const Expense = require("../models/expenseSchema");

// Add a new expense
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, notes } = req.body;

    if (!title || !amount || !category || !date) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const newExpense = await Expense.create({ title, amount, category, date, notes });
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ error: "Failed to add expense", details: err.message });
  }
};

// Get all expenses sorted by date
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: 1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch expenses", details: err.message });
  }
};

// Update an expense by ID
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update expense", details: err.message });
  }
};

// Delete an expense by ID
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete expense", details: err.message });
  }
};

// Get summary: total spent + by category
const getSummary = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    
    const categoryBreakdown = {};
    expenses.forEach(e => {
      categoryBreakdown[e.category] = (categoryBreakdown[e.category] || 0) + e.amount;
    });

    res.status(200).json({
      totalSpent: total,
      categoryBreakdown
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch summary", details: err.message });
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
  getSummary
};
