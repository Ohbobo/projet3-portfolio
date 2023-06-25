const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-form__input-email');
const passwordInput = document.querySelector('.login-form__input-password');
const errorPassword = document.querySelector('.login-content__error');

const login = async () => {

    loginForm.addEventListener('submit', async (e) => {

        e.preventDefault();
    
        const userAccount = {
            email: emailInput.value,
            password : passwordInput.value
        }

        try {
            const user = JSON.stringify(userAccount);
            const res = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: user
        })        
        .then(res => res.json());

            if (res.token) {
                localStorage.setItem('user', res.token);
                window.location.href = "index.html";
            } else {
                errorPassword.classList.add('active');
            }
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
        }
    });
}

login();