//admin mode
const logBtn = document.querySelector('.navbar-content__link-login');
const editBar = document.querySelector('.edit-bar');
const modifContainer = document.querySelectorAll('.modif-content');
const filtersContainer = document.querySelector('.filters-container');

export const adminMode = () => {
    const user = localStorage.getItem('user');
    if (user) {
        //afficher la barre d'ajout si user connecté
        editBar.classList.add('active'); 
        //Bouton deconnexion 
        logBtn.innerHTML="logout";
        //enlever boutons filtres en mode admin
        filtersContainer.classList.add('active');
        //boutons modifier
        modifContainer.forEach(el => {el.classList.add('active')});
    } else {
        editBar.classList.remove('active');
        logBtn.innerHTML="login";
        filtersContainer.classList.remove('active');
 
    }
    
}

//deconnexion
logBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
});