import PersonnageProvider from "../Services/PersonnageProvider.js";
import { chargementPages } from "../app.js";


export default class Home {
    constructor() {
        this.firstIdPersonnage = 0;
        this.LastIdPersonnage = 4;
        this.personnages = [];
        this.content = "";
    }

    async loadData() {this.personnages = await PersonnageProvider.fetchPersonnages();}


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

    async render(defaultParametre = PersonnageProvider.fetchPersonnages()) {
        await this.loadData();
        const personnages = await this.nbrPersoParPage() || defaultParametre;
    
        const listePersoContent = await this.getPersoList(personnages);
    
        return `
            <input type="search" id="search" placeholder="Rechercher un personnage">
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
                </div>
                <div class="personnage-anime">
                    <p>${personnage.anime}</p>
                </div>
            </div>
        `).join('\n');
    
        this.content.innerHTML = innerHTML;
    
        return this.content;
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
        const nomSearched = e.target.value.toLowerCase();
        const recherche = this.personnages.filter(personnage => {
            return personnage.nom.toLowerCase().includes(nomSearched);
        });
        console.log("recherche", recherche);
        this.content.innerHTML = await this.render(recherche);
        this.bindEventListeners();
    }
    

        async bindEventListeners() {
        document.getElementById('previousPageButton').addEventListener('click', async () => {
            await this.previousPage();
        });
    
        document.getElementById('nextPageButton').addEventListener('click', async () => {
            await this.nextPage();
        });

        document.getElementById('search').addEventListener('input', async (e) => {
            await this.searchPersonnage(e);
        });
    }
}
