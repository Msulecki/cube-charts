const loadWorker = () => {
  const worker = new Worker(
    new URL('../Workers/dataParser.ts', import.meta.url)
  );

  const postMessage = (message: any) => {
    worker.postMessage(message);
  };

  const onMessage = (callback: Function) => {
    worker.onmessage = (data) => {
      callback(data);
    };
  };

  const onError = (callback: Function) => {
    worker.onerror = (error) => {
      callback(error);
    };
  };

  return { postMessage, onMessage, onError };
};

export default loadWorker;
