type LanguageKeys = "configNotFound" | "defaultConfigApply" | "warning";

export interface ILanguagePack {
  [key: string]: Record<LanguageKeys, string>;
}
