import enUS from './en-us'
import zhCN from './zh-cn'

export type LanguageData = {
    [key: string]: string | RegExp;
}
export type LanguageItem = {
    value: string;
    data: LanguageData;
}

export enum LanguageMap {
    zhCN = '中文',
    enUS = 'English'
}

const LANGUAGE_LIST: LanguageItem[] = [
    {
        value: LanguageMap.zhCN,
        data: zhCN
    },
    {
        value: LanguageMap.enUS,
        data: enUS
    }
]
export default LANGUAGE_LIST;
