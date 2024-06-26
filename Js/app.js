import Home from "./pages/Home.js";
import Details from "./pages/Details.js";
import Error404 from "./pages/Error404.js";
import Favoris from "./pages/Favoris.js";

import Utils from "./Services/Utils.js";

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/': Home,
    '/details/:id': Details,
    '/favoris' : Favoris
};

let pageInstance = null;

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
    // Lazy load view element:
    const content = null || document.getElementById('content');
    // Render the page from URL
    let request = Utils.parseRequestURL()
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;
    if (page === Home) {
        pageInstance = new Home();
        content.innerHTML = await pageInstance.render();
        await pageInstance.bindEventListeners();
    }
    else if (page === Details) {
        let pageInstance = new Details();
        content.innerHTML = await pageInstance.render(request.id);
    }
    else if (page === Favoris) {
        let pageInstance = new Favoris();
        content.innerHTML = await pageInstance.render(JSON.parse(localStorage.getItem('listeFavoris')));
        await pageInstance.bindEventListeners();
    }
    else {
        content.innerHTML = await page.render();
    }

}

export async function chargementPages() {
    content.innerHTML = await pageInstance.render();
    await pageInstance.bindEventListeners();
}

export async function chargementPagesRecherche(listePerso) {
    content.innerHTML = await pageInstance.render(listePerso);
    await pageInstance.bindEventListeners();
}
export async function chargementPagesFavoris() {
    let pageInstance = new Favoris();
    content.innerHTML = await pageInstance.render(JSON.parse(localStorage.getItem('listeFavoris')));
    await pageInstance.bindEventListeners();
}

export { pageInstance };


// Listen on hash change:
window.addEventListener('hashchange', router);
window.addEventListener('load', router);