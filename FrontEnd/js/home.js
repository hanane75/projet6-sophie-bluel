//variables 
const sectiongallery = document.querySelector(".gallery");
const sectionfilters = document.querySelector(".filtres");
//Récupérer dynamiquement les données des travaux via l’API
export async function getProjects() {

  try {

      const response = await fetch("http://localhost:5678/api/works/")
      const projects = await response.json()
      console.log(projects);
      return projects;
     
 } catch (error) {

     console.error("Erreur lors de la récupération des projets :", error)

     return []

 }

}
getProjects();
/**
 * 
 * @param {*} galerie 
 */
async function Createworks(galerie){   
  // Création d’une balise dédiée à une image de la galerie
  const figure = document.createElement("figure");
  const image = document.createElement("img");
  image.src = galerie.imageUrl;
  const title = document.createElement("figcaption");
  title.innerText = galerie.title;
  sectiongallery.appendChild(figure);
  // On rattache l’image à figure (la balise figure)
  figure.appendChild(image);
  figure.appendChild(title);
 };

 //affichages des works dans le DOM 

 async function displayGaleries() {
  const gallery = await getProjects();
  //console.log(gallery);
  sectiongallery.innerHTML="";
  gallery.forEach(galerie => {
    Createworks(galerie);
    
  });
 }
 displayGaleries();



// 2. récuperations des tableau de categories//

async function getcategory(){
  const categories=await fetch("http://localhost:5678/api/categories");
  const category = await categories.json();
  //console.log(category);
  return category;
}
getcategory()

//creation des boutons //

async function categoriesbouton() {
  const categoriebouton = await getcategory();
  for (let i = 0; i < categoriebouton.length; i++) {
  const sectionfilters = document.querySelector(".filtres");
    const boutton = categoriebouton[i];
    //console.log(boutton);
    //creations des boutons //
    const btn = document.createElement("button");
    btn.textContent = boutton.name;
    btn.id = boutton.id;
    btn.type="button";
    sectionfilters.appendChild(btn);
  }
  // Appel à GetByCategory() une fois que les boutons sont créés
  GetByCategory();
}
categoriesbouton();

// Trie par classe sur les boutons filtres 
/**
 * 
 */
async function GetByCategory() {
  const works = await getProjects();
  const buttons = document.querySelectorAll(".filtres button");
  console.log(buttons);
    buttons.forEach((btnn) => {
    btnn.addEventListener("click", (e) => {
      const btnId = e.target.id;
      console.log(btnId);
      
     sectiongallery.innerHTML = "";
     
        if (btnId !== "0") {
          const worksTriCategory = works.filter((galerie) => {
            return galerie.categoryId == btnId;
          });
          worksTriCategory.forEach((galerie) => {
            Createworks(galerie);
          });
        } else {
          displayGaleries();
        }
    });
  });
}

/*****Partie ou l'utilisateur et conecté*****/
// Variables pour la partie conexion
const token = window.sessionStorage.getItem("token");
const user = window.sessionStorage.getItem("userId");
const logOut = document.getElementById("login-link");

function logginAdmin() {
  if (user) {
    // Modifications si L'utilisateur est connecté
    //console.log("L'utilisateur est connecté");
    logOut.textContent = "logout";
    sectionfilters.style = "display:none";
  } else {
    // L'utilisateur n'est pas connecté
   
  }
}
logginAdmin();
