import config from 'config';

const removeBackButtonFromDOM = () => {
  const backButton = document.getElementById(config.id.backButton);

  if (backButton) {
    document.body.removeChild(backButton);
  }
};

export default removeBackButtonFromDOM;
