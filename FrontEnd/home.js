import { works } from "../Backend/models";

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

function CreateProject(works){
    for (let i = 0; i < works.length; i++) {

        const article = works[i];
        // Récupération de l'élément du DOM qui accueillera les galeries
        const sectiongallery = document.querySelector(".gallery");
        // Création d’une balise dédiée à une image de la galerie
        const figure = document.createElement("figure");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        const titleElement = document.createElement("h2");
        titleElement.innerText = article.title;
      
        // On rattache la balise article a la section Fiches
        sectiongallery.appendChild(figure);
        // On rattache l’image à figure (la balise figure)
        figure.appendChild(imageElement);
        figure.appendChild(titleElement);
       
     }
}

CreateProject(works)


