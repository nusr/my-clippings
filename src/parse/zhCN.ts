import BaseParse from './BaseParse'
import {SecondLine} from "./type";
import _ from "lodash";

class ChineseParse extends BaseParse {

    parseLocation(lines: string[]): SecondLine {
        const [, line,] = lines
        if (!_.isString(line)) {
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
            if (el.match(/添加于/)) {
                let [, temp] = el.split('添加于');
                // TODO 日期格式化问题 不同语言不一致
                singleRecord.time = temp;
            }
            // type: Highlight | Bookmark | Note
            if (el.match(/标注/)) {
                singleRecord.type = '标注'
            } else if (el.match(/书签/)) {
                singleRecord.type = '书签'
            } else if (el.match(/笔记/)) {
                singleRecord.type = '笔记'
            }

            // on Page (if exists)
            if (el.match(/第/)) {
                const temp: string[] = el.split('第');
                singleRecord.page = this.trim(_.last(temp) || '');
            }

            // location
            if (el.match(/位置/)) {
                const temp: string[] = el.split('位置');
                singleRecord.location = this.trim(_.last(temp) || '');
            }
        }
        return singleRecord as SecondLine;
    }


}

export default ChineseParse
