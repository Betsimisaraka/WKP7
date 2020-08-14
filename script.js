
// 1-a Create an object that contain 3 arrays of books
const books = [
    {
        title: 'Harry Porter',
        author: 'Ally',
        genre: 'Romence',
        pages: 200,
        status: true,
        id: 01,
    },
    {
        title: 'Twilight',
        author: 'Edward',
        genre: 'Horor',
        pages: 400,
        status: false,
        id: 02,
    },
    {
        title: 'Kira-Kira',
        author: 'Nicola',
        genre: 'Thriller',
        pages: 300,
        status: true,
        id: 03,
    }
]
// 2-b Map through them to access thier value
const formElement = document.querySelector('.book_form');
const listElement = document.querySelector('.book_list');
const addButton = document.querySelector('.addbtn');

const handleBookList = () => {
    const html = books.map(
        book => `
            <li class="list_items">
                <p class="title">${book.title}</p>
                <p class="author">${book.author}</p>
                <p class="genre">${book.genre}</p>
                <p class="pages">${book.pages}</p>
                <input type="checkbox" class="checkbox" ${book.status ? 'checked' : ''}>
                <button class="delete">&times</button>
            </li>
        `).join('');
    listElement.innerHTML = html;
};

//Add a new book form the input value
let newBook = [];
const handleAddBtn = e => {
    e.preventDefault();
    const details = e.currentTarget;
    const bookTitle = details.title.value;
    const bookAuthor = details.author.value;
    const bookGenre = details.genre.value;
    const bookPages = details.numbers.value;
    const bookStatus = details.status.value;
    if (bookStatus.value === 'Not yet read') {
        return status = false;
    }
    if (bookStatus.value === 'Read') {
        return status = true;
    }
    const book = {
        title: bookTitle,
        author: bookAuthor,
        genre: bookGenre,
        pages: bookPages,
        status: bookStatus,
        id: Date.now(),
    }
    newBook.push(book);
    console.info(`There are now ${books.length} in your state`);
    e.target.reset();
     listElement.dispatchEvent(new CustomEvent('bookUpdated'));
}

const display = e => {
const html = newBook.map(
    book => `
        <li class="list_items">
            <p class="title">${book.title}</p>
            <p class="author">${book.author}</p>
            <p class="genre">${book.genre}</p>
            <p class="pages">${book.pages}</p>
            <input type="checkbox" class="checkbox" ${book.status ? 'checked' : ''}>
            <button class="delete">&times</button>
        </li>
    `).join('');
listElement.insertAdjacentHTML('afterend', html);
}

listElement.addEventListener('bookUpdated', display);

formElement.addEventListener('submit', handleAddBtn);
window.addEventListener('DOMContentLoaded', handleBookList);

//Delete button

 
// 4- When a user come back to the app with the same browser, they should see the same book list as it was, before they left the app. Save the current book list to your browser's Local Storage.
// 4-a Create a custom event to store the list of books in the Local Storage