console.log("I'm working!")

let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};


const onSubmit = () => {
  console.log("submit button clicked");
  const urlToFetch = `https://openlibrary.org/search.json?title=the+lord+of+the+rings`
  const title = document.querySelector("#search");
  console.log(title.value)

   fetch(urlToFetch)
    .then(response => response.json())
    .then(myJson => {
    console.log(myJson)
    })};

