import config from 'config';

const attachAxis = (target: SVGSVGElement) => {
  const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  yAxis.setAttribute('id', 'chart-yAxis');
  yAxis.setAttribute('width', `${config.plot.axisWidth}`);

  yAxis.style.transform = `translateX(${config.plot.yAxisOffset}px)`;
  yAxis.style.height = `calc(100% - ${config.plot.xAxisOffset}px)`;

  const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  xAxis.setAttribute('id', 'chart-xAxis');
  xAxis.setAttribute('width', '100%');
  xAxis.setAttribute('x', `${config.plot.yAxisOffset}`);
  xAxis.setAttribute('height', `${config.plot.axisWidth}`);

  xAxis.style.transform = `translateY(calc(100% - ${config.plot.xAxisOffset}px))`;
  xAxis.style.width = `calc(100% - ${config.plot.yAxisOffset}px)`;

  target.appendChild(yAxis);
  target.appendChild(xAxis);
};

export default attachAxis;
