/*
    Author: Benjamin DeBiase
    Date: 04/19/26
    Script for all dashboard pages

    Handles account dropdown and redirection if not logged in
*/

const accountIcon = document.querySelector('.account-icon');
const dropdown = document.querySelector('.dropdown');
const logoutButton = dropdown.querySelector('.logout');

accountIcon.addEventListener('click', (e) => {
    e.preventDefault();
    if (dropdown.classList.contains('open') && !dropdown.classList.contains('closing')) {
        closeDropdown();
    } else {
        openDropdown();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'auth.html';
        return;
    }

    const accountName = document.querySelector('.account-name');
    accountName.textContent = currentUser || 'user';
});

document.addEventListener('click', (e) => {
    if (dropdown.classList.contains('open') &&
        !dropdown.contains(e.target) &&
        !accountIcon.contains(e.target)) {
        closeDropdown();
    }
});

logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberMe');
    window.location.href = 'auth.html';
});

function closeDropdown() {
    dropdown.classList.add('closing');
    accountIcon.classList.remove('active');
    dropdown.addEventListener('animationend', () => {
        dropdown.classList.remove('closing');
        dropdown.classList.remove('open');
    }, { once: true });
}

function openDropdown() {
    dropdown.classList.add('open');
    accountIcon.classList.add('active');
}