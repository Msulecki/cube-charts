import config from 'config';

const removeUploadFormFromDOM = () => {
  const uploadSection = document.getElementById(config.id.uploadForm.section);

  if (uploadSection) document.body.removeChild(uploadSection);
};

export default removeUploadFormFromDOM;
