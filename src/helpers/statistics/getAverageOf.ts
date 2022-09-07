import { AverageOfResultObject, CSVParsedObject } from 'types/index';

const getAverageOf = (
  times: CSVParsedObject[],
  range: number,
  dropCount?: number
) => {
  if (range < 3) {
    throw new Error('Range cannot be less than 3');
  }

  const itemsToDrop =
    dropCount || Math.round(range / 10) + (Math.round(range / 10) % 2);

  const result: AverageOfResultObject = {
    value: Infinity,
    countedTimes: [],
    droppedTimes: { min: null, max: null },
  };

  for (let step = 0; step + range <= times.length; step++) {
    const currentTimes = [...times].slice(step, step + range);

    if (currentTimes.some((entry) => Boolean(entry.time.dnf))) {
      return;
    }

    const currentResult = structuredClone(result);

    const sortedTimes = currentTimes.sort(
      (a, b) => a.time?.value - b.time?.value
    );

    currentResult.droppedTimes.min = sortedTimes
      .splice(0, itemsToDrop / 2)
      .sort((a, b) => a.id - b.id);

    currentResult.droppedTimes.max = sortedTimes
      .splice(sortedTimes.length - itemsToDrop / 2)
      .sort((a, b) => a.id - b.id);

    currentResult.countedTimes = sortedTimes.sort((a, b) => a.id - b.id);

    const averageOfValue =
      sortedTimes.reduce((acc, curr) => {
        return acc + curr.time.value;
      }, 0) /
      (range - itemsToDrop);

    currentResult.value = Math.round(averageOfValue);

    if (currentResult.value < result.value) {
      Object.assign(result, currentResult);
    }
  }

  return result;
};

export default getAverageOf;
