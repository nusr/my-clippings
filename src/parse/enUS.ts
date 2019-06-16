import BaseParse from './BaseParse'
import {SecondLine} from "./type";
import {isString} from '../utils'
import * as R from 'ramda'

class EnglishParse extends BaseParse {


    parseLocation(lines: string[]): SecondLine {
        const [, line,] = lines
        if (!isString(line)) {
            return {
                type: '',
                time: '',
                location: ''
            }
        }

        const tempLine = line.split('|');

        let singleRecord: Partial<SecondLine> = {};
        for (let y = 0; y < tempLine.length; y += 1) {
            let el = tempLine[y]
            // @todo - describe time parsing
            if (el.match(/Added on/)) {
                let [, temp] = el.split(',');
                // TODO 日期格式化问题 不同语言不一致
                singleRecord.time = temp;
            }
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
                singleRecord.page = this.trim(R.last(temp) || '');
            }


            // location
            if (el.match(/Loc./)) {
                const temp: string[] = el.split('Loc.');
                singleRecord.location = this.trim(R.last(temp) || '');
            }
        }
        return singleRecord as SecondLine;
    }


}

export default EnglishParse
