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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDoc = startDoc;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const console_lang_1 = require("./language_pack/console/console.lang");
const glob_1 = require("glob");
const function_regs_1 = require("./regs/function.regs");
const combineSamePath_1 = require("./lib/function/combineSamePath");
const saveAsHTML_1 = require("./lib/func_html/saveAsHTML");
console.log("----------Start Auto Documentation----------");
let configStr = "";
let parsedConfig = null;
let lang = "";
let resultArr = [];
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
function fileConvertToString(filePath) {
    console.log(`Start Convert ${filePath}`);
    let matches;
    const fileInner = fs.readFileSync(filePath, "utf-8");
    // 최상위 함수 Convert
    while ((matches = function_regs_1.functionReg.exec(fileInner)) !== null) {
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
    while ((matches = function_regs_1.innerFunctionReg.exec(filePath)) !== null) {
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
    (0, saveAsHTML_1.saveAsHTML)(resultArr);
    (0, combineSamePath_1.combineSamePath)(resultArr, filePath);
    return;
}
function readJSFile() {
    return __awaiter(this, void 0, void 0, function* () {
        if (parsedConfig) {
            const pathArr = parsedConfig.path;
            pathArr.forEach((path) => __awaiter(this, void 0, void 0, function* () {
                yield (0, glob_1.glob)(path, {
                    nodir: true,
                    ignore: ["node_modules/**", "./src/**", "./dist/**"],
                }).then((res) => {
                    res.forEach((path) => {
                        fileConvertToString(path);
                    });
                });
            }));
        }
    });
}
function startDoc() {
    getConfig();
    readJSFile();
    console.log(2);
    return;
}
startDoc();
