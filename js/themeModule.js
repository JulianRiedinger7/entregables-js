const mainContainer = document.querySelector('.main-container')

export function lightMode() {

    document.body.classList.replace('dark-body', 'light-body');
    mainContainer.classList.replace('dark', 'light');
    document.querySelector('#btn-theme').textContent = 'DarkMode'
    localStorage.setItem('theme', 'light');

}


export function darkMode() {
    document.body.classList.replace('light-body', 'dark-body');
    mainContainer.classList.replace('light', 'dark');
    document.querySelector('#btn-theme').textContent = 'LightMode'
    localStorage.setItem('theme', 'dark');
}
