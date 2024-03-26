import PersonnageProvider from "../Services/PersonnageProvider.js";

export default class Home {
    async render() {
        let personnages = await PersonnageProvider.fetchPersonnages();
        return `
            <h1>Les Personnages</h1>
            <link rel="stylesheet" href="../../Css/home.css">
            <div id="liste-perso">
                ${personnages.map(personnage => `
                    <div class="personnage">
                        <div class="personnage-nom">
                            <p>${personnage.nom}</p>
                        </div>
                        <div class="personnage-description">
                            ${personnage.description}
                            <p class="lien"><a href="/#/personnage/${personnage.id}">Voir plus</a></p>
                        </div>
                        <div class="personnage-anime">
                            <p>${personnage.anime}</p>
                        </div>
                    </div>
                    `
                    ).join('\n')}
            </div>
        `;
    }
}
