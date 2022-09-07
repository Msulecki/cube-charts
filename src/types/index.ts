type ParserMessageData = {
  csv: string;
};

export interface ParserMessage {
  data: ParserMessageData;
}

export interface CSVRawObject {
  id: string;
  time: string;
  scramble: string;
  date: string;
}

interface CSVParsedTime {
  value: number;
  add2: boolean;
  dnf: boolean;
}

export interface CSVParsedObject {
  id: number;
  time: CSVParsedTime;
  scramble: string;
  date: Date;
  selected?: boolean;
}

interface AverageOfDroppedTimes {
  min?: CSVParsedObject[];
  max?: CSVParsedObject[];
}

export interface AverageOfResultObject {
  value: number;
  countedTimes: CSVParsedObject[];
  droppedTimes: AverageOfDroppedTimes;
}

export interface Statistics {
  allResults: CSVParsedObject[];
  bestTime: CSVParsedObject;
  worstTime: CSVParsedObject;
  mean: number;
  median: number;
  Mo3: AverageOfResultObject;
  Ao5: AverageOfResultObject;
  Ao12: AverageOfResultObject;
  Ao100: AverageOfResultObject;
  recordHistory: CSVParsedObject[];
}

export interface StatisticsAddData {
  resultData: Statistics;
  target: HTMLElement;
  uuid?: string;
  onLineUpdate?: Function;
}

interface StatisticsEntry {
  id: string;
  container: HTMLElement;
  classes: string[];
  name: string;
}

export interface SingleStatisticsEntry extends StatisticsEntry {
  valueObject: CSVParsedObject;
  history: CSVParsedObject[];
}

export interface MultipleStatisticsEntry extends StatisticsEntry {
  valueObject: AverageOfResultObject;
}

export interface AbsoluteStatisticsEntry extends StatisticsEntry {
  onHover: Function;
  value: number;
  plotNodeId: string;
}

export interface ResultContainerEntry {
  id: string;
  classes: string[];
  name: string;
  value: number;
  history?: CSVParsedObject[];
}

export interface ResultsHistory {
  target: HTMLElement;
  history: CSVParsedObject[];
}

export interface YValueParameters {
  currentValue: number;
  minValue: number;
  maxValue: number;
}

export interface YAxisDescription {
  min: number;
  max: number;
}

export interface XAxisDescription {
  first: CSVParsedObject;
  last: CSVParsedObject;
}

interface PlotElement {
  target: HTMLElement;
  id: string;
  y: number;
}

export interface PlotPoint extends PlotElement {
  x: string;
}

export interface PlotLine extends PlotElement {
  classes: string[];
}
