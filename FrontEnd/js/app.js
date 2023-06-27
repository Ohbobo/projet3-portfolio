import { PortfolioModel } from "./PortfolioModel.js";
import { PortfolioView } from "./PortfolioView.js";

import { adminMode } from "./functions/admin.js";

import { initModal } from "./functions/modalManagement.js";

const model = new PortfolioModel();
const view = new PortfolioView(model);

const app = async () => {

    await model.fetchData();
    view.updateData();  
    view.events();
    
    initModal(); // Gestion du modal

    adminMode(); // Session admin lorsqu'on est connecté
}

app();

// Revenir page accueil quand logout ?
// mettre alert quand input pas rempli ou laisser message navigateur ?

