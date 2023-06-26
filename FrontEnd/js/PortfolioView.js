// s'occupe d'afficher la page html
export class PortfolioView {

  constructor(model) {
      this.model = model; // fait le lien avec PortfolioModelView permettant d'acceder au constructor
      
      this.filtersContainer = document.querySelector('.filters-container');
      this.galleryContainer = document.querySelector('.gallery');
      this.form = document.querySelector('.modal-form');
      this.modalWorkContainer = document.querySelector('.modal-work-container');
      this.inputCategoriesModal = document.querySelector('.modal-form-info__select');
      this.deleteAllWorksBtn = document.querySelector('.modal-footer__remove-all');
  }
  // EventListener
  events() {
    this.filtersContainer.addEventListener('click', this.handleFilter.bind(this));
    this.form.addEventListener('submit', this.handleAddWork.bind(this));
    this.modalWorkContainer.addEventListener('click', this.handleDeleteWork.bind(this));
    this.deleteAllWorksBtn.addEventListener('click', this.handleDeleteAllWorks.bind(this));
  }

  //Affiche les boutons filtres
  displayFilterButtons() {
    const buttonsHTML = this.model.buttonsData.map(btn => `
      <button class="filters-container__btn" id="${btn.id}">${btn.name}</button>
    `).join(''); //renvoie les données de map en chaine de caractères
    this.filtersContainer.innerHTML = `<button class="filters-container__btn filters-container__btn-active" id="0">Tous</button>` + buttonsHTML;
  }

  //Affiche la gallery
  displayWorksGallery() {
    const galleryHTML = this.model.filters.map(work => `
    <figure class="gallery-item" id="${work.id}">
      <img class="gallery-item__img" src="${work.imageUrl}" alt="${work.title}">
      <h3 class="gallery-item__title">${work.title}</h3>
    </figure>
  `).join(''); //renvoie les données de map en chaine de caractères

  this.galleryContainer.innerHTML = galleryHTML;
  }

  //Affiche la galerie dans la modal
  displayModal() {
    
    const modalContentHTML = this.model.filters.map(work => `
      <div class="modal-article">
        <img class="modal-article__img" src="${work.imageUrl}" alt="${work.title}">
        <button class="modal-article__btn" id="${work.id}"><i class="fa-sharp fa-solid fa-trash modal-article__trash-icon"></i></button>
        <p class="modal-article__edit">éditer</p>
      </div>
    `).join('');
    this.modalWorkContainer.innerHTML = modalContentHTML;
    // Ajout categories dans le formulaire depuis api
    const inputCategoriesHTML = this.model.buttonsData.map(cat => `
      <option value="${cat.id}">${cat.name}</option>
    `).join('');
    this.inputCategoriesModal.innerHTML = `<option value="0"></option>` + inputCategoriesHTML;
  }

  updateData() {
    this.displayFilterButtons(); 
    this.displayWorksGallery(); 
    this.displayModal();
  }

  handleFilter(e) {
    const id = e.target.id;
    const targetElement = e.target;
  
    if (targetElement.classList.contains('filters-container__btn')) {
      if (targetElement.classList.contains('filters-container__btn-active')) {
        return;
      }
      const activeButton = document.querySelector('.filters-container__btn-active');
      if (activeButton) {
        activeButton.classList.remove('filters-container__btn-active');
      }
      targetElement.classList.add('filters-container__btn-active');
      if (id) {
        this.model.worksFilter(id);
        this.displayWorksGallery();
        this.displayModal();
      }
    }
  }
  
  async handleDeleteWork(e) {
    e.preventDefault();

    const id = e.target.id;
    await this.model.deleteWorks(id);
    await this.model.fetchData();// Mettre à jour les données après la suppression
    this.updateData();// Mettre à jour l'affichage après la suppression
  }

  async handleDeleteAllWorks() {
    if (confirm("Êtes-vous sûr de vouloir supprimer tous les travaux ?")) {
      await this.model.deleteAllWorks();
      await this.model.fetchData();
      this.updateData();
    }
  }

  async handleAddWork(e) {
    e.preventDefault();
   
    const imageUrl = document.querySelector('.modal-form-image__input').files[0];
    const title = document.querySelector('.modal-form-info__text').value;
    const categoryId = document.querySelector('.modal-form-info__select').value;

    const formData = new FormData();
    formData.append('image', imageUrl);
    formData.append('title', title);
    formData.append('category', categoryId);

    await this.model.addWorks(formData);
    await this.model.fetchData();// Mettre à jour les données après l'ajout
    this.updateData();// Mettre à jour l'affichage après l'ajout
    this.form.reset();
    document.querySelector('.modal-form-image__img').src = ""
  }

}