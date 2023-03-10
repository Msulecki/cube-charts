import config from 'config/index';
import { ParserMessageData, separatorsCollection } from 'types/index';

const uploadHandler = (): Promise<ParserMessageData> => {
  const uploadForm = document.getElementById(
    config.id.uploadForm.form
  ) as HTMLFormElement;
  const fileInput = document.getElementById(
    config.id.uploadForm.fileInput
  ) as HTMLInputElement;

  const handleFileSelect = (e: any) => {
    const fileName: string = e.target?.files?.[0]?.name;

    if (!fileName) {
      return;
    }

    const uploadButton = document.getElementById(config.id.uploadForm.submit);
    uploadButton.classList.add('enabled');

    const textEnd = fileName.slice(-8);
    const textStart = fileName.slice(0, -8);

    const textStartContainer = document.getElementById(
      config.id.uploadForm.filenameStart
    );
    const textEndContainer = document.getElementById(
      config.id.uploadForm.filenameEnd
    );

    textStartContainer.textContent = textStart;
    textEndContainer.textContent = textEnd;
  };

  return new Promise((resolve: (data: ParserMessageData) => void, reject) => {
    const handleSubmit = (e: SubmitEvent) => {
      e.preventDefault();

      const csvData = fileInput.files[0];

      if (csvData) {
        const reader = new FileReader();

        const onLoad = (e: ProgressEvent<FileReader>) => {
          const result = e.target.result as string;
          const separatorElement = document.getElementById(
            config.id.uploadForm.separator
          ) as HTMLInputElement;

          const separator = separatorElement.checked
            ? separatorsCollection[1]
            : separatorsCollection[0];

          uploadForm.reset();

          reader.removeEventListener('load', onLoad);
          reader.removeEventListener('error', onError);
          uploadForm?.removeEventListener('submit', handleSubmit);

          resolve({ csv: result, separator });
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
