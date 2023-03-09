import parseCsvObjectValues from 'handlers/parseCsvObjectValues';
import parseToObject from 'handlers/parseToObject';
import { CSVRawObject, ParserMessage } from 'types';
import createStatisticsObject from 'helpers/statistics/createStatisticsObject';

self.onmessage = (props: ParserMessage) => {
  const {
    data: { csv, separator },
  } = props;

  if (!csv) {
    return;
  }

  parseToObject(csv, separator)
    .then((csvObject: CSVRawObject[]) => parseCsvObjectValues(csvObject))
    .then(createStatisticsObject)
    .then((result: any) => {
      self.postMessage({
        result,
      });
    })
    .catch((error: any) => {
      self.postMessage({ error });
    });
};
