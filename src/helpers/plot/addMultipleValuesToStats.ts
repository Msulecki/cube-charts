import config from 'config';
import addTimeToNode from 'helpers/DOM/addTimeToNode';
import createResultContainerEntry from 'helpers/DOM/createResultContainerEntry';
import { MultipleStatisticsEntry } from 'types';

const addMultipleValuesToStats = ({
  container,
  valueObject,
  name,
  id,
  classes,
}: MultipleStatisticsEntry) => {
  const {
    countedTimes,
    droppedTimes: { min, max },
  } = valueObject;

  const resultContainer = createResultContainerEntry({
    id,
    classes,
    name,
    value: valueObject.value,
  });

  container.appendChild(resultContainer);

  resultContainer.onmouseenter = () => {
    if (!Number.isFinite(valueObject.value)) {
      return;
    }

    countedTimes.forEach((time) => {
      const targetPoint = document.getElementById(
        `${config.id.plot.pointIdPrefix}${time.id}`
      );
      targetPoint.classList.add('hovered');
      targetPoint.setAttribute('r', `${config.plot.circleRadiusHovered}`);
    });

    min.forEach((time) => {
      const targetPoint = document.getElementById(
        `${config.id.plot.pointIdPrefix}${time.id}`
      );
      targetPoint.classList.add('hovered', 'min');
      targetPoint.setAttribute('r', `${config.plot.circleRadiusHovered}`);
    });

    max.forEach((time) => {
      const targetPoint = document.getElementById(
        `${config.id.plot.pointIdPrefix}${time.id}`
      );
      targetPoint.classList.add('hovered', 'max');
      targetPoint.setAttribute('r', `${config.plot.circleRadiusHovered}`);
    });
  };

  resultContainer.onmouseleave = () => {
    if (!Number.isFinite(valueObject.value)) {
      return;
    }

    countedTimes.forEach((time) => {
      const targetPoint = document.getElementById(
        `${config.id.plot.pointIdPrefix}${time.id}`
      );
      targetPoint.classList.remove('hovered');
      targetPoint.setAttribute('r', `${config.plot.circleRadius}`);
    });

    min.forEach((time) => {
      const targetPoint = document.getElementById(
        `${config.id.plot.pointIdPrefix}${time.id}`
      );
      targetPoint.classList.remove('hovered', 'min');
      targetPoint.setAttribute('r', `${config.plot.circleRadius}`);
    });

    max.forEach((time) => {
      const targetPoint = document.getElementById(
        `${config.id.plot.pointIdPrefix}${time.id}`
      );
      targetPoint.classList.remove('hovered', 'max');
      targetPoint.setAttribute('r', `${config.plot.circleRadius}`);
    });
  };
};

export default addMultipleValuesToStats;
