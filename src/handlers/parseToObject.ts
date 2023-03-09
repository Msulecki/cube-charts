import config from 'config';
import { CSVSeparator } from 'types/index';

const parseToObject = (csv: string, separator: CSVSeparator) =>
  new Promise((resolve, reject) => {
    const columnMap = config.csvColumnMap;

    try {
      const result = csv
        .split('\r\n')
        .filter((_, index) => index > 0)
        .map((item) => {
          const itemArray = item.split(separator);

          const itemObject = itemArray.reduce((acc, curr, index) => {
            if (columnMap[index]) {
              return { ...acc, [columnMap[index]]: curr };
            }

            return acc;
          }, {});

          return itemObject;
        });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });

export default parseToObject;
