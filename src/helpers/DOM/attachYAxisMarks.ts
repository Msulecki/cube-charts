import config from 'config';

const attachYAxisMarks = (target: SVGSVGElement, count: number) => {
  for (let i = 0; i < count; i++) {
    const axisMark = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'rect'
    );

    const axisMarkText = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text'
    );

    const xTransform = `${config.plot.axisWidth + config.plot.yAxisOffset}px`;

    const yTransform = `calc(((100% - ${
      config.plot.xAxisOffset + 2 * config.plot.axisPadding
    }px) / ${count - 1}) * ${i} + ${config.plot.axisPadding - 0.5}px)`;

    axisMarkText.setAttribute(
      'x',
      `${config.plot.yAxisOffset - config.plot.axisWidth}`
    );
    axisMarkText.setAttribute('height', '16');
    axisMarkText.setAttribute('id', `${config.id.plot.yAxisMarkPrefix}${i}`);

    axisMarkText.style.transform = `translate(-2px ,calc(${yTransform} + 6px))`;
    axisMarkText.style.textAnchor = 'end';

    axisMark.setAttribute('width', '100%');
    axisMark.setAttribute('height', '1');
    axisMark.style.transform = `translate(${xTransform}, ${yTransform})`;

    axisMark.classList.add('xAxis-mark');

    target.appendChild(axisMarkText);
    target.appendChild(axisMark);
  }
};

export default attachYAxisMarks;
