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
  this.info = () => {
    return (
      title +
      " by " +
      author +
      ", " +
      pages +
      " pages, " +
      (read ? "already read" : "not read yet")
    );
  };
}

submitBook.addEventListener("click", (event) => {
  const book = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookRead.checked
  );

  let bookContainer = document.createElement("div");
  bookContainer.classList.add("book");

  function appendColumn(columnLegend, columnMain) {
    let bookColumn = document.createElement("div");
    bookColumn.classList.add("book-column");

    let legend = document.createElement("span");
    legend.classList.add("column-legend");

    let main = document.createElement("span");
    main.classList.add("column-main");

    legend.textContent = columnLegend;
    main.textContent = columnMain;
    bookColumn.append(legend);
    bookColumn.append(main);
    bookContainer.append(bookColumn);
  }

  appendColumn("Title", bookTitle.value);
  appendColumn("Author", bookAuthor.value);
  appendColumn("Pages", bookPages.value);
  appendColumn("Progress", bookRead.checked ? "Already Read" : "Not Yet Read");
  booksContainer.append(bookContainer);
});
