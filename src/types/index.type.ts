export interface IResultArr {
  comment: string;
  functionName: string;
  params: string;
  returnValue: string;
  filePath: string;
}

export interface IGroupedData {
  [key: string]: IResultArr[];
}
