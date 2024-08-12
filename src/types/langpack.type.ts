type LanguageKeys =
  | "configNotFound"
  | "defaultConfigApply"
  | "warning"
  | "functionList"
  | "tableFName"
  | "tableComment"
  | "tableParam"
  | "tableRValue";

export interface ILanguagePack {
  [key: string]: Record<LanguageKeys, string>;
}
