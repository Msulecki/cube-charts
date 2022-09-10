import config from 'config';

const attachXAxisMarks = (target: SVGSVGElement) => {
  const xAxisMarkStart = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'text'
  );

  const xAxisMarkEnd = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'text'
  );

  const markYOffset = `calc(100% - ${config.plot.xAxisOffset}px + 18px)`;

  xAxisMarkStart.setAttribute('width', '100');
  xAxisMarkStart.setAttribute('height', `${config.plot.xAxisOffset}`);
  xAxisMarkStart.setAttribute('id', config.id.plot.xAxisMarkStart);

  xAxisMarkStart.style.transform = `translate(${
    config.plot.yAxisOffset + 6
  }px, ${markYOffset})`;

  xAxisMarkEnd.setAttribute('width', '100px');
  xAxisMarkEnd.setAttribute('height', `${config.plot.xAxisOffset}`);
  xAxisMarkEnd.setAttribute('id', config.id.plot.xAxisMarkEnd);

  xAxisMarkEnd.style.transform = `translate(calc(100% - 6px), ${markYOffset})`;
  xAxisMarkEnd.style.textAnchor = 'end';

  target.appendChild(xAxisMarkStart);
  target.appendChild(xAxisMarkEnd);
};

export default attachXAxisMarks;
