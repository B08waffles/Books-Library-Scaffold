
const express = require("express")
const session = require("express-session")

const server = express()
const port = 3000

// Enable middleware for JSON and urlencoded form data
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// Enable session middleware so that we have state
server.use(session({
    secret: 'secret phrase abc123',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Should be turned to true in production (HTTPS only)
}))

const mysql = require("mysql2");



// Setup our own access control middleware
// Must happen after JSON and session middleware but before static files
server.use((req, res, next) => {
    // The user is logged in if they have session data
    let userLoggedIn = req.session.user != null

    // URLs we will allow for non logged in clients (guests)
    let guestAllowedURLs = [
        "/login.html",
        "/js/login.js",
        "/css/style.css",
        "/api/users/login",
    ]


    if (userLoggedIn) {
        // Allow the request through
        next()
    } else {
        // Check that the guest page is only
        // asking for an allowed resource
        if (guestAllowedURLs.includes(req.originalUrl)) {
            // Allow the guest user through
            next()
        } else {
            // Redirect them to the login page
            res.redirect("/login.html")
        }
    }
})

// Serve static frontend resources
server.use(express.static("frontend"))

// Link up book controller
const bookController = require("./backend/controllers/bookController")
server.use("/api", bookController)

// Link up the user controller
const userController = require("./backend/controllers/userController")
server.use("/api", userController)

// Link up the author controller
const authorController = require("./backend/controllers/authorController")
const nodemon = require("nodemon")
server.use("/api", authorController)

// Start the express server
server.listen(port, () => {
    console.log("Backend listening on http://localhost:"+port)
})