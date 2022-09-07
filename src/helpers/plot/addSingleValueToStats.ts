import config from 'config';
import addTimeToNode from 'helpers/DOM/addTimeToNode';
import createResultContainerEntry from 'helpers/DOM/createResultContainerEntry';
import { SingleStatisticsEntry } from 'types';
import addHistory from './addHistory';

const addSingleValueToStats = ({
  container,
  valueObject,
  history,
  name,
  id,
  classes,
}: SingleStatisticsEntry) => {
  const targetPoint = document.getElementById(
    `${config.id.plot.pointIdPrefix}${valueObject.id}`
  );

  const resultContainer = createResultContainerEntry({
    id,
    classes,
    name,
    value: valueObject.time.value,
    history,
  });

  resultContainer.onmouseenter = () => {
    targetPoint.classList.add('hovered');
    targetPoint.setAttribute('r', `${config.plot.circleRadiusHovered}`);
  };

  resultContainer.onmouseleave = () => {
    targetPoint.classList.remove('hovered');
    targetPoint.setAttribute('r', `${config.plot.circleRadius}`);
  };

  container.appendChild(resultContainer);
};

export default addSingleValueToStats;
