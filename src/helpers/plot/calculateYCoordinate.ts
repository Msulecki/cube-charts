import { YValueParameters } from 'types';

const calculateYCoordinate = ({
  currentValue,
  minValue,
  maxValue,
}: YValueParameters) => {
  return 100 - ((currentValue - minValue) / (maxValue - minValue)) * 100;
};

export default calculateYCoordinate;
