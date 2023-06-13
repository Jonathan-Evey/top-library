# top-library
Library project from The Odin Project

https://jonathan-evey.github.io/top-library/

Completed all tasks to meet the assignment requirements.

 Added books will not be saved once the page is closed. Planing to come back and work on log-in functionality.


Assignment

    If you haven’t already, set up your project with skeleton HTML/CSS and JS files.

    All of your book objects are going to be stored in a simple array, so add a function to the script (not the constructor) that can take user’s input and store the new book objects into an array. Your code should look something like this:

    let myLibrary = [];

    function Book() {
      // the constructor...
    }

    function addBookToLibrary() {
      // do stuff here
    }

Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own “card”. It might help for now to manually add a few books to your array so you can see the display.

Add a “NEW BOOK” button that brings up a form allowing users to input the details for the new book: author, title, number of pages, whether it’s been read and anything else you might want.

Add a button on each book’s display to remove the book from the library.

    You will need to associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the index of the library array.

Add a button on each book’s display to change its read status.

    To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.
