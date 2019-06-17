import {RecordItem} from "../parse/type";

export function getItemTitle(item: RecordItem): string {
    let key: string = item.title || ''
    const author: string = item.author || ''
    if (author) {
        key = `${key}-${author}`
    }
    return key;
}

export function isString(str: string) {
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
