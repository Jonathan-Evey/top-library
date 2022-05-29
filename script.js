let myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        pages: 295,
        read: "Read"
    }
];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

/*-----------------------------------
--------Generate Book Shelf----------
-----------------------------------*/
function displayBooks() {
    let books = myLibrary;
    books.forEach(book => makesNewBook(book))
}

/*-----------------------------------
-------- Clear Book Shelf -----------
-----------------------------------*/
function clearShelf(cardContainer) {
    while(cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }
}

/*-----------------------------------
-------Add New Book to Shelf---------
-----------------------------------*/
const addBookBtn = document.getElementById('add-book-btn-container');
const addBookPopup = document.getElementById('add-book-popup');
function addBook() {
    addBookBtn.addEventListener('click', () => {
        addBookPopup.showModal();
    })
}

const submitBookBtn = document.getElementById('submit-book-btn');
function checkForSubmitBtn() {
    submitBookBtn.addEventListener('click', () => {
        addBookToLibrary();
    })
}
function addBookToLibrary() {
    if (document.getElementById('book-read').checked == true) {
        let book = new Book(
            document.getElementById("book-title").value, 
            document.getElementById("book-author").value, 
            document.getElementById("book-pages").value,
            read = "Read",
        );
        myLibrary.push(book);
        clearShelf(cardContainer);
        displayBooks();
    }
    if (document.getElementById('book-unread').checked == true){
        let book = new Book(
            document.getElementById("book-title").value, 
            document.getElementById("book-author").value, 
            document.getElementById("book-pages").value,
            read = "Unread",
        );
        myLibrary.push(book);
        clearShelf(cardContainer);
        displayBooks();
    }
}

const cardContainer = document.getElementById('card-container');
function makesNewBook(book) {
    cardContainer.insertAdjacentHTML("afterbegin",
        `<div class="single-card" id="single-card">
            <div class="card-content" id="card-content">
                <div class="card-front ${book.read}" id="card-front">
                    <p class="card-title" id="card-title">${book.title}</p>
                    <p class="card-book-by">by</p>
                    <p class="card-author">${book.author}</p>
                </div>
                <div class="card-back ${book.read}">
                    <div class="card-back-top-container">
                        <button class="btn remove-book-btn ${book.read}" id="remove-book-btn">x</button>
                        <button class="btn read-unread-btn ${book.read}">${book.read}</button>
                    </div>
                    <div class="card-pages-container">
                        <p class="card-pages">Pages:</p>
                        <p class="page-count">${book.pages}</p>
                    </div>
                </div>
            </div>
        </div>`)
}

const closeAddBook = document.getElementById('close-add-book-popup-btn');
function closeAddBookPopup() {
    closeAddBook.addEventListener('click', () => {
        addBookPopup.close();
    })
}

/*-----------------------------------
------- Click on Book Events --------
-----------------------------------*/
function bookClickListener() {
    cardContainer.addEventListener('click', (e) => {
        clickBookEvent(e.target);
    })
}

function clickBookEvent(element) {
    if (element.classList.contains('remove-book-btn')) {
        confirmDelete(element);
    }
    if (element.classList.contains('read-unread-btn')) {
        if (element.classList.contains('Unread')) {
            let closestParent = element.closest('#card-content');
            let bookUnreadStyles = closestParent.querySelectorAll('.Unread');
            updateToRead(bookUnreadStyles);
            updateReadStatus(element);
            return;
        }
        if (element.classList.contains('Read')) {
            let closestParent = element.closest('#card-content');
            let bookReadStyles = closestParent.querySelectorAll('.Read');
            updateToUnread(bookReadStyles);
            updateReadStatus(element);
            return;
        }
    }
    
}

function updateToUnread(bookReadStyles) {
    bookReadStyles.forEach(bookReadStyle => {
        bookReadStyle.classList.toggle('Read');
        bookReadStyle.classList.toggle('Unread');
    })
}

function updateToRead(bookUnreadStyles) {
    bookUnreadStyles.forEach(bookUnreadStyle => {
        bookUnreadStyle.classList.toggle('Unread');
        bookUnreadStyle.classList.toggle('Read');
    })
}

function updateReadStatus(element) {
    if (element.classList.contains('Unread')) {
        element.innerText = "Unread";
    }
    if (element.classList.contains('Read')) {
        element.innerText = "Read";
    }
}

/*-----------------------------------
-----Confirm Book Removal Event------
-----------------------------------*/
const confirmDeleteBookTitle = document.getElementById('delete-popup-book-title');
const confirmDeletePopup = document.getElementById('confirm-delete-popup');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
function confirmDelete(element) {
    confirmDeletePopup.showModal();
    showBookTitle(element);
    confirmDeleteBtn.onclick = () => {
        removeBook(element);
        deleteParentElement(element);
        confirmDeletePopup.close();
        return;
    }
    cancelDeleteBtn.onclick = () => {
        confirmDeletePopup.close();
        return;
    }
}

function showBookTitle(element) {
    let closestParent = element.closest('#card-content');
    let bookTitleElemet = closestParent.querySelector('#card-title');
    let bookToDelete = bookTitleElemet.textContent;
    confirmDeleteBookTitle.innerText = bookToDelete;
}

/*-----------------------------------
---------   Remove Book    ----------
-----------------------------------*/
function removeBook(element) {
    let closestParent = element.closest('#card-content');
    let bookTitleElemet = closestParent.querySelector('#card-title');
    let bookToDelete = bookTitleElemet.textContent;
    let books = myLibrary;
    books.forEach((book, index) => {
        if(book.title === bookToDelete) {
            books.splice(index, 1);
        }
        console.log(myLibrary);
    })
    
}
function deleteParentElement(element) {
    divToDelete = element.closest('#single-card');
    divToDelete.remove();
}

closeAddBookPopup();
bookClickListener();
addBook();
checkForSubmitBtn();
document.addEventListener('DOMContentLoaded', displayBooks());