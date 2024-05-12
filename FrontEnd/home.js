
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
 work.forEach(element => {
  
    // Création d’une balise dédiée à une image de la galerie
    const figure = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = element.imageUrl;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = element.title;
    
    // On rattache la balise article a la section Fiches
    sectiongallery.appendChild(figure);
    // On rattache l’image à figure (la balise figure)
    figure.appendChild(imageElement);
    figure.appendChild(titleElement);
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
