import PersonnageProvider from "../Services/PersonnageProvider.js";
import { chargementPages } from "../app.js";
import { chargementPagesRecherche } from "../app.js";


export default class Home {
    
    constructor() {
        this.firstIdPersonnage = 0;
        this.LastIdPersonnage = 4;
        this.personnages = [];
        this.content = "";
    }

    async loadData() {
        this.personnages = await PersonnageProvider.fetchPersonnages();
    }

    async nbrPersoParPage() {
        let personnages = [];
        const listPerso = await PersonnageProvider.fetchPersonnages();
        for(let i = this.firstIdPersonnage; i < this.firstIdPersonnage + this.LastIdPersonnage; i++) {
            if(listPerso[i] === undefined) {
                break;
            }
            personnages.push(listPerso[i]);
        }
        return personnages;
    }

    async render(defaultParametre = []) {
        await this.loadData();

        let personnages;
        if ( defaultParametre.length == 0 ){
            personnages = await this.nbrPersoParPage();
        } else {
            personnages = defaultParametre;
        }

        const listePersoContent = await this.getPersoList(personnages);
    
        return `
            <div class="Chercher">
                <input type="search" id="search" placeholder="Rechercher un personnage">
                <button id="btSearch"> Rechercher </button>
            </div>
            <link rel="stylesheet" href="../../Css/home.css">
            ${listePersoContent.outerHTML}
            <div class="pagination">
                <button id="previousPageButton">Page précédente</button>
                <button id="nextPageButton">Page suivante</button>
            </div>
        `;
    }

    async getPersoList(personnages) {
        this.content = document.createElement('div');
        this.content.id = 'liste-perso';
    
        const innerHTML = personnages.map(personnage => `
            <div class="personnage">
                <div class="personnage-nom">
                    <img src="${personnage.image}" alt="${personnage.nom}" loading="lazy">
                    <p>${personnage.nom}</p>
                </div>
                <div class="personnage-description">
                    ${personnage.description}
                    <p class="lien"><a href="/#/Details/${personnage.id}">Voir plus</a></p>
                    <input type="number" id="note-${personnage.id}" min="0" max="10" placeholder="Entrez une note de 0 à 10">
                    <button id="ValiderNote/${personnage.id}"> Valider </button>
                    <p>Note actuelle: ${personnage.note !== undefined ? personnage.note : 'Aucune note'}</p>
                </div>
                <div class="personnage-anime">
                    <p>${personnage.anime}</p>
                </div>
            </div>
        `).join('\n');
    
        this.content.innerHTML = innerHTML;
        
        return this.content;
    }    

    async modifierNoteDansJson(personnageId, nouvelleNote) {
        try {
            const response = await fetch('http://localhost:3000/personnages');
            const data = await response.json();
            console.log(data);
            // Accéder au tableau de personnages dans l'objet 'data'
            const personnages = data;
    
            // Rechercher le personnage par ID
            let found = false;
            for (let i = 0; i < personnages.length; i++) {
                if (personnages[i].id === personnageId) {
                    // Mettre à jour la note du personnage
                    console.log(personnages[i].note, nouvelleNote, personnages[i])
                    personnages[i].note = nouvelleNote;
                    found = true;
                    break;
                }
            }
    
            if (found) {
                // Mettre à jour le fichier JSON sur le serveur
                const putResponse = await fetch(`http://localhost:3000/personnages/${personnageId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(personnages.find(personnage => personnage.id === personnageId)),
                });
                const updatedPersonnage = await putResponse.json();
    
                console.log(`La note du personnage avec l'ID ${personnageId} a été mise à jour avec succès.`);
                chargementPages();
            } else {
                console.log(`Personnage avec l'ID ${personnageId} non trouvé.`);
            }
        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
        }
    }

    async nextPage() {
        const listPerso = await PersonnageProvider.fetchPersonnages();
        if(this.firstIdPersonnage + this.LastIdPersonnage <= listPerso.length) {
            this.firstIdPersonnage += this.LastIdPersonnage;
            await this.nbrPersoParPage();
            this.content = "";
            await this.render();
            chargementPages();
        }
    }

    async previousPage() {
        if(this.firstIdPersonnage - this.LastIdPersonnage >= 0) {
            this.firstIdPersonnage -= this.LastIdPersonnage;
            await this.nbrPersoParPage();
            this.content = "";
            await this.render();
            chargementPages();
        }
    }

    async searchPersonnage(e) {
        const nomSearched = e.toLowerCase();
        const recherche = this.personnages.filter(personnage => {
            return personnage.nom.toLowerCase().includes(nomSearched);
        });
        console.log("recherche", recherche);
        this.content.innerHTML = await this.render(recherche);
        chargementPagesRecherche(recherche);
    }


    
    
    
    

    async bindEventListeners() {
        document.getElementById('previousPageButton').addEventListener('click', async () => {
            await this.previousPage();
        });
    
        document.getElementById('nextPageButton').addEventListener('click', async () => {
            await this.nextPage();
        });

        document.getElementById('btSearch').addEventListener('click', async () => {
            await this.searchPersonnage(await document.getElementById('search').value);
        });

        // Ajout de gestionnaires d'événements pour la notation
        this.personnages.forEach(personnage => {
            const noteInput = document.getElementById(`note-${personnage.id}`);
            const validerButton = document.getElementById(`ValiderNote/${personnage.id}`);

            if (noteInput && validerButton) {
                validerButton.addEventListener('click', async () => {
                    const note = parseInt(noteInput.value);
                    if (!isNaN(note) && note >= 0 && note <= 10) {
                        personnage.note = note;
                        this.modifierNoteDansJson(personnage.id, note);
                        this.content.innerHTML = await this.render();
                    } else {
                        alert("Veuillez entrer une note valide (entre 0 et 10).");
                    }
                });
            }
        });

    }
    
}
