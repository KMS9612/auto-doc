import * as fs from "fs";
import * as path from "path";
import { functionReg } from "./regs/function.regs";
import { langPack } from "./language_pack/console/console.lang";
import { IConfigTypes } from "./types/config.type";
import { glob } from "glob";

console.log("----------Start Auto Documentation----------");

let configStr = "";
let parsedConfig: IConfigTypes | null = null;
let lang = "";

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
  let resultArr = [];
  const fileInner = fs.readFileSync(filePath, "utf-8");
  while ((matches = functionReg.exec(fileInner)) !== null) {
    const comment = matches[1].trim();
    const functionName = matches[2].trim();
    const params = matches[3].trim();
    const returnValue = matches[5] ? matches[5].trim() : "none"; // 반환값이 없을 경우 'none'

    resultArr.push({
      comment,
      functionName,
      params,
      returnValue,
    });

    console.log(resultArr);
    return;
  }
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

getConfig();
readJSFile();
console.log(2);
