export const functionReg =
  /\/\*\*([\s\S]*?)\s*\*\s*\/\s*(?:export\s+default\s+)?function\s+(\w+)\s*\((.*?)\)\s*{([\s\S]*?)(?:return\s+(.*?);)?/g;
