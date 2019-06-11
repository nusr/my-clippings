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
const LANGUAGE_MAP: LanguageItem[] = [
    {
        label: '中文',
        value: 'zh-cn',
        data: zhCN
    },
    {
        label: 'English',
        value: 'en-us',
        data: enUS
    }
]
export default LANGUAGE_MAP;
