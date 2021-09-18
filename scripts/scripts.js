// Create and namespace object to store our variables and methods.
const libraryApp = {};
// Create an init funtion
//  -This function will call the API call function
libraryApp.form = document.querySelector('form');

libraryApp.init = () => {
libraryApp.getBooks();
}


  
// Write a function to make an api call
libraryApp.getBooks = () => {
  libraryApp.form.addEventListener('submit', function(event){
    event.preventDefault();
    fetch('https://openlibrary.org/subjects/fantasy.json')
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      console.log(jsonResponse)
    })
  });
}
//  - Attach an event listener to the button so that when the user clicks, it makes the an 
//    API call using the selection from the dropdown menu as a parameter to get 10 results
//  - Store the results of the API call in an array
//  - Then this function will call the Display Results Function PASSING the Array as an arugment.

// Write a function to display the results
//  - Get the title, the cover, the author and the publication year and store each in variables.
//  - Write a for each loop, that will create a new Li element for each result,
//    and display the cover, author, publication, and title in the <Li>
//  - Append the new <Li> elements to the page

// Put the init funtion at the bottom of our JS script file. 

libraryApp.init()