let myLibrary = [];

/*-----------------------------------
--------    Add New Books   ---------
-----------------------------------*/
const addBookBtn = document.getElementById('add-book-btn');
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
        let book = new ReadBook(
            document.getElementById("book-title").value, 
            document.getElementById("book-author").value, 
            document.getElementById("book-pages").value
        );
        myLibrary.push(book);
        console.log(myLibrary);
    }
    if (document.getElementById('book-unread').checked == true){
        let book = new UnreadBook(
            document.getElementById("book-title").value, 
            document.getElementById("book-author").value, 
            document.getElementById("book-pages").value,
        );
        makesNewUnreadHTMLBook(book);
        myLibrary.push(book);
    }
}

const cardContainer = document.getElementById('card-container');
function makesNewUnreadHTMLBook(book) {
    cardContainer.insertAdjacentHTML("afterbegin",
        `<div class="single-card" id="single-card">
            <div class="card-content">
                <div class="card-front read">
                    <p class="card-title">${book.title}</p>
                    <p class="card-book-by">by</p>
                    <p class="card-author">${book.author}</p>
                </div>
                <div class="card-back read">
                    <div class="card-back-top-container">
                        <button class="btn remove-book-btn" id="remove-book-btn">X</button>
                        <button class="btn read-unread-btn">
                            <p class="card-read-unread read">Read</p>
                            <p class="card-read-unread unread hidden">Unread</p>
                        </button>
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
---------   Remove Book    ----------
-----------------------------------*/
function deleteBookclickEvent() {
    cardContainer.addEventListener('click', (e) => {
        deleteBook(e.target);
    })
}

function deleteBook(element) {
    if (element.classList.contains('remove-book-btn')) {
        confirmDelete(element);
    }
}

const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
function confirmDelete(element) {
    document.getElementById('delete-confirm-popup').style.display="block";
    confirmDeleteBtn.onclick = () => {
        getParentElement(element);
        document.getElementById('delete-confirm-popup').style.display="none";
        return;
    }
    cancelDeleteBtn.onclick = () => {
        document.getElementById('delete-confirm-popup').style.display="none";
        return;
    }
}

function getParentElement(element) {
    divToDelete = element.closest('#single-card');
    divToDelete.remove();
}


function UnreadBook(title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = "Unread"
    this.info = function() {
        return `"${title} by ${author}, ${pages} pages, ${read}"`
    }
}

function ReadBook(title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = "Read"
    this.info = function() {
        return `"${title} by ${author}, ${pages} pages"`
    }
}

const theHobbit = new ReadBook('The Hobbit', 'J.R.R. Tolkien', '295', '9');

console.log(theHobbit.info());


closeAddBookPopup();
deleteBookclickEvent();
addBook();
checkForSubmitBtn();