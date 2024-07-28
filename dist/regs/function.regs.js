"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.innerFunctionReg = exports.functionReg = void 0;
const functionReg = /\/\*\*([\s\S]*?)\s*\*\s*\/\s*(?:export\s+default\s+)?function\s+(\w+)\s*\((.*?)\)\s*{([\s\S]*?)(?:return\s+(.*?);)?/g;
exports.functionReg = functionReg;
const innerFunctionReg = /\/\*\*([\s\S]*?)\s*\*\s*\/\s*function\s+(\w+)\s*\((.*?)\)\s*{([\s\S]*?)(?:return\s+(.*?);)?/g;
exports.innerFunctionReg = innerFunctionReg;
