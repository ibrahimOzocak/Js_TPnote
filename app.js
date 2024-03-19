document.addEventListener("DOMContentLoaded", function() {
    // Récupération des données JSON
    fetch('http://localhost:3000/personnages')
        .then(response => response.json())
        .then(data => {
            // Affichage des données dans la page HTML
            const dataContainer = document.querySelector('.ens_perso');
            dataContainer.innerHTML = '';

            data.forEach(item => {
                const listItem = document.createElement('div');

                // Creer div + class
                const divNom = document.createElement('div');
                divNom.classList.add('nom');

                // Creer div + class
                const divDescription = document.createElement('div');
                divDescription.classList.add('description');

                // Creer div + class
                const divAnime = document.createElement('div');
                divAnime.classList.add('anime');

                // Ajout dans les divs
                divNom.textContent = item.nom;
                divDescription.textContent = item.description;
                divAnime.textContent = item.anime;

                // Ajout des divs dans le container
                listItem.appendChild(divNom);
                listItem.appendChild(divDescription);
                listItem.appendChild(divAnime);
                dataContainer.appendChild(listItem);
            });
        })
        .catch(error => console.error('Erreur lors du chargement des données JSON:', error));
});

