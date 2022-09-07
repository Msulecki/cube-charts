import { CSVParsedObject } from 'types/index';

const getEdgeTimes = (times: CSVParsedObject[]) => {
  const sortedTimes = [...times]
    .sort((a, b) => a.time.value - b.time.value)
    .filter((entry) => !entry.time.dnf);

  return {
    bestTime: sortedTimes.at(0),
    worstTime: sortedTimes.at(-1),
  };
};

export default getEdgeTimes;
