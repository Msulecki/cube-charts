import config from 'config';
import { PlotLine } from 'types';
import updateLineTransform from './updateLineTransform';

const addLineToPlot = ({ target, y, id, classes }: PlotLine) => {
  const valueLine =
    document.getElementById(id) ||
    document.createElementNS('http://www.w3.org/2000/svg', 'rect');

  valueLine.setAttribute('height', `${config.plot.lineHeight}`);
  valueLine.setAttribute('width', '100%');
  valueLine.setAttribute('id', id);

  valueLine.classList.add(...classes);

  updateLineTransform(valueLine, y);

  target.appendChild(valueLine);
};

export default addLineToPlot;
