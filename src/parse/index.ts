import {LanguageMap} from '../i18n'
import ZhCN from './zhCN'
import EnUS from './enUS'
import {RecordItem} from './type'

export default function parseKindle(dataText: string, lang: LanguageMap): RecordItem[] {
    if (lang === LanguageMap.enUS) {
        return new EnUS(dataText).getResult()
    }
    return new ZhCN(dataText).getResult()
}
