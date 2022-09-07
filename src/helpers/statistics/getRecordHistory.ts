import { CSVParsedObject } from 'types';

const getRecordHistory = (times: CSVParsedObject[]) => {
  const recordHistory: CSVParsedObject[] = [];

  let currentBestTime = Infinity;

  times.forEach((time) => {
    if (time.time.value < currentBestTime && !time.time.dnf) {
      recordHistory.push(time);

      currentBestTime = time.time.value;
    }
  });

  return recordHistory;
};

export default getRecordHistory;
