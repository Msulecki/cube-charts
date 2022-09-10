import config from 'config/index';

const attachUploadForm = () => {
  const section = document.createElement('section');
  section.setAttribute('id', config.id.uploadForm.section);

  const uploadForm = document.createElement('form');
  uploadForm.setAttribute('id', config.id.uploadForm.form);

  const label = document.createElement('label');
  label.setAttribute('id', config.id.uploadForm.label);

  const fileInput = document.createElement('input');
  fileInput.setAttribute('id', config.id.uploadForm.fileInput);
  fileInput.setAttribute('type', 'file');
  fileInput.setAttribute('accept', '.csv');

  const submitInput = document.createElement('input');
  submitInput.setAttribute('id', config.id.uploadForm.submit);
  submitInput.setAttribute('type', 'submit');
  submitInput.setAttribute('value', 'SUBMIT');
  submitInput.classList.add('upload-submit');

  const labelText = document.createElement('span');
  labelText.setAttribute('id', config.id.uploadForm.labelText);
  labelText.textContent = 'Upload your CSV from CS Timer';

  const fileNameContainer = document.createElement('span');
  fileNameContainer.setAttribute('id', config.id.uploadForm.labelFilename);

  const filenameStart = document.createElement('div');
  filenameStart.setAttribute('id', config.id.uploadForm.filenameStart);

  const filenameEnd = document.createElement('div');
  filenameEnd.setAttribute('id', config.id.uploadForm.filenameEnd);

  fileNameContainer.appendChild(filenameStart);
  fileNameContainer.appendChild(filenameEnd);

  label.appendChild(labelText);
  label.appendChild(fileNameContainer);
  label.appendChild(fileInput);

  uploadForm.appendChild(label);
  uploadForm.appendChild(submitInput);

  section.appendChild(uploadForm);

  document.body.appendChild(section);
};

export default attachUploadForm;
