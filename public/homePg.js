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

var submitButton = document.querySelector('#submit')

submitButton.addEventListener("click", (e) => {
  let myKey = 'IYqYCiQsg56e95srkAvtP3fiE8aH1AH9';
  let topic = queryField.value;
  const urlToFetch = `http://openlibrary.org/search.json?title=the+lord+of+the+rings`
  console.log(topic);
  console.log(urlToFetch);
  fetch(urlToFetch)
    .then(response => response.json())
    .then(myJson => {
    console.log(myJson)
    const imgUrl = myJson.data[0].images.original.url
    const i
