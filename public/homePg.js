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

    const imgUrl = `http://covers.openlibrary.org/b/isbn/${myJson.docs[0].isbn[0]}-L.jpg`;
    console.log(imgUrl);
    const imageHolder = document.querySelector("#imageholder");
    imageHolder.innerHTML = `<img src="${imgUrl}" />`
    })};

    //https://openlibrary.org${myJson.docs[0].key}
