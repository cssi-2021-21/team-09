console.log("reached!")

let googleUserId;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      viewBooks(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html';
    };
  });
};

const viewBooks = (userId) => {
    const books = document.querySelector("#books");
    const booksRef = firebase.database().ref(`users/${userId}`);
    booksRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        for (let key in data) {
            const image = data[key].image;
            const title = data[key].title;
            console.log(data[key].image)
            console.log(data[key].title)
            console.log(data)
            books.innerHTML += `
            <div class="row">
                <div class="column">
                    <img src="${image}"/>
                </div>
                <div class="column">
                    <p>${title}</p>
                </div>
                <div class="column">
                    <button class="button" onclick="deleteBook('${key}')">Delete</button>
                </div>
            </div>
            `
        }
    })
}

const deleteBook = (id) => {
    console.log("reached")
    console.log(googleUserId, id)
    firebase.database().ref(`users/${googleUserId}/${id}`).remove();
    const books = document.querySelector("#books");
    books.innerHTML = ``;
    viewBooks(googleUserId);
}
