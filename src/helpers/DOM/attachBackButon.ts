import config from 'config';
import { BackButton } from 'types';

const attachBackButton = ({ onClick }: BackButton) => {
  const backButton = document.createElement('button');

  backButton.textContent = '↺';
  backButton.setAttribute('id', config.id.backButton);
  backButton.onclick = (e) => onClick(e);

  document.body.appendChild(backButton);
};

export default attachBackButton;
