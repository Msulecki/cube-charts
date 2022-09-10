const uploadHandler = () => {
  const uploadForm = document.getElementById('upload-form') as HTMLFormElement;
  const fileInput = document.getElementById('file-input') as HTMLInputElement;

  const handleFileSelect = (e: any) => {
    const fileName: string = e.target?.files[0]?.name;

    if (!fileName) {
      return;
    }

    const uploadButton = document.getElementById('upload-submit');
    uploadButton.classList.add('enabled');

    const textEnd = fileName.slice(-8);
    const textStart = fileName.slice(0, -8);

    const textStartContainer = document.getElementById('filename-start');
    const textEndContainer = document.getElementById('filename-end');

    textStartContainer.textContent = textStart;
    textEndContainer.textContent = textEnd;
  };

  return new Promise((resolve, reject) => {
    const handleSubmit = (e: SubmitEvent) => {
      e.preventDefault();

      const csvData = fileInput.files[0];

      if (csvData) {
        const reader = new FileReader();

        const onLoad = (e: ProgressEvent<FileReader>) => {
          const { result } = e.target;

          uploadForm.reset();

          reader.removeEventListener('load', onLoad);
          reader.removeEventListener('error', onError);
          uploadForm?.removeEventListener('submit', handleSubmit);

          resolve(result);
        };

        const onError = (e: ProgressEvent<FileReader>) => {
          reader.removeEventListener('load', onLoad);
          reader.removeEventListener('error', onError);

          uploadForm?.removeEventListener('submit', handleSubmit);
          uploadForm?.removeEventListener('change', handleFileSelect);

          console.error('errored', e);
          reject(e);
        };

        reader.addEventListener('load', onLoad);
        reader.addEventListener('error', onError);

        reader.readAsText(csvData);
      }
    };

    uploadForm?.addEventListener('submit', handleSubmit);
    uploadForm?.addEventListener('change', handleFileSelect);
  });
};

export default uploadHandler;
