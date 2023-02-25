import config from 'config';
import { BackButton } from 'types';

const attachBackButton = ({ onClick }: BackButton) => {
  const backButton =
    document.getElementById(config.id.button.back) ||
    document.createElement('button');

  backButton.textContent = 'Upload new';
  backButton.setAttribute('id', config.id.button.back);
  backButton.onclick = (e) => onClick(e);

  document.body.appendChild(backButton);
};

export default attachBackButton;
