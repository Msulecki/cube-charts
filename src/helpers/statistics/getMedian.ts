import { CSVParsedObject } from 'types/index';

const getMedian = (times: CSVParsedObject[]) => {
  const sortedTimes = [...times]
    .sort((a, b) => a.time.value - b.time.value)
    .map((entry) => entry.time.value);

  const arrLength = times.length;
  const isEven = arrLength % 2 === 0;

  const result = isEven
    ? (sortedTimes[arrLength / 2 - 1] + sortedTimes[arrLength / 2]) / 2
    : sortedTimes[Math.ceil((arrLength - 1) / 2)];

  return Math.ceil(result);
};

export default getMedian;
