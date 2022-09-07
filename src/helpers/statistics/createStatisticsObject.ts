import { CSVParsedObject, Statistics } from 'types';
import getAverageOf from './getAverageOf';
import getEdgeTimes from './getEdgeTimes';
import getMean from './getMean';
import getMedian from './getMedian';
import getRecordHistory from './getRecordHistory';

const createStatisticsObject = (
  parsedCsvObject: CSVParsedObject[]
): Statistics => {
  const { bestTime, worstTime } = getEdgeTimes(parsedCsvObject);

  const mean = getMean(parsedCsvObject);
  const median = getMedian(parsedCsvObject);

  const Mo3 = getAverageOf(parsedCsvObject, 3, 0);
  const Ao5 = getAverageOf(parsedCsvObject, 5);
  const Ao12 = getAverageOf(parsedCsvObject, 12);
  const Ao100 = getAverageOf(parsedCsvObject, 100);

  const recordHistory = getRecordHistory(parsedCsvObject);

  return {
    allResults: parsedCsvObject,
    bestTime,
    worstTime,
    mean,
    median,
    Mo3,
    Ao5,
    Ao12,
    Ao100,
    recordHistory,
  };
};

export default createStatisticsObject;
