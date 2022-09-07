import config from 'config';

const addStatsPlaceholder = (target: HTMLElement = document.body) => {
  const statsPlaceholder =
    document.getElementById(config.id.stats.statsContainer) ||
    document.createElement('article');
  statsPlaceholder.setAttribute('id', config.id.stats.statsContainer);
  statsPlaceholder.setAttribute('class', 'stats__container');

  target.appendChild(statsPlaceholder);

  return statsPlaceholder;
};

export default addStatsPlaceholder;
