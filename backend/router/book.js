const Router = require("express");
const Book = require("../model/book");

const router = Router();

router.post("/add", async (req, res) => {
    try {
        const { title, author, publisher, publishedYear, categories, quantities, description, image_url } = req.body;

        const book = new Book({
            title, author, publisher, categories, description, image_url, publishedYear, quantities
        });
        await book.save();

        res.status(200).json({ message: "book saved successfully" });

    } catch (error) {
        console.log(error);
        res.status(200).json({ message: error });
    }
    a
})

router.get(`/all`, async (req, res) => {
    try {

        const { q } = req.query;

        const apiKey = process.env.API_KEY;
        const url = `https://www.googleapis.com/books/v1/volumes?q=${q | 'a'}&key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        const books = data.items.map(item => {
            return {
                title: item.volumeInfo.title,
                id: item.id,
                authors: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
                publisher: item.volumeInfo.publisher || 'Unknown',
                publishedYear: item.volumeInfo.publishedDate,
                categories: item.volumeInfo.categories,
                description: item.volumeInfo.description,
                image_url: item.volumeInfo.imageLinks?.thumbnail || item.volumeInfo.imageLinks?.smallThumbnail || '',
            };
        });

        res.status(200).json(books);
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: "book didn't get received.." });
    }
});

router.get("/library", async (req, res) => {
    try {
        const data = await Book.find();
        res.status(200).json(data, { message: "Successfully loaded the library data" })
    } catch (error) {
        console.log(error);
        res.status(200).json(data, { message: "something went wrong!" });
    }
})

module.exports = router;