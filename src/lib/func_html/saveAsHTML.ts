import * as fs from "fs";
import { IGroupedData, IResultArr } from "../../types/index.type";
import { generateTableRows } from "./generateTable";
import { langPack } from "../../language_pack/console/console.lang";

export function saveAsHTML(resultArr: IGroupedData, lang: string) {
  let table = `<h1>${langPack[lang].functionList}</h1>`;

  for (let file in resultArr) {
    table += `<h1>${file}</h1>`;
    resultArr[file].forEach((el: IResultArr) => {
      table += generateTableRows(el, lang);
    });
  }

  const htmlContent = `
  <!DOCTYPE html>
  <html lang=${lang}>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${langPack[lang].functionList}</title>
      <style>
          body { font-family: Arial, sans-serif; }
          table { width: 100%; border-collapse: collapse; margin-bottom:20px; }
          th, td {width:25%; padding: 8px; text-align: left; border: 1px solid #ddd; }
          th { background-color: #f2f2f2; }
      </style>
  </head>
  <body>
      ${table}
  </body>
  </html>
  `;

  fs.writeFileSync("doc.html", htmlContent, "utf-8");
}
