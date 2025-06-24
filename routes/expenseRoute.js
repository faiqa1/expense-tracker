const express = require("express");
const {
  addExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
  getSummary
} = require("../controllers/expenseController");

const router = express.Router();

router.post("/", addExpense);           
router.get("/", getAllExpenses);        
router.put("/:id", updateExpense);      
router.delete("/:id", deleteExpense);   
router.get("/summary", getSummary);     

module.exports = router;
