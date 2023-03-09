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
import attachBackButton from 'helpers/DOM/attachBackButton';
import removeBackButtonFromDOM from 'helpers/DOM/removeBackButtonFromDOM';

function init() {
  const { postMessage, onMessage, onError } = loadWorker();

  attachUploadForm();

  const originalData = {};

  const initializeFileUpload = () => {
    uploadHandler().then(({ csv, separator }) => {
      removeUploadFormFromDOM();

      console.log('postMessage', { csv, separator });
      postMessage({ csv, separator });
    });
  };

  onMessage((message: any) => {
    const result: Statistics = message.data?.result;

    console.log('onMessage', message);

    if (!result || message.data.error) {
      console.error('errored', message.data.error || 'no result');

      return;
    }

    Object.assign(originalData, result);

    reloadData(result);
  });

  onError((error: any) => console.error('WORKER ERROR', error));

  initializeFileUpload();

  const resetData = () => {
    removeOldDataFromDOM();
    attachUploadForm();
    initializeFileUpload();
    removeBackButtonFromDOM();
  };

  const reloadData = (result: Statistics) => {
    removeOldDataFromDOM();
    attachBackButton({ onClick: resetData });
    addChartPlaceholder();
    plotData(result);

    console.log('reload data', result);

    const statsContainer = addStatsPlaceholder();

    addStats({
      title: 'All time statistics',
      resultData: result,
      target: statsContainer,
      onLineUpdate: () => updatePlotLines(result),
    });

    addSelection({
      results: result,
      onSelection: reloadData,
      onReset: () => reloadData(originalData as Statistics),
    });

    initializeFileUpload();
  };
}

document.addEventListener('DOMContentLoaded', init);
