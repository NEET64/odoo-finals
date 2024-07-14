const Router = require("express");
const Book = require("../model/book");

const router = Router();

router.post("/add", async (req, res) => {
  try {
    const {
      title,
      author,
      publisher,
      publishedYear,
      categories,
      quantities,
      description,
      image_url,
    } = req.body;

    console.log(req.body);

    const book = new Book({
      title,
      author,
      publisher,
      categories,
      description,
      image_url,
      publishedYear,
      quantities,
    });
    await book.save();

    res.status(200).json({ message: "book saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: error });
  }
});

router.get(`/all`, async (req, res) => {
  try {
    const { q } = req.query;
    const apiKey = process.env.API_KEY;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${
      q || "a"
    }&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const books = data.items.map((item) => {
      return {
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors
          ? item.volumeInfo.authors.join(", ")
          : "Unknown",
        publisher: item.volumeInfo.publisher || "Unknown",
        publishedYear: item.volumeInfo.publishedDate,
        categories: item.volumeInfo.categories,
        description: item.volumeInfo.description,
        image_url:
          item.volumeInfo.imageLinks?.thumbnail ||
          item.volumeInfo.imageLinks?.smallThumbnail ||
          "",
      };
    });

    return res.status(200).json(books);
  } catch (error) {
    console.log(error);
  }
});

router.get("/library", async (req, res) => {
  try {
    const data = await Book.find();
    res
      .status(200)
      .json({ data, message: "Successfully loaded the library data" });
  } catch (error) {
    console.log(error);
    res.status(200).json(data, { data, message: "something went wrong!" });
  }
});

router.delete("/bin/:id", async (req, res) => {
  let id = req.params.id;
  console.log(id);
  await Book.findByIdAndDelete(id);

  res.status(200).json({ message: "book successfully deleted." });
});

module.exports = router;
