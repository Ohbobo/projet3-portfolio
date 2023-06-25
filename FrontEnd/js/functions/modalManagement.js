const img = document.querySelector('.modal-form-image__img');
const icon = document.querySelector('.modal-form-image__icon');
const label = document.querySelector('.modal-form-image__label');
const input = document.querySelector('.modal-form-image__input');
const paragraphe = document.querySelector('.modal-form-image__p');

export const initModal = () => {
    // Ourvir la modal
    const openModal = () => {
    
        document.querySelectorAll('.trigger').forEach(el => 
            el.addEventListener('click', () => {
                document.querySelector('.modal').classList.add('active');
            }
        )); 
    }
    // Fermer la modal + reset formulaire
    const closeModal = () => {
    
        document.querySelectorAll('.close').forEach(el => 
            el.addEventListener('click', () => {
                document.querySelector('.modal').classList.remove('active');
                document.querySelector('.first-modal').classList.remove('active');
                document.querySelector('.second-modal').classList.remove('active');
                closeModal();
                removeForm();
        }));
    }
    
    // Ouvrir modal formulaire d'ajout
    const openSecondModal = () => {
    
        document.querySelector('.modal-footer__add').addEventListener('click', () => {
            document.querySelector('.first-modal').classList.add('active');
            document.querySelector('.second-modal').classList.add('active');
        });
    
    }
    // Revenir modal galerie photo + reset formualaire
    const backFirstModal = () => {
        
        document.querySelector('.modal-content__btn-back').addEventListener('click', () => {
            document.querySelector('.first-modal').classList.remove('active');
            document.querySelector('.second-modal').classList.remove('active');
            removeForm();
        });
    }

    openModal();
    closeModal();
    openSecondModal();
    backFirstModal();
}
// Previsualise l'image dans le formulaire 
export const previewImage = (e) => {

    const inputTarget = e.target;
    const reader = new FileReader();

    reader.onload = e => {
        img.src = e.target.result;
    };

    reader.readAsDataURL(inputTarget.files[0]);
    
    //style
    img.style.display= "block";
    icon.style.display = 'none';
    label.style.display = 'none';
    input.style.display = 'none';
    paragraphe.style.display = 'none';
    
}
// Réinitialise le formulaire lors du retour ou fermeture de la modal
const removeForm = () => {

    document.querySelector('.modal-form').reset();
    document.querySelector('.modal-form-image__img').src = "#";
    
    //style
    img.style.display= "none";
    icon.style.display = 'block';
    label.style.display = 'flex';
    paragraphe.style.display = 'block';
}