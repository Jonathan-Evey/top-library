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
            document.getElementById("book-pages").value,
            document.getElementById('book-rating').value
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
        myLibrary.push(book);
        console.log(myLibrary);
    }
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
const removeBookBtn = document.getElementById('remove-book-btn');

function getParentElement(removeBookBtn) {
    divToDelete = removeBookBtn.closest('#single-card');
    divToDelete.remove();
}

const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const cancelDeleteBtn = document.getElementById('cancel-delete-btn');

function confirmDelete(removeBookBtn) {
    document.getElementById('delete-confirm-popup').style.display="block";
    confirmDeleteBtn.onclick = () => {
        getParentElement(removeBookBtn);
        document.getElementById('delete-confirm-popup').style.display="none";
        return;
    }
    cancelDeleteBtn.onclick = () => {
        document.getElementById('delete-confirm-popup').style.display="none";
        return;
    }
}

function deleteBookBtnEvent() {
    removeBookBtn.addEventListener('click', () => {
        confirmDelete(removeBookBtn);
    })
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

function ReadBook(title, author, pages, rating) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = "Read"
    this.rating = rating
    this.info = function() {
        return `"${title} by ${author}, ${pages} pages, ${rating}"`
    }
}

const theHobbit = new ReadBook('The Hobbit', 'J.R.R. Tolkien', '295', '9');

console.log(theHobbit.info());


closeAddBookPopup();
deleteBookBtnEvent();
addBook();
checkForSubmitBtn();