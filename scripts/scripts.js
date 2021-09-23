// Create and namespace object to store our variables and methods.
const libraryApp = {};
// Create an init funtion
//  -This function will call the API call function
libraryApp.form = document.querySelector('form');
libraryApp.ulElement = document.querySelector('.bookResult');

libraryApp.init = () => {
libraryApp.getBooks();
}

  
// Write a function to make an api call
//  - Attach an event listener to the button so that when the user clicks, it makes the an 
//    API call using the selection from the dropdown menu as a parameter to get 10 results
libraryApp.getBooks = () => {
  libraryApp.form.addEventListener('submit', function(event){
    event.preventDefault();
    const formInput = document.querySelector('select');
    const userInput = formInput.value;

    fetch(`https://openlibrary.org/subjects/${userInput}.json?limit=100`)
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      // call display function goes here
      libraryApp.ulElement.innerHTML = '';
      libraryApp.hundredBooks = jsonResponse.works;
      libraryApp.bookDisplay();
    })
  });
} 

// Write a function to display the results
libraryApp.bookDisplay = () => {
  const tenBooks = [];
  
  // forloop to display 10 results at a time and keep adding 10
  for(let i = 0; i < 10; i++) {
    tenBooks.push(libraryApp.hundredBooks.shift());
  }
  //  - Write a for each loop, that will create a new Li element for each result,
  //    and display the cover, author, publication, and title in the <Li>
  tenBooks.forEach((book) => {
    //  - Get the title, the cover, the author and the publication year and store each in variables.
    const bookTitle = book.title;
    const bookAuthor = book.authors[0].name;
    const bookCover = `http://covers.openlibrary.org/b/id/${book.cover_id}.jpg`;
    const newLiElement = document.createElement('li');
    newLiElement.innerHTML = 
    `<li>
    <img src="${bookCover}" alt="Cover for ${bookTitle}">
    <p class="bookTitle">${bookTitle}</p>
    <p class="bookAuthor">${bookAuthor}</p>
    </li>  
    `
    //  - Append the new <Li> elements to the page
    
    libraryApp.ulElement.append(newLiElement)
  });
};

libraryApp.moreBooksButton = document.querySelector('.viewMore');
libraryApp.moreBooksButton.addEventListener('click', () => {
    libraryApp.bookDisplay();
  });




  
// Put the init function at the bottom of our JS script file. 

libraryApp.init()

// Add event listener for "click" to the get more books button


// STRETCH GOAL PSEUDOCODE
// Add eventlistener to click on book cover img needs event.target?
//  - Get the key property value from the book object
//  - make an API call to the openlibrary.works/${key}
//      -store the description property in a variable
//  - display the description/summary of the book in a modal
//      -Create a div for the modalBackground
//      -Create a div for the modal itself
//      -on "Click" change display to visible for background and modal
