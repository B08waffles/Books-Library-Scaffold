// Access the database connection from database.js
const db = require("../database")

module.exports.getAllBooks = () => {
    return db.query("SELECT * FROM books.book INNER JOIN author ON book.authorID = books.author.authorID")
}

module.exports.getBookById = (id) => {
    return db.query("SELECT * FROM book WHERE BookID = ?", [id])
}