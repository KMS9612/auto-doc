import { IResultArr } from "../../types/index.type";

export function generateTableRows(resultArr: IResultArr[]) {
  return resultArr
    .map(
      (func) => `
      <table>
          <tr>
            <th>FilePath</th>
            <th>Function Name</th>
            <th>Comment</th>
            <th>Parameters</th>
            <th>Return Value</th>
          </tr>
          <tr>
            <td>${func.filePath}</td>
            <td>${func.functionName}</td>
            <td>${func.comment}</td>
            <td>${func.params}</td>
            <td>${func.returnValue}</td>
          </tr>
      </table>
  `
    )
    .join("");
}
