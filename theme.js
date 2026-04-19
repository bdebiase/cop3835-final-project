/*
    Author: Benjamin DeBiase
    Date: 04/18/26
    Simple theme management script to be used on every page
*/

const savedTheme = localStorage.getItem('theme') || 'system';
applyTheme(savedTheme);

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme); // allow theme to be fetched from css
    if (theme === 'system') {
        document.documentElement.style.colorScheme = 'light dark';
    } else {
        document.documentElement.style.colorScheme = theme;
    }
}