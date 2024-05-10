const menu = document.querySelector('.menu-hamburger');
const modal = document.querySelector('.modalFilter');

menu.addEventListener('click', () => {
    menu.classList.toggle('active');
    modal.classList.toggle('activeMenu');
});