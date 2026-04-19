/*
    Author: Benjamin DeBiase
    Date: 04/18/26
    Authentication script

    This script handles authentication from the auth page and uses link hashes to act as a single page app.
    Local storage is used to simulate account creation and authentication.
*/

const loginCard = document.querySelector(".card.login");
const signupCard = document.querySelector(".card.signup");

const loginForm = loginCard.querySelector("form");
const signupForm = signupCard.querySelector("form");

const skipAuthButton = document.querySelector(".skip");

// ACCOUNTS
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm.querySelector("#email").value;
    const password = loginForm.querySelector("#password").value;

    validateAccount(email, password);
});

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signupForm.querySelector("#email").value;
    const password = signupForm.querySelector("#password").value;

    addAccount(email, password);
});

// skip button to force auth
skipAuthButton.addEventListener("click", () => {
    localStorage.setItem("currentUser", "user");
    localStorage.setItem("rememberMe", "false");
    window.location.href = "/index.html";
});

function addAccount(email, password) {
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    if (!accounts.some((account) => account.email === email)) {
        accounts.push({ email, password });
        localStorage.setItem("accounts", JSON.stringify(accounts));
        localStorage.setItem("currentUser", email);
        window.location.replace("#login"); // clear #signup from history so user when user goes back it opens login
        window.location.href = "/index.html";
        return;
    }

    const errorText = signupCard.querySelector(".error");
    errorText.style.display = "block";
}

function validateAccount(email, password) {
    const errorText = loginCard.querySelector(".error");
    errorText.textContent = "Incorrect password!"; // default error message

    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    const foundAccount = accounts.find((account) => account.email === email);
    if (foundAccount) {
        if (foundAccount.password === password) {
            localStorage.setItem("currentUser", email);
            localStorage.setItem("rememberMe", loginForm.querySelector("#remember").checked);
            window.location.href = "/index.html";
            return;
        }
    } else {
        errorText.textContent = "Account with that email does not exist!";
    }

    errorText.style.display = "block";
}

// HASH
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("rememberMe") === "true" && localStorage.getItem("currentUser")) {
        window.location.replace("/index.html");
        return;
    } else if (localStorage.getItem("rememberMe") === "false") {
        localStorage.removeItem("currentUser");
    }

    updateHash();

    // remove preload to signify page is loaded after preventing animations from firing incorrectly on load
    setTimeout(() => {
        document.body.classList.remove("preload");
    }, 10);
});

window.addEventListener("hashchange", () => {
    updateHash();

    document.querySelectorAll(".error").forEach((el) => {
        el.style.display = "none";
    });
});

function updateHash() {
    const hash = window.location.hash;

    // if the has is none of the two valid options
    if (!(hash === "#login" || hash === "#signup")) {
        // force it to default to login
        window.location.hash = "#login";
    }

    toggleHash();
}

function toggleHash() {
    const hash = window.location.hash;

    // toggle active class on corresponding card based on hash
    if (hash === "#login") {
        loginCard.classList.add("active");
        signupCard.classList.remove("active");
    } else if (hash === "#signup") {
        loginCard.classList.remove("active");
        signupCard.classList.add("active");
    }
}