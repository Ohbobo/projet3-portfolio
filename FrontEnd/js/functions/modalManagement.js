const img = document.querySelector('.modal-form-image__img');
const modalInputForm = document.querySelectorAll('.modal-input');
const imageUrl = document.querySelector('.modal-form-content__input');
const title = document.querySelector('.modal-form-info__text');
const categoryId = document.querySelector('.modal-form-info__select');
const submitButton = document.querySelector('.modal-footer__submit');
const modalFormContent = document.querySelector('.modal-form-content');

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
        
        document.querySelector('.modal-header__btn-back').addEventListener('click', () => {
            document.querySelector('.first-modal').classList.remove('active');
            document.querySelector('.second-modal').classList.remove('active');
            removeForm();
        });
    }
    // Change style du bouton submit en fonction de la saisie de l'utilisateur
    modalInputForm.forEach(input => {
        input.addEventListener('input', () => {
            if(!imageUrl.files[0]||!title.value||!categoryId.value){
                submitButton.classList.remove('active');
            } else {
                submitButton.classList.add('active');
            }
        })
    })
    openModal();
    closeModal();
    openSecondModal();
    backFirstModal();

    const input = document.querySelector('.modal-form-content__input');
    input.addEventListener('change', previewImage); // Prévisualisation de l'image dans le formulaire au changement de l'input
}
// Previsualise l'image dans le formulaire 
const previewImage = (e) => {
    const inputTarget = e.target;
    const reader = new FileReader();

    reader.onload = e => {
        img.src = e.target.result;
    };

    reader.readAsDataURL(inputTarget.files[0]);
    
    //style
    img.style.display= "block";
    modalFormContent.classList.add('disabled');
    
}
// Réinitialise le formulaire lors du retour ou fermeture de la modal
const removeForm = () => {
    document.querySelector('.modal-form').reset();
    document.querySelector('.modal-form-image__img').src = "#";
    
    //style
    img.style.display= "none";
    modalFormContent.classList.remove('disabled');
}