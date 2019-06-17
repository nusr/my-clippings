const LANGUAGE_KEY: string = 'my-clippings-language'
const NODE_ENV: string = process.env.NODE_ENV
// @ts-ignore
const chrome = window.chrome;

export function setChromeLang(value: string) {
    if (NODE_ENV === "development") {
        localStorage.setItem(LANGUAGE_KEY, value)
        return;
    }
    // 同步存储的值
    chrome.storage.sync.set({[LANGUAGE_KEY]: value});
}

export function getChromeLang() {
    if (NODE_ENV === "development") {
        return new Promise(resolve => {
            resolve(localStorage.getItem(LANGUAGE_KEY))
        })
    }
    return new Promise(resolve => {
        chrome.storage.sync.get([LANGUAGE_KEY], function (result: any) {
            resolve(result[LANGUAGE_KEY])
        });
    })

}

