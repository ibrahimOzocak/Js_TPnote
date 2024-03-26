import PersonnageProvider from "../Services/PersonnageProvider.js";

export default class Details {
    async render(id) {
        let personnage = await PersonnageProvider.fetchPersonnage(id);
        return `
            <link rel="stylesheet" href="../../Css/Detail.css">
            <h1>${personnage.nom}</h1>
        `;
    }
}
