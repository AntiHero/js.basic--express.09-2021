import mongoose from 'mongoose';

interface IBook {
  author: string;
  title: string;
  year: number;
}

const bookSchema = new mongoose.Schema<IBook>({
  author: String,
  title: { type: String, required: true },
  year: Number,
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
