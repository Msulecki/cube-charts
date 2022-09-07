import { Statistics } from 'types';
import addLineToPlot from 'helpers/plot/addLineToPlot';
import addResultToPlot from 'helpers/plot/addResultToPlot';
import calculateYCoordinate from 'helpers/plot/calculateYCoordinate';
import config from 'config';
import addYAxisDescription from 'helpers/plot/addYAxisDescription';
import addXAxisDescription from 'helpers/plot/addXAxisDescription';

const plotData = (result: Statistics) => {
  const { allResults, bestTime: min, worstTime: max, mean, median } = result;
  const chartContainer = document.getElementById('chart');
  const chartAxisContainer = document.getElementById('chart-axis');

  const minValue = min.time.value;
  const maxValue = max.time.value;

  allResults.forEach((result, index) => {
    const currentValue = result.time.value;

    const xCoordinate = (index / allResults.length) * 100 + '%';
    const yCoordinate = calculateYCoordinate({
      currentValue,
      minValue,
      maxValue,
    });

    addResultToPlot({
      target: chartContainer,
      x: xCoordinate,
      y: yCoordinate,
      id: `${config.id.plot.pointIdPrefix}${result.id ?? index}`,
    });
  });

  addLineToPlot({
    target: chartAxisContainer,
    y: calculateYCoordinate({ currentValue: mean, minValue, maxValue }),
    id: config.id.plot.mean,
    classes: ['plot-line', 'plot-line__mean'],
  });

  addLineToPlot({
    target: chartAxisContainer,
    y: calculateYCoordinate({ currentValue: median, minValue, maxValue }),
    id: config.id.plot.median,
    classes: ['plot-line', 'plot-line__median'],
  });

  addYAxisDescription({ min: minValue, max: maxValue });
  addXAxisDescription({ first: allResults[0], last: allResults.at(-1) });
};

export default plotData;
