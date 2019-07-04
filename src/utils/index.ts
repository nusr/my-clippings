import {RecordItem} from "../parse/type";

/**
 * 获取菜单标题
 * @param item
 */
export function getItemTitle(item: RecordItem): string {
    let key: string = item.title || ''
    const author: string = item.author || ''
    if (author) {
        key = `${key}-${author}`
    }
    return key;
}

function addZero(temp: number): string {
    if (temp < 10) {
        return `0${temp}`
    }
    return `${temp}`
}

/**
 * 统一格式化时间
 * @param temp
 */
export function formatTime(temp: number): string {
    let date: Date;
    try {
        date = new Date(temp)
    } catch (e) {
        date = new Date()
    }
    const year: number = date.getFullYear()
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate()
    const hour: number = date.getHours()
    const minute: number = date.getMinutes()
    const second: number = date.getSeconds()
    return `${year}-${addZero(month)}-${addZero(day)} ${addZero(hour)}:${addZero(minute)}:${addZero(second)}`
}

/**
 *
 * @param str
 */

export function isString(str: any) {
    return Object.prototype.toString.call(str) === '[object String]'
}

function easeInOutQuad(t: number, b: number, c: number, d: number): number {
    if ((t /= d / 2) < 1) {
        return (c / 2) * t * t + b;
    }
    return (-c / 2) * (--t * (t - 2) - 1) + b;
}


export function backToTop(backPosition: number = 0): void {
    const start: number = window.pageYOffset;
    let i: number = 0;
    let interval: any = setInterval(() => {
        const next: number = Math.floor(easeInOutQuad(10 * i, start, -start, 500));
        if (next <= backPosition) {
            window.scrollTo(0, backPosition);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            clearInterval(interval);
        } else {
            window.scrollTo(0, next);
        }
        i++;
    }, 16.7);
}
