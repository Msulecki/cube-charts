import config from 'config';

const updateLineTransform = (
  lineNode: HTMLElement | SVGRectElement,
  yValue: number
) => {
  const multiplier =
    (yValue / 100) * (2 * config.plot.axisPadding + config.plot.xAxisOffset) -
    config.plot.axisPadding;

  lineNode.style.transform = `translate(${
    config.plot.axisWidth + config.plot.yAxisOffset
  }px, calc(${yValue}% - ${multiplier}px - 1px))`;
};

export default updateLineTransform;
