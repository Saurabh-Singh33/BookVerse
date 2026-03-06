import express from "express";
import dotenv from "dotenv";

console.log("Server file executed");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello World!,, This is the backend of BookVerse");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}).on("error", (err) => {
  console.log("Server error:", err.message);
});