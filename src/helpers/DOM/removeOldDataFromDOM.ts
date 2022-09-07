const removeOldDataFromDOM = () => {
  const chartSection = document.getElementById('chart-section');
  const statsSection = document.getElementById('stats-section');

  if (chartSection) {
    document.body.removeChild(chartSection);
  }

  if (statsSection) {
    document.body.removeChild(statsSection);
  }
};

export default removeOldDataFromDOM;
