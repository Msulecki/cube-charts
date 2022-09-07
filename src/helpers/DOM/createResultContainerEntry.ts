import addHistory from 'helpers/plot/addHistory';
import { ResultContainerEntry } from 'types';
import addTimeToNode from './addTimeToNode';

const createResultContainerEntry = ({
  id,
  classes,
  name,
  value,
  history,
}: ResultContainerEntry) => {
  const resultContainer =
    document.getElementById(id) || document.createElement('div');
  resultContainer.setAttribute('id', id);
  resultContainer.classList.add(...classes);

  const nameContainer =
    document.getElementById(id + '-name') || document.createElement('div');
  nameContainer.setAttribute('id', id + '-name');
  nameContainer.classList.add('stats__name');
  nameContainer.textContent = name;

  const valueContainer =
    document.getElementById(id + '-value') || document.createElement('div');
  valueContainer.setAttribute('id', id + '-value');
  valueContainer.classList.add('stats__value');

  addTimeToNode(valueContainer, value);

  if (history) {
    addHistory({ target: nameContainer, history });
  }

  resultContainer.appendChild(nameContainer);
  resultContainer.appendChild(valueContainer);

  return resultContainer;
};

export default createResultContainerEntry;
