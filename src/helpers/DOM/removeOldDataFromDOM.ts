import config from 'config';

const removeOldDataFromDOM = () => {
  const chartSection = document.getElementById(config.id.chart.section);
  const statsSection = document.getElementById(config.id.stats.section);

  if (chartSection) {
    document.body.removeChild(chartSection);
  }

  if (statsSection) {
    document.body.removeChild(statsSection);
  }
};

export default removeOldDataFromDOM;
