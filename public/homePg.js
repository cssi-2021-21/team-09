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
  const title = document.querySelector("#search");
  console.log(title.value)
  firebase
    .database()
    .ref()
    .push(title);
};
  
