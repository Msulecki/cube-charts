import { CSVRawObject } from 'types';

const parseCsvObjectValues = (csvRawObject: CSVRawObject[]) =>
  new Promise((resolve, reject) => {
    try {
      const csvParsedObject = csvRawObject.map((entry) => {
        const id = Number(entry.id);
        const date = new Date(entry.date);

        const add2 = entry.time.includes('+');
        const dnf = entry.time.includes('DNF');

        const timeArr = entry.time
          .replace(/DNF\(|\)|\+/, '')
          .split(':')
          .reverse();
        const time = (Number(timeArr[0]) + 60 * Number(timeArr[1] || 0)) * 100;

        if (!Number.isFinite(id) || !Number.isFinite(time) || !date) {
          reject(`Invalid entry: ${JSON.stringify(entry)}`);
        }

        return { ...entry, id, date, time: { value: time, add2, dnf } };
      });

      resolve(csvParsedObject);
    } catch (error) {
      reject(error);
    }
  });

export default parseCsvObjectValues;
