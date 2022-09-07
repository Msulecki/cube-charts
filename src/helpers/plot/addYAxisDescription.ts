import config from 'config';
import addTimeToNode from 'helpers/DOM/addTimeToNode';
import { YAxisDescription } from 'types';

const addYAxisDescription = ({ min, max }: YAxisDescription) => {
  const lineCount = config.plot.xAxisMarkCount;
  const multiplier = (max - min) / (lineCount - 1);

  for (let i = 0; i < lineCount; i++) {
    const textNode = document.getElementById(
      `${config.id.plot.yAxisMarkPrefix}${i}`
    );

    const valueInMs = Math.floor((lineCount - i - 1) * multiplier + min);

    addTimeToNode(textNode, valueInMs);
  }
};

export default addYAxisDescription;
