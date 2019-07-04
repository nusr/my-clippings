import {useEffect, useState} from "react";
import {createContainer} from './hook'
import data, {LanguageData, LanguageItem, LanguageMap} from '../i18n'
import {setChromeLang} from './chrome'


function useLanguage(initLang: LanguageMap) {
    let [languageData, setLanguageData] = useState<LanguageData>({})
    let [language, setLanguage] = useState<LanguageMap>(initLang || LanguageMap.enUS)
    const changeLanguage = (lang: LanguageMap) => {
        setLanguage(lang)
        setChromeLang(lang)

    }
    useEffect(() => {
        const item: LanguageItem = data.find((v: LanguageItem): boolean => v.value === language) as LanguageItem;
        setLanguageData(item.data)
    }, [language])
    return {
        languageData,
        changeLanguage,
        language
    }
}

// @ts-ignore
const Store = createContainer(useLanguage)

export function getI18n(data: string): string {
    const {languageData} = Store.useContainer();
    return languageData[data]
}


export default Store;
