fetch("api/books")
    .then(response => response.json())
    .then(books => {
        console.log(books)
        let book_list = document.getElementById("book-list")

        for (let book of books) {
            book_list.innerHTML += `
            <article class="book">
                <h1>${book.bookTitle}</h1>
                <h2>${book.name}</h2>
                <h3>${book.genre}</h3>
            </article>
            `
        }
    })