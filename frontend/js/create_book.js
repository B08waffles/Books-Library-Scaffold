function postCreateBook() {
// Get access to the create book form
    let createBookForm = document.getElementById("create-book-form")

    // Convert the form fields into JSON
    let formDataJSON = JSON.stringify(Object.fromEntries(new FormData(createBookForm)))
    console.log(formDataJSON)

    // Post the form JSON to the backend
    fetch("/api/books/create", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: formDataJSON
    })
    .then(res => res.json())
    .then(res => {
        // Handle the response from the server
        console.log("Create book request sent!")
        alert(res)
        // Redirect back to user list
        window.location.href = "book_list.html"
    })
    .catch(error => {
        // handle the error from the server
        console.log("Create book request failed! " + error)
    })
}

// Create a table of existing book covers and do the same thing.
fetch("/api/authors")
    .then(res => res.json())
    .then((authors) => {
        let authorSelect = document.getElementById("author")

        for (let author of authors) {
            authorSelect.innerHTML 
            += `<option value="${author.authorID}">
                ${author.name + " " + author.surname}
            </option>`
        }

    })