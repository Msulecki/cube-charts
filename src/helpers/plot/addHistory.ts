import config from 'config/index';
import { ResultsHistory } from 'types';

const addHistory = ({ target, history }: ResultsHistory) => {
  const historyContainer = document.createElement('div');
  historyContainer.classList.add('stats__history');
  historyContainer.textContent = '(History)';

  historyContainer.onmouseenter = () => {
    history.forEach((historyEntry) => {
      const plotPoint = document.getElementById(
        `${config.id.plot.pointIdPrefix}${historyEntry.id}`
      );
      plotPoint.classList.add('history-point');
      plotPoint.setAttribute('r', `${config.plot.circleRadiusHovered}`);
    });
  };

  historyContainer.onmouseleave = () => {
    history.forEach((historyEntry) => {
      const plotPoint = document.getElementById(
        `${config.id.plot.pointIdPrefix}${historyEntry.id}`
      );
      plotPoint.classList.remove('history-point');

      if (plotPoint.classList.contains('hovered')) {
        return;
      }

      plotPoint.setAttribute('r', `${config.plot.circleRadius}`);
    });
  };

  target.appendChild(historyContainer);
};

export default addHistory;
