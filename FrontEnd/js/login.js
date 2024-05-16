/*****page de conexion js*****/
const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("password");


/********Ecouteur d'évènement du Form de conexion***********/
// recupération de l'email et du password via les inputs
form.addEventListener("submit", (e) => {
    e.preventDefault();
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
 //stockage des informations dans le local storage

});






  
