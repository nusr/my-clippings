import React, {useEffect, useState} from "react";

import data, {LanguageData, LanguageItem, LanguageMap} from '../i18n'
import {setChromeLang} from './chrome'

export interface ContainerProviderProps<State = void> {
    initialState?: State
    children: React.ReactNode
}

export interface Container<Value, State = void> {
    Provider: React.ComponentType<ContainerProviderProps<State>>
    useContainer: () => Value
}

export function createContainer<Value, State = void>(
    useHook: (initialState?: State) => Value,
): Container<Value, State> {
    let Context = React.createContext<Value | null>(null)

    function Provider(props: ContainerProviderProps<State>) {
        let value = useHook(props.initialState)
        return (<Context.Provider value={value} > {props.children} </Context.Provider>)
    }

    function useContainer(): Value {
        let value = React.useContext(Context)
        if (value === null) {
            throw new Error("Component must be wrapped with <Container.Provider>")
        }
        return value
    }

    return {Provider, useContainer}
}

function useLanguage(initLang: LanguageMap) {
    // @ts-ignore
    let [languageData, setLanguageData] = useState<LanguageData>([])
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
