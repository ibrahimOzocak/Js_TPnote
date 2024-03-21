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
                const pNom = document.createElement('p');

                // Creer div + class
                const divDescription = document.createElement('div');
                divDescription.classList.add('description');

                // Creer div + class
                const divAnime = document.createElement('div');
                divAnime.classList.add('anime');
                const pAnime = document.createElement('p');

                // Ajout dans les divs
                pNom.textContent = item.nom;
                divNom.appendChild(pNom);
                divDescription.textContent = item.description;
                pAnime.textContent = item.anime;
                divAnime.appendChild(pAnime);

                // Ajout des divs dans le container
                listItem.appendChild(divNom);
                listItem.appendChild(divDescription);
                listItem.appendChild(divAnime);
                dataContainer.appendChild(listItem);

                listItem.addEventListener('click', function() {
                    dataContainer.innerHTML = '';
                    console.log(item);
                });
            });
        })
        .catch(error => console.error('Erreur lors du chargement des données JSON:', error));
});