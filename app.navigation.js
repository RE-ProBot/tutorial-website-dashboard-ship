function toggleMenu() {
  document.body.classList
    .toggle('navbar-open');
}

function closeMenu() {
  document.body.classList
    .remove('navbar-open');
}

function toggleSidebar() {
  document.body.classList.toggle(
    'sidebar-open'
  );
}

function setup() {
  const menuToggle = document
    .querySelector('#menu-toggle');
  const mainContainer = document
    .querySelector('.main-container');
  const nav = document
    .querySelector('nav');
  const navItems = nav
    .querySelector('.nav-items');
  const navLinks = [
    ...navItems.querySelectorAll('a')
  ];
  
  menuToggle.addEventListener('click',
    toggleMenu);

  document.body.addEventListener('click',
    (e) => {
      if (e.target === mainContainer ||
        e.target === e.currentTarget) {
        closeMenu();
      }
    });
  
  nav.addEventListener('click', (e) => {
    if (navLinks.includes(e.target)) {
      toggleMenu();
    }
  });

  const sidebarToggles = document
    .querySelectorAll('.sidebar-toggle');
  sidebarToggles.forEach((toggle) => {
    toggle.addEventListener('click',
      toggleSidebar);
  });
}

export { setup };