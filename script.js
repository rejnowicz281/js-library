const showModal = document.getElementById("show-modal");
const modal = document.querySelector(".modal");
const submitBook = document.getElementById("submit-book");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const bookRead = document.getElementById("read");
const booksContainer = document.querySelector(".books-container");

showModal.addEventListener("click", function () {
  modal.classList.toggle("hidden");
});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

let library = [];

submitBook.addEventListener("click", () => {
  const book = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookRead.checked
  );

  library.push(book);

  let bookContainer = document.createElement("div");
  bookContainer.classList.add("book");
  bookContainer.setAttribute("id", `book-${library.length - 1}`);

  function appendColumn(columnLegend, columnMain) {
    let bookColumn = document.createElement("div");
    bookColumn.classList.add("book-column");

    let legend = document.createElement("span");
    legend.classList.add("column-legend");

    let main = document.createElement("span");
    main.classList.add("column-main");
    if (columnLegend == "Progress") {
      main.setAttribute("id", `book-${library.length - 1}-progress`);
    }

    legend.textContent = columnLegend;
    main.textContent = columnMain;
    bookColumn.append(legend);
    bookColumn.append(main);
    bookContainer.append(bookColumn);
  }

  function appendButtons() {
    let markAsReadColumn = document.createElement("div");
    let deleteColumn = document.createElement("div");
    markAsReadColumn.classList.add("book-column");
    deleteColumn.classList.add("book-column");

    let markAsRead = document.createElement("button");
    markAsRead.textContent = book.read ? "Mark as Unread" : "Mark as Read";
    markAsRead.dataset.bookIndex = library.length - 1;
    markAsRead.addEventListener("click", function () {
      if (book.read) {
        book.read = false;
        markAsRead.textContent = "Mark as Read";
        document.getElementById(
          `book-${markAsRead.dataset.bookIndex}-progress`
        ).textContent = "Not Yet Read";
      } else {
        book.read = true;
        markAsRead.textContent = "Mark as Unread";
        document.getElementById(
          `book-${markAsRead.dataset.bookIndex}-progress`
        ).textContent = "Already Read";
      }
    });

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.dataset.bookIndex = library.length - 1;
    deleteButton.addEventListener("click", function () {
      booksContainer.removeChild(
        document.getElementById(`book-${deleteButton.dataset.bookIndex}`)
      );
      library.splice(deleteButton.dataset.bookIndex, 1);
    });

    deleteColumn.append(deleteButton);
    markAsReadColumn.append(markAsRead);
    bookContainer.append(markAsReadColumn);
    bookContainer.append(deleteColumn);
  }
  appendColumn("Title", book.title);
  appendColumn("Author", book.author);
  appendColumn("Pages", book.pages);
  appendColumn("Progress", book.read ? "Already Read" : "Not Yet Read");
  appendButtons();
  booksContainer.append(bookContainer);
});
