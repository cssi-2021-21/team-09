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
    const imageHolder = document.querySelector("#imageholder");
    imageHolder.innerHTML = ``;

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
            
            const atitle = myJson.docs[i].title;
            const akey = myJson.docs[i].key; 
            imageHolder.innerHTML += `
            <section>
                 <button class="button results" onclick="descript(${i}, '${atitle.replace(/'/g, "\\'")}', '${imgUrl}', '${akey}')">
                    <p>${atitle}</p>
                </button>
            </section>
            <section class="break">
            </section>
            `
            }
        }
    

     })};

     const descript = (num, atitle, imgUrl, akey) => {
         let redModal = document.getElementById('redModal');
         redModal.classList.toggle('is-active');
         const mtitle = document.querySelector("#mtitle");
         mtitle.innerHTML = `${atitle}`
         const mimage = document.querySelector("#mimage");
         mimage.innerHTML = `
         <img src="${imgUrl}"/>`
         const mbody = document.querySelector("#mbody");

         const url = `https://openlibrary.org${akey}.json`

         fetch(url)
        .then(response => response.json())
        .then(aJson => {
         console.log(aJson)
            let text;

         if (!aJson.description.value) {
            text  = aJson.description;
         }
         else { 
            text  = aJson.description.value;
         }
         mbody.innerHTML = `
         <p>${text}</p>
         <button class="button" onclick="checkOut(${num}, '${atitle.replace(/'/g, "\\'")}', '${imgUrl}', '${akey}')">Check Out</button>
         `
        })
     }

     const closeRedModal = () => {
        let redModal = document.getElementById('redModal');
        redModal.classList.toggle('is-active'); 
    }

     const checkOut = (num, atitle, imgUrl, akey) => {
         const payload = {
            number: num,
            title: atitle,
            image: imgUrl,
            key: akey
        };

        firebase
        .database()
        .ref(`users/${googleUser.uid}`)
        .push(payload);

        console.log("Submitted!")
     }     


