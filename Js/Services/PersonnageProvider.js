const ENDPOINT = 'http://localhost:3000/personnages'

export default class PersonnageProvider {

    static fetchPersonnages = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(ENDPOINT, options);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Erreur lors du chargement des données', error);
        }
    }

    static fetchPersonnagesTeste = async (startId, endId) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let url = ENDPOINT;
        
        // Ajoutez les paramètres d'ID de début et de fin à l'URL si spécifiés
        if (startId !== undefined && endId !== undefined) {
            url += `?startId=${startId}&endId=${endId}`;
        }
    
        try {
            const response = await fetch(url, options);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Erreur lors du chargement des données', error);
        }
    }
    

    static fetchPersonnage = async (id) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT}/${id}`, options)
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Erreur lors du chargement des données',error)
        }
    }

}