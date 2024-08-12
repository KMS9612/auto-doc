import { langPack } from "../../language_pack/console/console.lang";
import { IResultArr } from "../../types/index.type";

export function generateTableRows(resultProperties: IResultArr, lang: string) {
  return `
      <table>
          <tr>
            <th>${langPack[lang].tableFName}</th>
            <th>${langPack[lang].tableComment}</th>
            <th>${langPack[lang].tableParam}</th>
            <th>${langPack[lang].tableRValue}</th>
          </tr>
          <tr>
            <td>${resultProperties.functionName}</td>
            <td>${resultProperties.comment}</td>
            <td>${resultProperties.params}</td>
            <td>${resultProperties.returnValue}</td>
          </tr>
      </table>
  `;
}
