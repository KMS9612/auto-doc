"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const function_regs_1 = require("./regs/function.regs");
const console_lang_1 = require("./language_pack/console/console.lang");
console.log("----------Start Auto Documentation----------");
let configStr = "";
let parsedConfig = null;
let lang = "";
/** Read auto.doc.json and Apply Config */
function getConfig() {
    const configPath = path.join(process.cwd(), "auto.doc.json");
    if (!fs.existsSync(configPath)) {
        configStr = fs.readFileSync("./src/config/default_config.json", "utf-8");
        parsedConfig = JSON.parse(configStr).config;
        if (parsedConfig) {
            lang = parsedConfig.lang;
            console.error(`${console_lang_1.langPack[lang].warning} ${console_lang_1.langPack[lang].configNotFound} ${console_lang_1.langPack[lang].defaultConfigApply}`);
        }
    }
    else {
        configStr = fs.readFileSync(configPath, "utf-8");
        parsedConfig = JSON.parse(configStr).config;
    }
}
function parseFunctions(filePath) {
    const code = fs.readFileSync(filePath, "utf-8");
    const matches = [...code.matchAll(function_regs_1.functionReg)];
    return matches;
}
function getDocumentation() {
    if (parsedConfig) {
        const pathArr = parsedConfig === null || parsedConfig === void 0 ? void 0 : parsedConfig.path;
        pathArr.forEach((path) => {
            console.log(path);
            parseFunctions(path);
        });
    }
}
getConfig();
getDocumentation();
