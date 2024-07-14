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

        res.status(200).json({message:"book saved successfully"});

    } catch (error) {
        console.log(error);
        res.status(200).json({message: error});
    }

})

module.exports = router;