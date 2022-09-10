import loadWorker from 'helpers/loadWorker';
import uploadHandler from 'handlers/uploadHandler';
import plotData from 'functions/plotData';
import addStats from 'functions/addStats';
import addChartPlaceholder from 'helpers/DOM/addChartPlaceholder';
import removeOldDataFromDOM from 'helpers/DOM/removeOldDataFromDOM';
import addSelection from 'functions/addSelection';
import { Statistics } from 'types';
import '../style/style.scss';
import addStatsPlaceholder from 'helpers/DOM/addStatsPlaceholder';
import updatePlotLines from 'helpers/plot/updatePlotLines';
import attachUploadForm from 'helpers/DOM/attachUploadForm';
import removeUploadFormFromDOM from 'helpers/DOM/removeUploadFormFromDOM';

function init() {
  const { postMessage, onMessage, onError } = loadWorker();

  attachUploadForm();

  const initializeFileUpload = () => {
    uploadHandler().then((csv: string) => {
      removeUploadFormFromDOM();
      postMessage({ csv });
    });
  };

  onMessage((message: any) => {
    const result: Statistics = message.data?.result;

    if (!result || message.data.error) {
      console.error('errored', message.data.error || 'no result');

      return;
    }

    removeOldDataFromDOM();
    addChartPlaceholder();
    plotData(result);

    const statsContainer = addStatsPlaceholder();
    addStats({
      title: 'All time statistics',
      resultData: result,
      target: statsContainer,
      onLineUpdate: () => updatePlotLines(result),
    });

    addSelection(result);

    initializeFileUpload();
  });

  onError((error: any) => console.error('WORKER ERROR', error));

  initializeFileUpload();
}

document.addEventListener('DOMContentLoaded', init);
