const express = require("express")
// Create a router so that we can define API
// routes in this file.
const router = express.Router()
// Access the author model so that we can access
// book data in this file.
const authorModel = require("../models/authorModel")

router.get("/authors", (req, res) => {
    authorModel.getAllAuthors()
        .then((results) => {
            res.status(200).json(results)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json("query error")
        })
})

// This allows the server.js to import (require) the
// routes define in this file.
module.exports = router