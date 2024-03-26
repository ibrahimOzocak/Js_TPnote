const ENDPOINT = 'http://localhost:3000/personnages'

export default class PersonnageProvider {

    static fetchPersonnages = async (limit=10) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`${ENDPOINT}?_limit=${limit}`, options)
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Erreur lors du chargement des données',error)
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