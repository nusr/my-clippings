import {createContainer} from 'unstated-next'
import {useEffect, useState} from 'react'
import data, {LanguageData, LanguageItem, LanguageMap} from '../i18n'

function useLanguage(initLang: LanguageMap = LanguageMap.enUS) {
    // @ts-ignore
    let [languageData, setLanguageData] = useState<LanguageData>([])
    let [language, setLanguage] = useState<LanguageMap>(initLang)
    const changeLanguage = (lang: LanguageMap) => {
        setLanguage(lang)
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

const Store = createContainer(useLanguage)

export function getI18n(data: string): string {
    const {languageData} = Store.useContainer();
    return languageData[data]
}

export default Store;
