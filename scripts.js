function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}

function modifyLibraryTable(book, tableBody) {
  const tableRow = document.createElement("tr");

  Object.keys(book).forEach((key) => {
    if (key === "id" || key === "info") {
    } else {
      const tableColumn = document.createElement("td");
      tableColumn.innerText = book[key];
      tableRow.appendChild(tableColumn);
    }
  });
  tableRow.setAttribute("id", `${book.id}`);
  const deleteColumn = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "WARNING DELETE WARNING";
  deleteButton.classList.add("deleteButton");

  deleteColumn.appendChild(deleteButton);
  tableRow.appendChild(deleteColumn);
  // add a class list indicating the ID of the row for button deletion
  deleteButton.addEventListener("click", () => {
    const rowToDelete = document.getElementById(book.id);
    tableBody.removeChild(rowToDelete);
    const objWithIdIndex = bookList.findIndex((obj) => obj.id === book.id);
    bookList.splice(objWithIdIndex, 1);
  });
  tableBody.appendChild(tableRow);
}

const form = document.querySelector("form");
const bookTableBody = document.getElementById("bookTableBody");

// create a bookList array, and then using event listener create new book object with data from input fields
let bookList = [];
let id = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);

  const book = new Book(
    data.get("title"),
    data.get("author"),
    data.get("pages"),
    data.get("hasRead"),
    id
  );

  id = id + 1;
  bookList.push(book);
  modifyLibraryTable(book, bookTableBody);
});
