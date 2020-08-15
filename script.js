
// 1-a Create an object that contain 3 arrays of books
const books = [
    {
        title: 'Harry Porter',
        author: 'Ally',
        genre: 'Romence',
        pages: 200,
        status: true,
    },
    {
        title: 'Twilight',
        author: 'Edward',
        genre: 'Horor',
        pages: 400,
        status: false,
    },
    {
        title: 'Kira-Kira',
        author: 'Nicola',
        genre: 'Thriller',
        pages: 300,
        status: true,
    }
]
// 2-b Map through them to access thier value
const formElement = document.querySelector('.book_form');
const listElement = document.querySelector('.book_list');
const addButton = document.querySelector('.addbtn');

const handleBookList = e => {
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
}; handleBookList();

//Add a new book form the input value
const newBook =[];
const handleAddBtn = e => {
    e.preventDefault();
    const form = e.target;
    const bookTitle = form.title.value;
    const bookAuthor = form.author.value;
    const bookGenre = form.genre.value;
    const bookPages = form.numbers.value;
    const bookStatus = form.status.value;
    
    const myBook = {
        title: bookTitle,
        author: bookAuthor,
        genre: bookGenre,
        pages: bookPages,
        status: bookStatus,
        id: Date.now(),
    }
    newBook.push(myBook);
    console.info(`There are now ${newBook.length} in your state`);
    e.target.reset();
    listElement.dispatchEvent(new CustomEvent('booksUpdated'));
}

const displayList = e => {
    const myHtml = newBook.map(
        book => `
            <li class="list_items">
                <p class="title">${book.title}</p>
                <p class="author">${book.author}</p>
                <p class="genre">${book.genre}</p>
                <p class="pages">${book.pages}</p>
                <input type="checkbox" class="checkbox" ${book.status === 'read' ? 'checked' : ''}>
                <button value="${book.id}" class="delete">&times</button>
            </li>
        `).join('');
    listElement.insertAdjacentHTML('beforeend', myHtml);
} 

const mirrorToLocalStorage = () => {
    console.info('Keep the list appear');
    const local = JSON.stringify(newBook);
    localStorage.setItem('books', local);
}

const restoreFromLocalStorage = () => {
    console.info('restoring from LS');
    const lsBooks = JSON.parse(localStorage.getItem('books'));
    //check if there is something inside local storage
    if (lsBooks) {
        newBook.push(...lsBooks);
    }
    listElement.dispatchEvent(new CustomEvent('booksUpdated'));
};

formElement.addEventListener('submit', handleAddBtn);
listElement.addEventListener('booksUpdated', displayList);
listElement.addEventListener('booksUpdated', mirrorToLocalStorage);
//window.addEventListener('DOMContentLoaded', handleBookList);

const deleteBtn = event => {
    const id = event.target.value;
    if (event.target.classList.contains('delete')) {
        const deleteButton = event.target;
        deleteButton.closest('.list_items').remove();
    }
    console.log(id);
};

window.addEventListener('click', deleteBtn);

const markAsRead = (id) => {
    console.log('read', id);
    const bookRef = newBook.find(item => item.id === id);
    bookRef.status = !bookRef.status;
    listElement.dispatchEvent(new CustomEvent('booksUpdated'));
};

listElement.addEventListener('click', function(e) {
    if (e.target.matches('input[type="checkbox"]')) {
        markAsRead();
    }
})
// 4- When a user come back to the app with the same browser, they should see the same book list as it was, before they left the app. Save the current book list to your browser's Local Storage.
// 4-a Create a custom event to store the list of books in the Local Storage

restoreFromLocalStorage();