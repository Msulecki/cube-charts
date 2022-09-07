import config from 'config/index';
import attachAxis from './attachAxis';
import attachYAxisMarks from './attachYAxisMarks';
import attachChartStyle from './attachChartStyle';
import attachXAxisMarks from './attachXAxisMarks';

const addChartPlaceholder = (target: HTMLElement = document.body) => {
  const section = document.createElement('section');
  section.setAttribute('id', 'chart-section');

  const chartContainer = document.createElement('div');
  chartContainer.classList.add('chart');

  const chartAxis = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg'
  );
  chartAxis.setAttribute('id', 'chart-axis');

  const chart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  chart.setAttribute('id', 'chart');

  attachChartStyle(chart);

  attachAxis(chartAxis);
  attachYAxisMarks(chartAxis, config.plot.xAxisMarkCount);
  attachXAxisMarks(chartAxis);

  chartContainer.appendChild(chartAxis);
  chartContainer.appendChild(chart);

  section.appendChild(chartContainer);

  target.appendChild(section);
};

export default addChartPlaceholder;
