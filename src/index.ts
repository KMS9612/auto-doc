import * as fs from "fs";
import * as path from "path";
import { langPack } from "./language_pack/console/console.lang";
import { IConfigTypes } from "./types/config.type";
import { glob } from "glob";
import { IResultArr } from "./types/index.type";
import { functionReg, innerFunctionReg } from "./regs/function.regs";

console.log("----------Start Auto Documentation----------");

let configStr = "";
let parsedConfig: IConfigTypes | null = null;
let lang = "";
let resultArr: IResultArr[] = [];

/** Read auto.doc.json and Apply Config */
function getConfig() {
  const configPath = path.join(process.cwd(), "auto.doc.json");

  if (!fs.existsSync(configPath)) {
    configStr = fs.readFileSync("./src/config/default_config.json", "utf-8");
    parsedConfig = JSON.parse(configStr).config;

    if (parsedConfig) {
      lang = parsedConfig.lang;
      console.error(
        `${langPack[lang].warning} ${langPack[lang].configNotFound} ${langPack[lang].defaultConfigApply}`
      );
    }
  } else {
    configStr = fs.readFileSync(configPath, "utf-8");
    parsedConfig = JSON.parse(configStr).config;
  }
}

function fileConvertToString(filePath: string) {
  console.log(`Start Convert ${filePath}`);
  let matches;
  const fileInner = fs.readFileSync(filePath, "utf-8");

  // 최상위 함수 Convert
  while ((matches = functionReg.exec(fileInner)) !== null) {
    const comment = matches[1] ? matches[1].trim() : "no comment";
    const functionName = matches[2] ? matches[2].trim() : "no name";
    const params = matches[3] ? matches[3].trim() : "no params";
    const returnValue = matches[5] ? matches[5].trim() : "none";

    resultArr.push({
      filePath,
      comment,
      functionName,
      params,
      returnValue,
    });
  }

  // 하위함수 Convert
  while ((matches = innerFunctionReg.exec(filePath)) !== null) {
    const comment = matches[1] ? matches[1].trim() : "no comment";
    const functionName = matches[2] ? matches[2].trim() : "no name";
    const params = matches[3] ? matches[3].trim() : "no params";
    const returnValue = matches[5] ? matches[5].trim() : "none";

    resultArr.push({
      filePath,
      comment,
      functionName,
      params,
      returnValue,
    });
  }
  console.table(resultArr);
  saveAsHTML(resultArr);
  return;
}

async function readJSFile() {
  if (parsedConfig) {
    const pathArr = parsedConfig.path;

    pathArr.forEach(async (path) => {
      await glob(path, {
        nodir: true,
        ignore: ["node_modules/**", "./src/**", "./dist/**"],
      }).then((res) => {
        res.forEach((path) => {
          fileConvertToString(path);
        });
      });
    });
  }
}

function generateTableRows(resultArr: IResultArr[]) {
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

function saveAsHTML(resultArr: IResultArr[]) {
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

function startDoc() {
  getConfig();
  readJSFile();
  console.log(4);
  return;
}

startDoc();
