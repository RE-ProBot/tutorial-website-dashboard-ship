const Themes = Object.freeze({
  LIGHT: 'light',
  DARK: 'dark'
});

const cycle = [
  Themes.LIGHT,
  Themes.DARK,
];

const defaultTheme = Themes.LIGHT;
const preferredTheme = window.matchMedia &&
  window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches ? Themes.DARK : Themes.LIGHT;
const restoredTheme = localStorage
  .getItem('theme');
let currentTheme = null;

function setup() {
  const themeToggle = document.querySelector(
    '#theme-toggle'
  );

  if (restoredTheme) {
    applyTheme(restoredTheme);
  } else if (defaultTheme !== preferredTheme) {
    applyTheme(preferredTheme);
  }

  themeToggle.addEventListener('click',
    () => {
      let index = cycle.indexOf(currentTheme);
      index = (index + 1) % cycle.length;
      const newTheme = cycle[index];

      applyTheme(newTheme);
    });
}

function applyTheme(theme) {
  const themeClass = `theme-${theme}`;
  currentTheme = theme;

  const remove = Object.values(Themes)
    .map((t) => `theme-${t}`)
    .filter((cls) => cls !== themeClass);
  document.body.classList.remove(
    ...remove
  );

  if (!document.body.classList.contains(
    themeClass
  )) {
    document.body.classList.add(themeClass);
  }

  if (preferredTheme !== theme) {
    localStorage.setItem('theme', theme);
  } else {
    localStorage.removeItem('theme');
  }
}

export { setup };