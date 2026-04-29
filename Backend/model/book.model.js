import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    category: String,
    image: String,
    title: String,
    description: String,
});
const Book = mongoose.model("Book", bookSchema);

export default Book;