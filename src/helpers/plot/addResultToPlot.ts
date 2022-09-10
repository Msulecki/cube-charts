import config from 'config';
import { PlotPoint } from 'types';

const addResultToPlot = ({ target, x, y, id }: PlotPoint) => {
  const plotPoint = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  );

  plotPoint.setAttribute('r', `${config.plot.circleRadius}`);
  plotPoint.setAttribute('cx', `${Math.random() * 100}%`);
  plotPoint.setAttribute('cy', `${Math.random() * 100}%`);

  setTimeout(() => {
    plotPoint.setAttribute('cx', `${x}%`);
    plotPoint.setAttribute('cy', `${y}%`);
  }, Math.random() * 300);

  plotPoint.setAttribute('id', id);

  target.appendChild(plotPoint);
};

export default addResultToPlot;
