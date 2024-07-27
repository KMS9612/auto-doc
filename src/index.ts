import * as fs from "fs";
import * as path from "path";
import { functionReg } from "./regs/function.regs";
import { langPack } from "./language_pack/console/console.lang";
import { IConfigTypes } from "./types/config.type";

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

function parseFunctions(filePath: string) {
  const code = fs.readFileSync(filePath, "utf-8");

  const matches = [...code.matchAll(functionReg)];

  return matches;
}

function getDocumentation() {
  if (parsedConfig) {
    const pathArr = parsedConfig?.path;
    pathArr.forEach((path) => {
      console.log(path);
      parseFunctions(path);
    });
  }
}

getConfig();
getDocumentation();
