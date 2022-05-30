let myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        pages: 295,
        read: "read",
        idNumber: 25
    }
];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.idNumber = assignNewIdNumber();
}

function assignNewIdNumber() {
    let books = myLibrary;
    let currentAssignedIds = [];
    books.forEach(book => currentAssignedIds.push(book.idNumber))
    checkNumber = Math.floor(Math.random() * 10000) + 1;
    if (currentAssignedIds.includes(checkNumber)) {
        assignNewIdNumber();
    }
    if (!currentAssignedIds.includes(checkNumber)) {
        return checkNumber;
    }
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
            read = "read",
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
            read = "unread",
        );
        myLibrary.push(book);
        clearShelf(cardContainer);
        displayBooks();
    }
}

const cardContainer = document.getElementById('card-container');
function makesNewBook(book) {
    cardContainer.insertAdjacentHTML("afterbegin",
        `<div class="single-card" id="single-card" data-bookid="${book.idNumber}">
            <div class="card-content" id="card-content">
                <div class="card-front ${book.read}" id="card-front">
                    <p class="card-title" id="card-title">${book.title}</p>
                    <p class="card-book-by">by</p>
                    <p class="card-author">${book.author}</p>
                </div>
                <div class="card-back ${book.read}">
                    <div class="card-back-top-container">
                        <button class="btn remove-book-btn ${book.read}" id="remove-book-btn">x</button>
                        <button class="btn read-unread-btn ${book.read}" id="read-unread-btn" data-bookid="${book.idNumber}"></button>
                    </div>
                    <div class="card-pages-container">
                        <p class="card-pages">Pages:</p>
                        <p class="page-count">${book.pages}</p>
                    </div>
                </div>
            </div>
        </div>`)
        setReadUnreadText();
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
        if (element.classList.contains('unread')) {
            let closestParent = element.closest('#card-content');
            let bookUnreadStyles = closestParent.querySelectorAll('.unread');
            updateToRead(bookUnreadStyles);
            setReadUnreadText();
            updateStoredReadStatus(element)
            return;
        }
        if (element.classList.contains('read')) {
            let closestParent = element.closest('#card-content');
            let bookReadStyles = closestParent.querySelectorAll('.read');
            updateToUnread(bookReadStyles);
            setReadUnreadText();
            updateStoredReadStatus(element)
            return;
        }
    }
    
}


function updateStoredReadStatus(element) {
    let selectedBook = element.dataset.bookid;
    console.log(parseInt(selectedBook));
    myLibrary.forEach(book => {
        if(book.idNumber == parseInt(selectedBook)) {
            if (book.read == "read") {
                book.read = "unread";
                return;
            }
            if (book.read == "unread") {
                book.read = "read";
                return;
            }
        }
    })
}

function updateToUnread(bookReadStyles) {
    bookReadStyles.forEach(bookReadStyle => {
        bookReadStyle.classList.toggle('read');
        bookReadStyle.classList.toggle('unread');
    })
}

function updateToRead(bookUnreadStyles) {
    bookUnreadStyles.forEach(bookUnreadStyle => {
        bookUnreadStyle.classList.toggle('unread');
        bookUnreadStyle.classList.toggle('read');
    })
}


function setReadUnreadText() {
    const readUnreadBtn = document.getElementById('read-unread-btn');
    if (readUnreadBtn.classList.contains('unread')) {
        readUnreadBtn.innerText = "Unread";
    }
    if (readUnreadBtn.classList.contains('read')) {
        readUnreadBtn.innerText = "Read";
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
    let theBookToDelete = element.closest('#single-card');
    let bookIdToDelete = theBookToDelete.dataset.bookid;
    let books = myLibrary;
    myLibrary.forEach((book, index) => {
        if(book.idNumber == bookIdToDelete) {
            books.splice(index, 1);
        }
        
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