import enUS from './en-us'
import zhCN from './zh-cn'

export type LanguageData = {
    [key: string]: string | RegExp;
}
export type LanguageItem = {
    label: string;
    value: string;
    data: LanguageData;
}

export enum LanguageMap {
    zhCN = 'zh-CN',
    enUS = 'en-US'
}

const LANGUAGE_LIST: LanguageItem[] = [
    {
        label: '中文',
        value: LanguageMap.zhCN,
        data: zhCN
    },
    {
        label: 'English',
        value: LanguageMap.enUS,
        data: enUS
    }
]
export default LANGUAGE_LIST;
