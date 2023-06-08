export default function renderLibraryBook(library, book) {
    const booksContainer = document.querySelector(".books-container");
    
    let bookContainer = document.createElement("div");
    bookContainer.classList.add("book");
  
    function appendColumn(columnLegend, columnMain) {
      let bookColumn = document.createElement("div");
      bookColumn.classList.add("book-column");
  
      let legend = document.createElement("span");
      legend.classList.add("column-legend");
  
      let main = document.createElement("span");
      main.classList.add("column-main");
      if (columnLegend == "Progress") {
        main.setAttribute("id", `book-${book.id}-progress`);
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
      markAsRead.classList.add("markAsRead-button");
      if (book.read) {
        markAsRead.textContent = "Mark as Unread";
        markAsRead.classList.add("unread");
      } else {
        markAsRead.textContent = "Mark as Read";
        markAsRead.classList.add("read");
      }
  
      markAsRead.addEventListener("click", function () {
        if (book.read) {
          markAsRead.classList.add("read");
          markAsRead.classList.remove("unread");
          book.read = false;
          markAsRead.textContent = "Mark as Read";
          document.getElementById(
            `book-${book.id}-progress`
          ).textContent = "Not Yet Read";
        } else {
          markAsRead.classList.remove("read");
          markAsRead.classList.add("unread");
          book.read = true;
          markAsRead.textContent = "Mark as Unread";
          document.getElementById(
            `book-${book.id}-progress`
          ).textContent = "Already Read";
        }
      });
  
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", function () {
        booksContainer.removeChild(bookContainer);
        library.removeBook(book.id)
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
}