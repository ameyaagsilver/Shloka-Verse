import Book from '../models/book.js';

export const books = async (req, res) => {
    console.log("getting all the book details for you...");
    try {
        const books = await Book.find();
        res.status(200).json({ data: books });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const createBook = async (req, res) => {
    console.log("Creating a new book for you...");
    const book = req.body;
    let newBook = Book({ ...book });
    try {
        newBook = await newBook.save();
        res.status(200).json(newBook);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const getBooksBySearch = async (req, res) => {
    let { bookId } = req.query;
    
    let mainQuery = [];

    if(bookId || bookId?.length) mainQuery.push({book_id: Number(bookId)});

    console.log(req.query);

    try {
        if(!mainQuery.length) {res.status(200).json([]);return;}
        const books = await Book.find({ $and: mainQuery });
        res.status(200).json(books);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}