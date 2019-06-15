import {RecordItem} from "../parse/type";

export function getItemTitle(item: RecordItem): string {
    let key: string = item.title || ''
    const author: string = item.author || ''
    if (author) {
        key = `${key}-${author}`
    }
    return key;
}
