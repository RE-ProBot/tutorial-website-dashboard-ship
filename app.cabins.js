async function setup() {
  const response = await fetch(
    './app.cabins.json'
  );
  const cabinsData = await response.json();

  const cabinTemplate = document
    .querySelector('#cabin-template');
  const cabins = document
    .querySelector('.ship__cabins');

  cabinsData.forEach((cabinData) => {
    const cabin = cabinTemplate.content
      .firstElementChild.cloneNode(true);

    const { style } = cabin;
    style.setProperty('--x', cabinData.x);
    style.setProperty('--y', cabinData.y);
    style.setProperty('--width', 
      cabinData.width || 1);
    style.setProperty('--height', 
      cabinData.height || 1);

    if (cabinData.type) {
      cabin.classList.add(
        `type-${cabinData.type}`
      );
    }

    if (cabinData.unavailable) {
      cabin.classList.add('unavailable');
    }

    cabins.appendChild(cabin);
  });
}

export { setup };