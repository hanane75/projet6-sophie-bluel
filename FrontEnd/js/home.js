
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
const sectionPortfolio = document.querySelector("#portfolio");
const title = document.querySelector("#portfolio h2");
const modal = document.getElementById("myModal");
const modalContent = modal.querySelector(".modal-content");
function logginAdmin() {
  if (user) {
    // Modifications si L'utilisateur est connecté
    //console.log("L'utilisateur est connecté");
    logOut.textContent = "logout";
    sectionfilters.style = "display:none";
    // Créer un élément bouton
    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    /*modal****/

 // Sélectionner la modale et le bouton de fermeture
 const modal = document.getElementById("myModal");
 const closeButton = modal.querySelector(".close");

 // Ajouter un événement de clic au bouton "modifier"
 editButton.addEventListener("click", function() {
     modal.style.display = "block";
 });

 
 // Ajouter un événement de clic au bouton de fermeture
 closeButton.addEventListener("click", function() {
  modal.style.display = "none";
});

// Fermer la modale si l'utilisateur clique en dehors de celle-ci
window.addEventListener("click", function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
});
    // Créer une icône Font Awesome
    const icon = document.createElement("i");
    icon.className = "fa-regular fa-pen-to-square icon";

    // Créer le texte "modifier"
    const buttonText = document.createElement("span");
    buttonText.textContent = "modifier";

    // Ajouter l'icône et le texte au bouton
    editButton.appendChild(icon);
    editButton.appendChild(buttonText);

    // Ajouter le bouton juste après l'élément h2
    title.insertAdjacentElement("afterend", editButton);
  } else {
    // L'utilisateur n'est pas connecté
    logoutAdmin();
  }
}
logginAdmin();

function logoutAdmin() {
  logOut.addEventListener("click", () => {
    if (user) {
      window.sessionStorage.setItem("token", "");
      logOut.textContent = "login";
      window.sessionStorage.setItem("userId", "");
      window.location.href = "index.html";
    } else {
      //renvoi sur page conexion
      window.location.href = "login.html";
    }
  });
}
logoutAdmin();
const modalGallery=document.querySelector(".modalGallery")
// récupération des works & appel de la fonction de création de works dans la gallery de la modal
function displayWorksModal() {
  modalGallery.innerHTML = "";
  getProjects().then((works) => {
    //Boucle qui parcours  nos works
    // console.log(works);
    works.forEach((work) => {
      createWorkModal(work);
    });
    deleteWork();
  });
}
displayWorksModal();
// création des balises et injection des donnés a partir du fetchWorks
function createWorkModal(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const span = document.createElement("span")
  const trash = document.createElement("i");
  trash.classList.add("fa-solid", "fa-trash-can");
  trash.id = work.id;
  img.src = work.imageUrl;
  img.alt = work.title;
  span.appendChild(trash)
  figure.appendChild(img);
  figure.appendChild(span);
  modalGallery.appendChild(figure);
}

//Supression des works grace a la méthode DELETE & au Token user depuis la poubelle de la modale
//Objet de paramétrage pour requette DELETE avec token
const deleteWorkID = {
  method: "DELETE",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "same-origin",
};

function deleteWork() {
  const trashs = document.querySelectorAll(".fa-trash-can");
 // console.log(trashs); // Vérifiez que les éléments sont bien sélectionnés

  trashs.forEach(trash => {
    trash.addEventListener("click", (e) => {
      const workID = trash.id; // Assurez-vous que l'ID est correct
      fetch(`http://localhost:5678/api/works/${workID}`, deleteWorkID)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(() => {
          // Suppression de l'élément du DOM après suppression réussie
          const workItem = trash.closest('li');
          if (workItem) {
            workItem.remove();
          }
          // Mise à jour de la modal ou de la galerie principale
          displayWorksModal();
        })
        .catch(error => {
          console.error('Il y a eu un problème avec la requête fetch:', error);
        });
    });
  });
}

// Appel de la fonction deleteWork pour ajouter les écouteurs d'événements
deleteWork();

//fonction d'affichage au click sur btn:"ajouter-photo" de la modalAddWorks
function displayModalAddWorks() {
  const buttonAddPhoto = document.querySelector(".container-button button");
  const modalAddWorks = document.querySelector(".modalAddWorks");
  buttonAddPhoto.addEventListener("click", () => {
    modal.style.display = "none";
    modalAddWorks.style.display = "flex";
  });
}
displayModalAddWorks();

