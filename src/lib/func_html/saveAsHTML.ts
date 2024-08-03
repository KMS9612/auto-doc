import * as fs from "fs";
import { IResultArr } from "../../types/index.type";
import { generateTableRows } from "./generateTable";

export function saveAsHTML(resultArr: IResultArr[]) {
  const table = generateTableRows(resultArr);

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="ko">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Function List</title>
      <style>
          body { font-family: Arial, sans-serif; }
          table { width: 100%; border-collapse: collapse; margin-bottom:20px; }
          th, td {width:25%; padding: 8px; text-align: left; border: 1px solid #ddd; }
          th { background-color: #f2f2f2; }
      </style>
  </head>
  <body>
      <h1>Function List</h1>
      ${table}
  </body>
  </html>
  `;

  fs.writeFileSync("doc.html", htmlContent, "utf-8");
}
