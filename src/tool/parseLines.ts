import _ from 'lodash'

import {FirstLine, SecondLine} from '../type'

export function firstLine(lines: string[]): FirstLine | Boolean {
    if (!_.isString(lines[0])) {
        return false;
    }
    const title: string[] = lines[0].split(' (');
    const author: string = title[1] ? title[1].slice(0, -1) : '';
    return {
        title: title[0],
        author
    };
}

export function secondLine(lines: string[]): SecondLine | Boolean {

    if (!_.isString(lines[1])) {
        return false;
    }

    const tempLine = lines[1].split('|');

    let singleRecord: Partial<SecondLine> = {};
    for (let y = 0; y < tempLine.length; y += 1) {
        let el = tempLine[y];
        // @todo - describe time parsing
        if (el.match(/Added on/)) {
            let [, temp] = el.split(',');
            singleRecord.time = new Date(trim(temp))
        }
        // Examples of type and location
        // * Highlight Loc. 516
        // * Highlight on Page 19
        // * Highlight on Page 3 | Loc. 140  |
        // * Note on Page 11
        // * Bookmark Loc. 241

        // type: Highlight | Bookmark | Note
        if (el.match(/Highlight/)) {
            singleRecord.type = 'Highlight';
        } else if (el.match(/Bookmark/)) {
            singleRecord.type = 'Bookmark';
        } else if (el.match(/Note/)) {
            singleRecord.type = 'Note';
        }

        // on Page (if exists)
        if (el.match(/on Page/)) {
            const temp: string[] = el.split('on Page');
            singleRecord.page = trim(_.last(temp) || '');
        }

        // location
        if (el.match(/Loc./)) {
            const temp: string[] = el.split('Loc.');
            singleRecord.location = trim(_.last(temp) || '');
        }
    }
    return singleRecord as SecondLine;

}

export function thirdLine(lines: string[]): string {
    if (!_.isString(lines[2])) {
        return ''
    }
    return trim(lines[2]);

}

export function trim(str: string): string {
    str = str.replace(/^\s+/, '');
    for (let i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}
