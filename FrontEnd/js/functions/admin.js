//admin mode
const logBtn = document.querySelector('.navbar-content__link-login');
const editBar = document.querySelector('.edit-bar');
const modifContainer = document.querySelectorAll('.modif-content');
const filtersContainer = document.querySelector('.filters-container');

export const adminMode = () => {

    if (localStorage.getItem('user')) {
        //afficher la barre d'ajout si user connecté
        localStorage.getItem('user') ? editBar.classList.add('active') : editBar.classList.remove('active');
    
        //Bouton deconnexion 
        localStorage.getItem('user') ? logBtn.innerHTML="logout" : logBtn.innerHTML="login";
    
        //boutons modifier
        modifContainer.forEach(el => {el.classList.add('active');});
        //enlever boutons filtres en mode admin
        localStorage.getItem('user') ? filtersContainer.classList.add('active') : filtersContainer.classList.remove('active');
    }
}

//deconnexion

logBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
});