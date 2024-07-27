"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionReg = void 0;
exports.functionReg = /\/\*\*([\s\S]*?)\s*\*\s*\/\s*(?:export\s+default\s+)?function\s+(\w+)\s*\((.*?)\)\s*{([\s\S]*?)(?:return\s+(.*?);)?/g;
