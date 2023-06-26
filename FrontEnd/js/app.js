import { PortfolioModel } from "./PortfolioModel.js";
import { PortfolioView } from "./PortfolioView.js";

import { adminMode } from "./functions/admin.js";

import { initModal, previewImage} from "./functions/modalManagement.js";

const model = new PortfolioModel();
const view = new PortfolioView(model);

const app = async () => {

    await model.fetchData();
    view.updateData();  
    view.events();

    initModal();
    // Session admin lorsqu'on est connecté
    adminMode();

    //ouvrir la modal ajout photo + retour modal galerie au click
    const input = document.querySelector('.modal-form-image__input');
    input.addEventListener('change', previewImage);
}

app();