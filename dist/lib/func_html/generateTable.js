"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTableRows = generateTableRows;
const console_lang_1 = require("../../language_pack/console/console.lang");
function generateTableRows(resultProperties, lang) {
    return `
      <table>
          <tr>
            <th>${console_lang_1.langPack[lang].tableFName}</th>
            <th>${console_lang_1.langPack[lang].tableComment}</th>
            <th>${console_lang_1.langPack[lang].tableParam}</th>
            <th>${console_lang_1.langPack[lang].tableRValue}</th>
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
