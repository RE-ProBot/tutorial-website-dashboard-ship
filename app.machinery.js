import * as ProgressCircle 
  from './app.progress-circle.js';

async function setup() {
  const response = await fetch(
    './app.machinery.json');
  const config = await response.json();

  const { connections: connectionData } = 
    config;

  const machinery = document.querySelector(
    '.machinery'
  );
  const connectors = document.querySelector(
    '.machinery__connectors'
  );
  const connections = document.querySelector(
    '.machinery__connections'
  );
  const connectionShadeTemplate = document
    .querySelector(
      '#connection-shade-template'
    );
  const connectionTemplate = document
    .querySelector(
      '#connection-template'
    );
  const statusTemplateOk = document
    .querySelector(
      '#status-ok-template'
    );
  const statusTemplateWarning = document
    .querySelector(
      '#status-warning-template'
    );

  const connectionTemplates = [
    connectionShadeTemplate, 
    connectionTemplate
  ];

  const style = getComputedStyle(connectors);
  const cols = style.getPropertyValue(
    '--columns'
  );
  const rows = style.getPropertyValue(
    '--rows'
  );
  const colGap = style.getPropertyValue(
    '--column-gap'
  );
  const rowGap = style.getPropertyValue(
    '--row-gap'
  );

  const cellWidth = (
    (
      connectors.clientWidth
      - ((cols - 1) * colGap)
    )
    / cols
  );

  const cellHeight = (
    (
      connectors.clientHeight
      - ((rows - 1) * rowGap)
    )
    / rows
  );

  function translate(p) {
    const centerX = p.x - 0.5;
    const sideX = p.sideX || 0;
    const gapX = p.gapX || 0;
    const x = 
      (centerX * cellWidth)
      + (Math.floor(centerX) * colGap)
      + (sideX * cellWidth / 2)
      + (gapX * colGap / 2);

    
    const centerY = p.y - 0.5;
    const sideY = p.sideY || 0;
    const gapY = p.gapY || 0;
    const y = 
      (centerY * cellHeight)
      + (Math.floor(centerY) * rowGap)
      + (sideY * cellHeight / 2)
      + (gapY * rowGap / 2);

    return { x, y };
  }

  connectionData.forEach((connection) => {
    let move = true;
    const pathData = [];
    connection.waypoints.forEach((p) => {
      const { x, y } = translate(p);

      if (move) {
        pathData.push('M');
        pathData.push(
          `${Math.round(x)},${Math.round(y)}`
        );
        move = false;
      }

      pathData.push('L');
      pathData.push(
        `${Math.round(x)},${Math.round(y)}`
      );
    });

    connectionTemplates
      .forEach((template) => {
        const connector =  template
          .cloneNode(true);
        connector.setAttribute(
          'd', pathData.join(' ')
        );
        connections.appendChild(connector);
      });

    if (connection.statuses) {
      const statusTemplates = {
        ok: statusTemplateOk,
        warning: statusTemplateWarning,
      };

      connection.statuses
        .forEach((statusData) => {
        const { type } = statusData;
        
        if (!(type in statusTemplates)) {
          throw new Error(
            `Unknown status ${type}`
          );
        }
        
        const { x, y } = translate(
          statusData
        );

        const statusTemplate = 
          statusTemplates[type];
        const status = statusTemplate
          .content
          .firstElementChild
          .cloneNode(true);
        
        const { style } = status;
        style.setProperty('--x', x);
        style.setProperty('--y', y);

        machinery.appendChild(status);
      })
    }
  });



  machinery.querySelectorAll(
    '.progress-circle'
  ).forEach((progressCircle) => {
    ProgressCircle.setup(
      progressCircle
    );
  });
}

export { setup };