
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

async function Createworks(){
  const work = await getProjects()
    // Récupération de l'élément du DOM qui accueillera les galeries
    const sectiongallery = document.querySelector(".gallery");
    sectiongallery.innerHTML=""
// console.log(sectiongallery)
work.forEach(picture => {

  // Création d’une balise dédiée à une image de la galerie
  const figure = document.createElement("figure");
  const image = document.createElement("img");
  image.src = picture.imageUrl;
  const title = document.createElement("figcaption");
  title.innerText = picture.title;
  
  // On rattache la balise article a la section Fiches
  sectiongallery.appendChild(figure);
  // On rattache l’image à figure (la balise figure)
  figure.appendChild(image);
  figure.appendChild(title);
 });
}
Createworks()


// 2. récuperations des tableau de categories//

async function getcategory(){
  const categories=await fetch("http://localhost:5678/api/categories");
  return await categories.json();
}
getcategory()

//creation des boutons //

async function categoriesbouton() {
  const categoriebouton = await getcategory();

  for (let i = 0; i < categoriebouton.length; i++) {
  const sectionfilters = document.querySelector(".filtres");
    const boutton = categoriebouton[i];
    //creations des boutons //
    const btn = document.createElement("button");
    btn.classList.add("button")
    btn.textContent = boutton.name;
    btn.id = boutton.id;
    sectionfilters.appendChild(btn);
  }
}
categoriesbouton();

// Trie par classe sur les boutons filtres
async function displayByCategory() {
  const sectiongallery = document.querySelector(".gallery");
  const works = await getProjects();
  const buttons = document.querySelectorAll(".filtres button");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const btnId = e.target.id;
      console.log(btnId);
     /*sectiongallery.innerHTML = "";
      works.forEach((work) => {
        if (btnId == work.categoryId) {
          Createworks()
          // console.log(work);
        }
        if (btnId == "0") {
          Createworks();
         
        }
      });*/
    });
  });
}
displayByCategory()