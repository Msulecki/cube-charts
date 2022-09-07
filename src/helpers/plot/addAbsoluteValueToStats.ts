import config from 'config';
import createResultContainerEntry from 'helpers/DOM/createResultContainerEntry';
import { AbsoluteStatisticsEntry } from 'types';
import updatePlotLines from './updatePlotLines';

const addAbsoluteValueToStats = ({
  container,
  value,
  name,
  plotNodeId,
  id,
  classes,
  onHover,
}: AbsoluteStatisticsEntry) => {
  const lineElement = document.getElementById(plotNodeId);

  const resultContainer = createResultContainerEntry({
    id,
    classes,
    name,
    value,
  });

  resultContainer.onmouseenter = () => {
    onHover();

    lineElement.classList.add('hovered');
    lineElement.setAttribute('height', `${config.plot.lineHeightHovered}`);
  };

  resultContainer.onmouseleave = () => {
    lineElement.classList.remove('hovered');
    lineElement.setAttribute('height', `${config.plot.lineHeight}`);
  };

  container.appendChild(resultContainer);
};

export default addAbsoluteValueToStats;
