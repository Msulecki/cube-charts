import { CSVParsedObject } from 'types/index';

const getMean = (times: CSVParsedObject[]) => {
  const timesWithoutDnf = times.filter((entry) => !entry.time.dnf);

  const mean =
    timesWithoutDnf.reduce((acc, curr) => {
      return acc + curr?.time?.value;
    }, 0) / timesWithoutDnf.length;

  return Math.round(mean);
};

export default getMean;
