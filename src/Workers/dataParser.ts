import parseCsvObjectValues from 'handlers/parseCsvObjectValues';
import parseToObject from 'handlers/parseToObject';
import { CSVRawObject, ParserMessage } from 'types';
import createStatisticsObject from 'helpers/statistics/createStatisticsObject';

self.onmessage = (props: ParserMessage) => {
  const {
    data: { csv },
  } = props;

  if (!csv) {
    return;
  }

  parseToObject(csv)
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
