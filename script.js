/*-----------------------------------
--------    Add New Books   ---------
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
deleteBookBtnEvent();
addBook();