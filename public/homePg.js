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
  const title = document.querySelector("#search");

  ntitle = title.value.split(' ').join('+');
    console.log(ntitle);

    console.log(title.value);

    const urlToFetch = `https://openlibrary.org/search.json?title=${ntitle}`

   fetch(urlToFetch)
    .then(response => response.json())
    .then(myJson => {
    console.log(myJson)
    
        for (let i=0; i < 5 && i < myJson.docs.length; i++) {
            if (myJson.docs[i].isbn != undefined) {
            const imgUrl = `https://covers.openlibrary.org/b/isbn/${myJson.docs[i].isbn[0]}-L.jpg`;
            const imageHolder = document.querySelector("#imageholder");
            imageHolder.innerHTML += `
            <section>
                 <button class="results" onclick="descript(i)">
                    <img class="res" src="${imgUrl}" />
                    <p>${myJson.docs[i].title}</p>
                </button>
            </section>
            `
            }
        }
    

     })};

     const descript = (num) => {

     }

    //https://openlibrary.org${myJson.docs[0].key}
