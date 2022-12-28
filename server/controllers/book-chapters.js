import BookChapter from '../models/book-chapters.js';

export const bookChapters = async (req, res) => {
    console.log("getting all the specific chapters for you...");
    try {
        const { bookId } = req.query;
        console.log(Number(bookId));
        const bookChapters = await BookChapter.find({ $and: [ {book_id: Number(bookId)} ] });
        res.status(200).json({ data: bookChapters });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const createChapter = async (req, res) => {
    console.log("Creating a new chapter for you...");
    const chapter = req.body;
    let newChapter = BookChapter({ ...chapter, chapter_book_id: chapter?.chapter_id + "_" + chapter?.book_id });
    console.log(newChapter);

    try {
        newChapter = await newChapter.save();
        res.status(200).json(newChapter);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}