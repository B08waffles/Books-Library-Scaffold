const express = require("express")
// Create a router so that we can define API
// routes in this file.
const router = express.Router()
// Access the books model so that we can access
// book data in this file.
const bookModel = require("../models/bookModel")

// Define an /api/books endpoint that responds with
// an array of all books.
router.get("/books", (req, res) => {
    bookModel.getAllBooks()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            // Log any errors to the node console
            console.log(error)
            res.status(500).json("query error")
        })
})

// Define an /api/books/:id endpoint that responds with
// a specific book by id
router.get("/books/:id", (req, res) => {
    bookModel.getBookById(req.params.id)
        .then((results) => {
            if (results.length > 0) {
                res.status(200).json(results[0])
            } else {
                res.status(404).json("failed to find book by id")
            }
        })
        .catch((error) => {
            // Log sql errors to node console
            console.log(error)
            res.status(500).json("query error")
        })

    // // Try to get the book from the data store
    // let book = bookModel.getBookById(req.params.id)

    // // Did we find a book with that id?
    // if (book) {
    //     // Yes! we found a book with that id. Send it back.
    //     res.status(200).json(book)
    // } else {
    //     // No?! we did not find a book with that id. Send error.
    //     res.status(404).json("book not found")
    // }
})


// This allows the server.js to import (require) the
// routes define in this file.
module.exports = router