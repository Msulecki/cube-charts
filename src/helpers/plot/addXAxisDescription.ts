import config from 'config';
import { XAxisDescription } from 'types';

const addXAxisDescription = ({ first, last }: XAxisDescription) => {
  const startDateNode = document.getElementById(config.id.plot.xAxisMarkStart);
  const startDate = new Date(first.date).toLocaleDateString();
  startDateNode.textContent = startDate;

  const endDateNode = document.getElementById(config.id.plot.xAxisMarkEnd);
  const endDate = new Date(last.date).toLocaleDateString();
  endDateNode.textContent = endDate;
};

export default addXAxisDescription;
