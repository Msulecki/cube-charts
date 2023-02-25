import config from 'config';

const removeBackButtonFromDOM = () => {
  const backButton = document.getElementById(config.id.button.back);

  if (backButton) {
    document.body.removeChild(backButton);
  }
};

export default removeBackButtonFromDOM;
