import _ from 'lodash'

import {FirstLine, SecondLine} from '../type'

export function firstLine(lines: string[]): FirstLine | Boolean {
    const [line,] = lines
    if (!_.isString(line)) {
        return false;
    }
    const [title, author] = line.split(' (');
    const realAuthor: string = author ? author.slice(0, -1) : '';
    return {
        title: title,
        author: realAuthor
    };
}

export function secondLine(lines: string[], language: any): SecondLine | Boolean {
    const [, line,] = lines
    if (!_.isString(line)) {
        return false;
    }

    const tempLine = line.split('|');

    let singleRecord: Partial<SecondLine> = {};
    for (let y = 0; y < tempLine.length; y += 1) {
        let el = tempLine[y]
        // @todo - describe time parsing
        if (el.match(_.get(language, 'tool.parseLines.addType'))) {
            const addText: string = _.get(language, 'tool.parseLines.addText')
            let [, temp] = el.split(addText);
            // TODO 日期格式化问题 不同语言不一致
            singleRecord.time = temp;
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
    const [, , line,] = lines
    if (!_.isString(line)) {
        return ''
    }
    return trim(line);

}

function trim(str: string): string {
    if (!_.isString(str)) {
        return ''
    }
    return _.trim(str)
}

