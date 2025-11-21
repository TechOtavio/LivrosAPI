import mongoose from "mongoose";

const livroSchema = mongoose.Schema({
    id: Number,
    titulo: String,
    autor: String
});

export default mongoose.model("Livro", livroSchema)