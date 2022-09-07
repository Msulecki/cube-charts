import { StatisticsAddData } from 'types';
import addSingleValueToStats from 'helpers/plot/addSingleValueToStats';
import addMultipleValuesToStats from 'helpers/plot/addMultipleValuesToStats';
import addAbsoluteValueToStats from 'helpers/plot/addAbsoluteValueToStats';
import config from 'config';

const addStats = ({
  resultData,
  target = document.body,
  uuid = '',
  onLineUpdate,
}: StatisticsAddData) => {
  const sectionElementFromDOM = document.getElementById('stats' + uuid);

  const statsContainer =
    sectionElementFromDOM || document.createElement('section');

  statsContainer.setAttribute('id', 'stats' + uuid);
  statsContainer.classList.add('stats');

  addSingleValueToStats({
    container: statsContainer,
    valueObject: resultData.bestTime,
    history: resultData.recordHistory,
    name: 'Best Time',
    id: config.id.stats.best + uuid,
    classes: ['stats__result', 'stats__best-time'],
  });

  addAbsoluteValueToStats({
    container: statsContainer,
    value: resultData.mean,
    onHover: onLineUpdate,
    name: 'Mean',
    plotNodeId: config.id.plot.mean,
    id: config.id.stats.mean + uuid,
    classes: ['stats__result', 'stats__mean'],
  });

  addAbsoluteValueToStats({
    container: statsContainer,
    value: resultData.median,
    onHover: onLineUpdate,
    name: 'Median',
    plotNodeId: config.id.plot.median,
    id: config.id.stats.median + uuid,
    classes: ['stats__result', 'stats__median'],
  });

  addMultipleValuesToStats({
    container: statsContainer,
    valueObject: resultData.Mo3,
    name: 'Mean of 3',
    id: config.id.stats.mo3 + uuid,
    classes: ['stats__result', 'stats__mo3'],
  });

  addMultipleValuesToStats({
    container: statsContainer,
    valueObject: resultData.Ao5,
    name: 'Average of 5',
    id: config.id.stats.ao5 + uuid,
    classes: ['stats__result', 'stats__ao5'],
  });

  addMultipleValuesToStats({
    container: statsContainer,
    valueObject: resultData.Ao12,
    name: 'Average of 12',
    id: config.id.stats.ao12 + uuid,
    classes: ['stats__result', 'stats__ao12'],
  });

  addMultipleValuesToStats({
    container: statsContainer,
    valueObject: resultData.Ao100,
    name: 'Average of 100',
    id: config.id.stats.ao100 + uuid,
    classes: ['stats__result', 'stats__ao100'],
  });

  if (!sectionElementFromDOM) {
    target.appendChild(statsContainer);
  }
};

export default addStats;
