export const fetchCategories = async () => {

    try {
        const response = await fetch('http://localhost:5678/api/categories');
        
        if(!response) {
            throw new Error('Erreur lors de la requête. Statut : ' + response.status);
        }

        const categories = await response.json();
        return categories;
        
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }

}

export const fetchWorks = async () => {

    try {
        const response = await fetch('http://localhost:5678/api/works');
        
        if(!response) {
            throw new Error('Erreur lors de la requête. Statut : ' + response.status);
        }

        const works = await response.json();
        return works;

    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }

}
const user = localStorage.getItem('user');

// fetch delete
export const fetchDeleteWorks = async (id) => {

    try {
        await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${user}`
            }
        });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression:", error);
    }
}

// fetch add works

export const fetchAddWorks = async (formData) => {
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',         
            headers: {
                'Authorization': `Bearer ${user}`,
            },
            body: formData
        });
        const newWork = await response.json();
        return newWork;

    } catch (error) {
        console.error("Une erreur s'est produite lors de l'ajout':", error);
    }
}