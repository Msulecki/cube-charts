import config from 'config';
import updatePlotLines from 'helpers/plot/updatePlotLines';
import createStatisticsObject from 'helpers/statistics/createStatisticsObject';
import { Statistics } from 'types';
import addStats from './addStats';

const addSelection = (results: Statistics) => {
  const chartContainer = document.getElementById(config.id.chart.chart);
  const statsContainer = document.getElementById(config.id.stats.section);

  let isMouseDown = false;
  let startPosition: null | number = null;

  chartContainer.onmousedown = () => {
    isMouseDown = true;

    results.allResults.forEach((result) => {
      const point = document.getElementById(
        `${config.id.plot.pointIdPrefix}${result.id}`
      );

      point.classList.remove('selected');

      result.selected = false;
    });
  };

  document.body.onmouseup = () => {
    isMouseDown = false;
    startPosition = null;

    const selectedResults = results.allResults.filter(
      (result) => result.selected
    );

    if (selectedResults.length) {
      const fullStatistics = createStatisticsObject(selectedResults);

      const onLineUpdate = () => {
        updatePlotLines({
          ...fullStatistics,
          bestTime: results.bestTime,
          worstTime: results.worstTime,
        });
      };

      onLineUpdate();

      addStats({
        title: 'Selected',
        resultData: fullStatistics,
        target: statsContainer,
        uuid: '-selected',
        onLineUpdate,
      });
    } else if (statsContainer.childNodes.length > 1) {
      statsContainer.removeChild(statsContainer.lastChild);
    }
  };

  chartContainer.onmousemove = (e) => {
    if (isMouseDown) {
      const handleMouseDrag = () => {
        const { x: chartX, width: chartWidth } =
          chartContainer.getBoundingClientRect();
        const { x: mouseX } = e;

        const relativePercentPosition = ((mouseX - chartX) / chartWidth) * 100;

        if (startPosition === null) {
          startPosition = relativePercentPosition;
        }

        const minPosition = Math.min(startPosition, relativePercentPosition);

        const maxPosition = Math.ceil(
          Math.max(startPosition, relativePercentPosition)
        );

        results.allResults.forEach((result) => {
          const point = document.getElementById(
            `${config.id.plot.pointIdPrefix}${result.id}`
          );

          const pointXPosition = parseFloat(
            point.getAttribute('cx').split('%')[0]
          );

          if (pointXPosition >= minPosition && pointXPosition <= maxPosition) {
            point.classList.add('selected');

            result.selected = true;
          } else {
            point.classList.remove('selected');
            result.selected = false;
          }
        });
      };

      window.requestAnimationFrame(handleMouseDrag);
    }
  };
};

export default addSelection;
