import PersonnageProvider from "../Services/PersonnageProvider.js";

export default class Details {
    async render(id) {
        let personnage = await PersonnageProvider.fetchPersonnage(id);
        return `
            <link rel="stylesheet" href="../../Css/detail.css">
            <h1>${personnage.nom}</h1>
            <div class="container-perso">
                <div class="personnage">
                    <div class="img-perso">
                        <img src="${personnage.image}" alt="${personnage.nom}" loading="lazy">
                    </div>
                    <div class="info-perso">
                        <p><strong>Anime : </strong>${personnage.anime}</p>
                        <p><strong>Genre : </strong>${personnage.genre}</p>
                        <div class="compétences">
                            <p><strong>Compétence 1 : </strong>${personnage.compétence1}</p>
                            <p><strong>Compétence 2 : </strong>${personnage.compétence2}</p>
                        </div>
                        <p><strong>Transformation : </strong>${personnage.transformation}</p>
                        <div class="equipement">
                            <p class="equipement-title"><strong>Equipement</strong></p>
                            <p><strong>Arme : </strong>${personnage.equipement.arme}</p>
                            <p><strong>Description : </strong>${personnage.equipement.description}</p>
                        </div>    
                    </div>
                    <div class="stats-perso">
                        <div class="stats-title"><p><Strong>Statistiques</strong></p></div>
                        <div class="force-def">
                            <p id="force">Force : <strong>${personnage.stats.force}</strong></p>
                            <p class="defense">Défense : <strong>${personnage.stats.defense}</strong></p>
                        </div>
                        <div class="agi-int">
                            <p>Agilite : <strong>${personnage.stats.agilite}</strong></p>
                            <p>Intelligence : <strong>${personnage.stats.intelligence}</strong></p>
                        </div>
                    </div>
                    <div class="perso-description">
                        <p><strong>Description : </strong></p>
                        <p>${personnage.description}</p>
                    </div>
                </div>

            </div>

        `;
    }
}
