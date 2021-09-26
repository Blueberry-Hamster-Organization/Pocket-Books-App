// Create and namespace object to store our variables and methods.
const libraryApp = {};
// Create an init funtion
//  -This function will call the API call function
libraryApp.form = document.querySelector('form');
libraryApp.ulElement = document.querySelector('.bookResult');

libraryApp.init = () => {
libraryApp.getBooks();
libraryApp.infoIcon();
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
      libraryApp.moreBooksButton.classList.toggle('show')
      libraryApp.moreBooksButton.classList.remove('viewMore')
      libraryApp.arrowUp.classList.remove('hide')
      
    })
  });
} 

// Write a function to display the results
libraryApp.bookDisplay = () => {
  const tenBooks = [];
  
  // forloop to display 10 results at a time and keep adding 10
  for(let i = 0; i < 8; i++) {
    tenBooks.push(libraryApp.hundredBooks.shift());
  }
  //  - Write a for each loop, that will create a new Li element for each result,
  //    and display the cover, author, publication, and title in the <Li>
  tenBooks.forEach((book) => {
    //  - Get the title, the cover, the author and the publication year and store each in variables.
    const bookTitle = book.title;
    const bookAuthor = book.authors[0].name;
    const bookCover = `http://covers.openlibrary.org/b/id/${book.cover_id}.jpg`;
    const bookKey = book.key;
    
    const newLiElement = document.createElement('li');
    newLiElement.innerHTML = 
    `
    <img src="${bookCover}" alt="Cover for ${bookTitle}" class="coverImage" id=${bookKey} tabindex="0">
    <p class="bookTitle">${bookTitle}</p>
    <p class="bookAuthor">${bookAuthor}</p>
    `
    //  - Append the new <Li> elements to the page
    libraryApp.ulElement.append(newLiElement)
    libraryApp.modalFunction(book)
    
    // Handle error when there are no more books to be displayed
    if (libraryApp.hundredBooks.length === 0)  {
      libraryApp.moreBooksButton.textContent = "Sorry No More Books!"
    } else {
      libraryApp.moreBooksButton.textContent = "Get More Books!"
    }
    
  });
}


// Get more books displayed each time we click the get more books button
libraryApp.moreBooksButton = document.querySelector('.viewMore');
libraryApp.moreBooksButton.addEventListener('click', () => {
  libraryApp.bookDisplay();
});

// Display an arrow to help the user get back to the top of the page
libraryApp.arrowUp = document.querySelector('.arrowUp')

libraryApp.modalFunction = (book) => {
  // make API call using book key
  
  const bookCover = document.getElementById(book.key)
  bookCover.addEventListener('click', () => {
    fetch(`https://openlibrary.org${book.key}.json`)
      .then((response) => {
      return response.json()
    }).then((jsonResponse) => {
      
      // conditional statement to display error message when no description is available
      const errorText = "Sorry! No description exists on Open Library for this book. Maybe you could add it!"
      const modalText = document.querySelector('.modalText');
        if (jsonResponse.description != undefined){
            if(jsonResponse.description.value != undefined){
                modalText.innerHTML = '';
                modalText.append(jsonResponse.description.value);
            }else{
                modalText.innerHTML = '';
                modalText.append(jsonResponse.description);
            }
        }
        else{
            modalText.innerHTML = '';
            modalText.append(errorText);
        }

      const modalBackground = document.querySelector('.modalBackground');
      modalBackground.classList.toggle('show');

      const closeButton = document.querySelector('.closeModalButton');
      closeButton.addEventListener('click', () => {
        modalBackground.classList.remove('show');
      })
    })
  })
}

// function to display and hide Menu section
libraryApp.infoIcon = () => {
  const infoIcon = document.querySelector('.infoIcon');
  const infoMenu = document.querySelector('.infoMenu');
  infoIcon.addEventListener('click', () => {
    infoMenu.classList.toggle('hide');
  })

  const closeInfoMenu = document.querySelector('.closeInfoMenu');
  closeInfoMenu.addEventListener('click', () => {
    infoMenu.classList.toggle('hide');
  })
}

// Put the init function at the bottom of our JS script file. 

libraryApp.init()