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
exports.saveAsHTML = saveAsHTML;
const fs = __importStar(require("fs"));
const generateTable_1 = require("./generateTable");
const console_lang_1 = require("../../language_pack/console/console.lang");
function saveAsHTML(resultArr, lang) {
    let table = `<h1>${console_lang_1.langPack[lang].functionList}</h1>`;
    for (let file in resultArr) {
        table += `<h1>${file}</h1>`;
        resultArr[file].forEach((el) => {
            table += (0, generateTable_1.generateTableRows)(el, lang);
        });
    }
    const htmlContent = `
  <!DOCTYPE html>
  <html lang=${lang}>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${console_lang_1.langPack[lang].functionList}</title>
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
