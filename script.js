// 1- When users load the app for the first time, a list of 3 books minimum should already be present on the list. The list will always be generated dynamically with some state in the javascript.

// 1-a Create an object that contain 3 arrays of books
// 2-b Map through them to access thier value


// 2- Users should be able to change the read attribute status by clicking the checkbox (and the changes will be reflected in the app state)
//2-a Check if the checkbox is checked and change the status
//2-b The same if it's not checked

// 3- Users should be able to delete a book from the list by clicking the trash icon (and reflect that in the app state as well)
//3-a Delete button

// 4- When a user come back to the app with the same browser, they should see the same book list as it was, before they left the app. Save the current book list to your browser's Local Storage.
// 4-a Create a custom event to store the list of books in the Local Storage