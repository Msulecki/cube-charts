import config from 'config/index';

const attachSeparatorSelector = (parentNode: HTMLElement) => {
  const separatorWrapper = document.createElement('div');
  separatorWrapper.classList.add('separator');

  const semicolonSeparator = document.createElement('span');
  semicolonSeparator.classList.add('separator__option');
  semicolonSeparator.textContent = ';';

  const commaSeparator = document.createElement('span');
  commaSeparator.classList.add('separator__option');
  commaSeparator.textContent = ',';

  const separatorSelectInput = document.createElement('input');
  separatorSelectInput.classList.add('separator__input');
  separatorSelectInput.setAttribute('id', config.id.uploadForm.separator);
  separatorSelectInput.type = 'checkbox';

  const separatorToggle = document.createElement('div');
  separatorToggle.classList.add('separator__toggle');

  const separatorToggleIndicator = document.createElement('div');
  separatorToggleIndicator.classList.add('separator__toggle-indicator');

  separatorToggle.appendChild(separatorToggleIndicator);

  const separatorSelectLabel = document.createElement('label');
  separatorSelectLabel.classList.add('separator__label');
  separatorSelectLabel.onclick = (e: any) => {
    if (separatorSelectInput.checked) {
      separatorToggleIndicator.classList.remove(
        'separator__toggle-indicator--uncheck'
      );
      separatorToggleIndicator.classList.add(
        'separator__toggle-indicator--check'
      );

      separatorWrapper.classList.add('separator--selected');
    } else {
      separatorToggleIndicator.classList.remove(
        'separator__toggle-indicator--check'
      );
      separatorToggleIndicator.classList.add(
        'separator__toggle-indicator--uncheck'
      );

      separatorWrapper.classList.remove('separator--selected');
    }
  };

  separatorSelectLabel.appendChild(separatorSelectInput);
  separatorSelectLabel.appendChild(separatorToggle);

  separatorWrapper.appendChild(semicolonSeparator);
  separatorWrapper.appendChild(separatorSelectLabel);
  separatorWrapper.appendChild(commaSeparator);

  parentNode.appendChild(separatorWrapper);
};

export default attachSeparatorSelector;
