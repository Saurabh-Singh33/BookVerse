import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./model/book.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const URI = process.env.MongoDBURI || "mongodb://localhost:27017/bookverse";

const seedDatabase = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB for seeding");

    // Clear existing data
    await Book.deleteMany({});
    console.log("Cleared existing books");

    // Read list.json from frontend
    const dataPath = path.join(__dirname, "..", "Frontend", "src", "data", "list.json");
    const books = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    // Insert books
    await Book.insertMany(books);
    console.log("Successfully seeded database with books from list.json");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
