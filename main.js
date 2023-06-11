import renderLibraryBook from "./renderLibraryBook.js";

const showModal = document.getElementById("show-modal");
const modal = document.querySelector(".modal");
const submitBook = document.getElementById("submit-book");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const bookRead = document.getElementById("read");

showModal.addEventListener("click", function () {
    modal.classList.toggle("hidden");
});

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        book.id = this.books.length;
        this.books.push(book);
    }

    removeBook(id) {
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].id == id) this.books.splice(i, 1);
        }
    }
}

let library = new Library();

submitBook.addEventListener("click", () => {
    if (
        bookTitle.validity.valid &&
        bookAuthor.validity.valid &&
        bookPages.validity.valid
    ) {
        library.addBook(
            new Book(
                bookTitle.value,
                bookAuthor.value,
                bookPages.value,
                bookRead.checked
            )
        );
        renderLibraryBook(library, library.books[library.books.length - 1]);
    }
});
