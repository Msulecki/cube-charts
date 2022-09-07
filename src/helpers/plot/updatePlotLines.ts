import config from 'config';
import { Statistics } from 'types';
import calculateYCoordinate from './calculateYCoordinate';
import updateLineTransform from './updateLineTransform';

const updatePlotLines = (results: Statistics) => {
  const minValue = results.bestTime.time.value;
  const maxValue = results.worstTime.time.value;
  const { mean, median } = results;

  const meanLine = document.getElementById(config.id.plot.mean);
  const meanY = calculateYCoordinate({
    currentValue: mean,
    minValue,
    maxValue,
  });

  updateLineTransform(meanLine, meanY);

  const medianLine = document.getElementById(config.id.plot.median);
  const medianY = calculateYCoordinate({
    currentValue: median,
    minValue,
    maxValue,
  });
  updateLineTransform(medianLine, medianY);
};

export default updatePlotLines;
