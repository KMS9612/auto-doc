"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineSamePath = combineSamePath;
const saveAsHTML_1 = require("../func_html/saveAsHTML");
function combineSamePath(resultArr, lang) {
    let arr = [...resultArr];
    const groupedData = arr.reduce((acc, current) => {
        const { filePath } = current;
        // filePath가 이미 존재하는 경우
        if (!acc[filePath]) {
            acc[filePath] = []; // 빈 배열 생성
        }
        // 현재 항목을 해당 filePath 배열에 추가
        acc[filePath].push(current);
        return acc;
    }, {});
    (0, saveAsHTML_1.saveAsHTML)(groupedData, lang);
    return;
}
