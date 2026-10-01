const myLibrary = [];

function Book (title, author, pages, read) {
  if (!new.target) {
    throw Error ("You must use the 'new' operator to call the constructor");
  };
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read
  this.id = crypto.randomUUID();
  this.info = function () {
    const readBook = this.read ? 'read' : 'not read yet';
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readBook}`;
  };
};

function addBookToLibrary (title, author, pages, read) {
  const newBook = new Book (title, author, pages, read);
    myLibrary.push(newBook)
    return newBook;
  };