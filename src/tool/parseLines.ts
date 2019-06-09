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

export function secondLine(lines: string[], language: any): SecondLine | Boolean {

    if (!_.isString(lines[1])) {
        return false;
    }

    const tempLine = lines[1].split('|');

    let singleRecord: Partial<SecondLine> = {};
    for (let y = 0; y < tempLine.length; y += 1) {
        let el = tempLine[y];
        // @todo - describe time parsing
        if (el.match(_.get(language, 'tool.parseLines.addType'))) {
            let [, temp] = el.split(_.get(language, 'tool.parseLines.addText'));
            singleRecord.time = new Date(trim(temp)).getTime()
        }
        // Examples of type and location
        // * Highlight Loc. 516
        // * Highlight on Page 19
        // * Highlight on Page 3 | Loc. 140  |
        // * Note on Page 11
        // * Bookmark Loc. 241

        // type: Highlight | Bookmark | Note
        if (el.match(_.get(language, 'tool.parseLines.highlightType'))) {
            singleRecord.type = _.get(language, 'tool.parseLines.highlightText')
        } else if (el.match(_.get(language, 'tool.parseLines.bookmarkType'))) {
            singleRecord.type = _.get(language, 'tool.parseLines.bookmarkText')
        } else if (el.match(_.get(language, 'tool.parseLines.noteType'))) {
            singleRecord.type = _.get(language, 'tool.parseLines.noteText')
        }

        // on Page (if exists)
        if (el.match(_.get(language, 'tool.parseLines.pageType'))) {
            const temp: string[] = el.split(_.get(language, 'tool.parseLines.pageText'));
            singleRecord.page = trim(_.last(temp) || '');
        }

        // location
        if (el.match(_.get(language, 'tool.parseLines.locationType'))) {
            const temp: string[] = el.split(_.get(language, 'tool.parseLines.locationText'));
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

    return _.trim(str, '\n\t ')
}
