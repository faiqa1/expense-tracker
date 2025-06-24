require("dotenv").config();
const express = require("express");
const connectDb = require("./connection")
const expenseRoutes = require("./routes/expenseRoute");

const PORT = process.env.PORT || 5001;
connectDb();

const app = express();
app.use(express.json());

app.use("/api/expenses", expenseRoutes);

app.listen(PORT, () => {
  console.log("Server is running at", PORT);
});
