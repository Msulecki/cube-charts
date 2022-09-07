const uploadHandler = () => {
  const uploadForm = document.getElementById('upload-form') as HTMLFormElement;
  const fileInput = document.getElementById('file-input') as HTMLInputElement;

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

          console.error('errored', e);
          reject(e);
        };

        reader.addEventListener('load', onLoad);
        reader.addEventListener('error', onError);

        reader.readAsText(csvData);
      }
    };

    uploadForm?.addEventListener('submit', handleSubmit);
  });
};

export default uploadHandler;
