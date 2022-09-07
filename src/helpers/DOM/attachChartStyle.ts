import config from 'config';

const attachChartStyle = (target: SVGSVGElement) => {
  target.style.top = `${config.plot.axisPadding}px`;
  target.style.right = `${config.plot.axisPadding}px`;
  target.style.bottom = `${
    config.plot.xAxisOffset + config.plot.axisPadding
  }px`;
  target.style.left = `${config.plot.yAxisOffset + config.plot.axisPadding}px`;
  target.style.width = `calc(100% - (${
    config.plot.yAxisOffset + 2 * config.plot.axisPadding
  }px))`;
  target.style.height = `calc(100% - (${
    config.plot.xAxisOffset + 2 * config.plot.axisPadding
  }px))`;
};

export default attachChartStyle;
