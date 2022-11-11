// taken from:
// https://stackoverflow.com/a/18473154/2919694
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {

  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
  ].join(" ");

  return d;
}

function setup(progressBar) {
  const style = getComputedStyle(progressBar);

  const value = 1 * style.getPropertyValue(
    '--value'
  );
  const label = style.getPropertyValue(
    '--label'
  );
  const width = 1 * style.getPropertyValue(
    '--width'
  );
  const height = 1 * style.getPropertyValue(
    '--height'
  );
  const lineWidth = 1 * style.getPropertyValue(
    '--line-width'
  );

  const x = width / 2;
  const y = height / 2;
  const radius = (width / 2) - lineWidth;

  const svg = progressBar
    .querySelector('svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox',
    `0 0 ${width} ${height}`);
  
  const bg = progressBar
    .querySelector('.progress-circle-bg');
  bg.setAttribute('cx', x);
  bg.setAttribute('cy', y);
  bg.setAttribute('r', radius);

  const segment = progressBar.querySelector(
      '.progress-circle-segment');
  
  var arc = describeArc(x, y, radius, 0,
    value / 100 * 360);
  segment.setAttribute('d', arc);

  const progressText = progressBar
    .querySelector('.progress-text');
  progressText.innerText = label || value;
}

export { setup };