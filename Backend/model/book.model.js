import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    id: String,
    name: String,
    author: String,
    price: Number,
    category: String,
    image: String,
    title: String,
    description: String,
  },
  { timestamps: true }
);
const Book = mongoose.model("Book", bookSchema);

export default Book;