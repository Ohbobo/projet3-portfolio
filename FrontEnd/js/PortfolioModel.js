import { fetchCategories, fetchWorks, fetchDeleteWorks, fetchAddWorks } from "./api.js";

export class PortfolioModel {
    constructor() {
        this.buttonsData = [];
        this.worksData = [];
        this.filters = [];
    }

    async fetchData() {
        this.buttonsData = await fetchCategories();
        this.worksData = await fetchWorks();
        this.filters = [...this.worksData];
    }

    // filtrage des works
    worksFilter(categoryId){
        if (categoryId === "0") {
            this.filters = [...this.worksData];
        } else {
            categoryId = parseInt(categoryId);
            this.filters = this.worksData.filter(work => work.categoryId === categoryId);
        }
    }

    // Suppression
    async deleteWorks(id) {
        try {
            await fetchDeleteWorks(id);
            this.worksData = this.worksData.filter(item => item.id !== id);
            this.filters = this.filters.filter(item => item.id !== id);
        } catch (error) {
            console.error("Une erreur s'est produite lors de la suppression:", error);
        }
    }
    // Suppression de tous les works
    async deleteAllWorks () {
        try {
          const works = await fetchWorks();
          
          for (const work of works) {
            await fetchDeleteWorks(work.id);
            this.worksData = this.worksData.filter(item => item.id !== work.id);
            this.filters = this.filters.filter(item => item.id !== work.id);
          }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la suppression:", error);
        }
    }
    //post
    async addWorks(formData) {
        try {
            const newWork = await fetchAddWorks(formData);
            if(newWork) {
                this.worksData.push(newWork.id);
                this.filters.push(newWork.id);
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de l'ajout':", error);
        }
    }
}