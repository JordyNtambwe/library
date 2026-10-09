let myLibrary = [];

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

function displayBooks () {

  const container = document.getElementById('container');
  container.textContent = '';
  myLibrary.forEach((book) => {

    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = book.id;

    const title = document.createElement('h3');
    title.classList.add('title');
    title.textContent = book.title;

    const author = document.createElement('h3');
    author.classList.add('author');
    author.textContent = book.author;

    const pages = document.createElement('h3');
    pages.classList.add('pages');
    pages.textContent = book.pages;

    const read = document.createElement('button');
    read.textContent = book.read ? 'Read' : 'Not read';
    read.addEventListener('click', () => {
      book.read = !book.read
      displayBooks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Remove';
    deleteButton.addEventListener('click', () => {
    myLibrary = myLibrary.filter((item) => item.id != book.id);
    displayBooks();
    });

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(read);
    card.appendChild(deleteButton);
    container.appendChild(card);

  });
};

const dialog = document.querySelector('#book-dialog');
const addNewBook = document.querySelector('#add-new-book')
const bookForm = document.querySelector('.book-form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readOrNotReadInput = document.querySelector('#read-or-not-read');
const submitInput = document.querySelector('#submit');

addNewBook.addEventListener('click', () => {
  dialog.showModal();
});

bookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = titleInput.value;
  const author = authorInput.value;
  const pages = Number(pagesInput.value);
  const read = readOrNotReadInput.checked;

  addBookToLibrary(title, author, pages, read);
  displayBooks();

  bookForm.reset();
  dialog.close();
});