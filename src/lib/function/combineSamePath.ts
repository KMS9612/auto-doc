import { IResultArr } from "../../types/index.type";
import { saveAsHTML } from "../func_html/saveAsHTML";

export function combineSamePath(resultArr: IResultArr[], filePath: string) {
  let arr = [...resultArr];
  const groupedData = arr.reduce((acc: any, current: IResultArr) => {
    const { filePath } = current;
    // filePath가 이미 존재하는 경우
    if (!acc[filePath]) {
      acc[filePath] = []; // 빈 배열 생성
    }

    // 현재 항목을 해당 filePath 배열에 추가
    acc[filePath].push(current);
    return acc;
  }, {});
  console.log(groupedData);
  return;
}
