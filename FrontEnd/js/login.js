/*****page de conexion js*****/
const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const logOut = document.getElementById("login-link");


/********Ecouteur d'évènement du Form de conexion***********/
// recupération de l'email et du password via les inputs
form.addEventListener("submit",async (e) => {
    e.preventDefault();
    resetFormStyles();
    const userEmail = email.value;
    const userPassword = password.value;

     const login ={
        email : userEmail,
        password : userPassword,
       
     }
    

     const user =JSON.stringify(login);
     /****Envoi de la requette****/
  fetch("http://localhost:5678/api/users/login", {

    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: user,
  })


    // recupération de la réponse de la base de donnée
    .then((response) => {
       // console.log(response);
        if (!response.ok) {
          email.style.border = "2px solid #FF0000";
          password.style.border = "2px solid #FF0000";
          const errorLogin = document.querySelector("p");
          errorLogin.textContent =
            "Le mot de passe ou l'identifiant que vous avez fourni est incorrect.";
          throw new Error("Le mot de passe ou l'identifiant que vous avez fourni est incorrect.");
        }
        return response.json(); // Cela parse la réponse JSON
      })
 //stockage des informations dans le local storage
 .then((data) => {

    // Récupération des donnés Token et id de l'utilisateur une fois la reponse terminé
    const userId = data.userId;
    const userToken = data.token;
    //console.log(userToken);
    window.sessionStorage.setItem("token", userToken);
    window.sessionStorage.setItem("userId", userId);
    window.location.href = "index.html";
  })
  .catch((error) => {
    console.error("Une erreur est survenue : ", error);
  });

  
  function resetFormStyles() {
    email.style.border = "none";
    password.style.border = "none";
    const errorLogin = document.querySelector("p");
    if (errorLogin) {
      errorLogin.textContent = "";
    }
  }
});






  
