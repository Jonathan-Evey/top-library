/*-----------------------------------
--------Add and Remove Books---------
-----------------------------------*/
const addBookBtn = document.getElementById('add-book-btn');
const addBookPopup = document.getElementById('add-book-popup');
const closeAddBook = document.getElementById('close-add-book-popup-btn');

function addBook() {
    addBookBtn.addEventListener('click', () => {
        addBookPopup.showModal();
    })
}

function closeAddBookPopup() {
    closeAddBook.addEventListener('click', () => {
        console.log("click");
        addBookPopup.close();
    })
}

const removeBookBtn = document.getElementById('remove-book-btn');
function deleteBook() {
    removeBookBtn.addEventListener('click', () => {
        console.log("Delete Book")
    })
}






let myLibrary = [];
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return `"${title} by ${author}, ${pages} pages, ${read}"`
    }
}

function addBookToLibrary() {

}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'read');

console.log(theHobbit.info());


closeAddBookPopup();
deleteBook();
addBook();