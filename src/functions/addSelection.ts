import config from 'config';
import updatePlotLines from 'helpers/plot/updatePlotLines';
import createStatisticsObject from 'helpers/statistics/createStatisticsObject';
import { AddSelection, Statistics } from 'types';
import addStats from './addStats';

const addSelection = ({ results, onSelection, onReset }: AddSelection) => {
  const chartContainer = document.getElementById(config.id.chart.chart);
  const statsContainer = document.getElementById(config.id.stats.section);

  let isMouseDown = false;
  let startPosition: null | number = null;

  const selection = [];

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

      const button =
        document.getElementById(config.id.button.reset) ||
        document.createElement('button');
      button.setAttribute('id', config.id.button.reset);
      button.innerText = 'reset';
      button.onmouseup = () => {
        onReset();
      };

      const container = document.getElementById('stats' + '-selected');
      container.appendChild(button);

      if (
        selectedResults.length >= 10 &&
        selectedResults.length !== results.allResults.length
      ) {
        const button =
          document.getElementById(config.id.button.zoom) ||
          document.createElement('button');
        button.setAttribute('id', config.id.button.zoom);
        button.innerText = 'zoom to selection';
        button.onmouseup = () => {
          onSelection(fullStatistics);
        };

        container.appendChild(button);
      }
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
