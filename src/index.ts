import * as fs from "fs";
import * as path from "path";
import { langPack } from "./language_pack/console/console.lang";
import { IConfigTypes } from "./types/config.type";
import { glob } from "glob";
import { IResultArr } from "./types/index.type";
import { functionReg, innerFunctionReg } from "./regs/function.regs";
import { combineSamePath } from "./lib/function/combineSamePath";

console.log("----------Start Auto Documentation----------");

let configStr = "";
let parsedConfig: IConfigTypes | null = null;
let lang = "";
let resultArr: IResultArr[] = [];
let defaultConfigPath = {
  product: "node_modules/auto-document/config/default_config.json",
  test: "config/default_config.json",
};

/** Read auto.doc.json and Apply Config */
function getConfig() {
  const configPath = path.join(process.cwd(), "auto.doc.json");

  // If User did not make auto.doc.json, apply Default Config
  if (!fs.existsSync(configPath)) {
    configStr = fs.readFileSync(defaultConfigPath.product, "utf-8");
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
  combineSamePath(resultArr, lang);
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

export function startDoc() {
  getConfig();
  readJSFile();
  return;
}

startDoc();
