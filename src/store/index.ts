import {createContainer} from 'unstated-next'
import {useState} from 'react'
import _ from 'lodash'
import data, {LanguageData, LanguageItem} from '../i18n'

function useLanguage() {
    let [languageData, setLanguageData] = useState<LanguageData>(_.get(data, '[0].data'))
    const changeLanguage = (lang: string) => {
        const item: LanguageItem = data.find((v: LanguageItem): boolean => v.value === lang) as LanguageItem;
        setLanguageData(item.data)
    }
    return {
        languageData,
        changeLanguage
    }
}

export default createContainer(useLanguage)
