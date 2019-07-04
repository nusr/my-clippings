import BaseParse from './BaseParse'
import {SecondLine} from "./type";
import {isString} from '../utils'
import * as R from 'ramda'

const halfDay: number = 12 * 3600 * 1000

function removeType(str: string): string {
    return str.slice(0, -3)
}

function formatTime(time: string): number {
    const stdTime = time.replace(/[\s\u4e00-\u9fa5]{7}/gm, ' ').replace(/[\u4e00-\u9fa5]/gm, '/')
    const isAdd = time.includes('下午')
    return new Date(stdTime).getTime() + (isAdd ? halfDay : 0)
}

class ChineseParse extends BaseParse {

    parseLocation(lines: string[]): SecondLine {
        const [, line,] = lines
        if (!isString(line)) {
            return {
                type: '',
                time: 0,
                location: ''
            }
        }

        const tempLine = line.split('|');

        let singleRecord: Partial<SecondLine> = {};
        for (let y = 0; y < tempLine.length; y += 1) {
            let el = tempLine[y]
            // @todo - describe time parsing
            if (el.match(/添加于/)) {
                let [, temp] = el.split('添加于') || ''
                // TODO 日期格式化问题 不同语言不一致
                singleRecord.time = formatTime(temp)
                // replace(/[\s\u4e00-\u9fa5]{7}/gm, ' ').replace(/[\u4e00-\u9fa5]/gm, '/')
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
                singleRecord.page = removeType(this.trim(R.last(temp) || ''))
            } else {
                // location
                if (el.match(/位置/)) {
                    const temp: string[] = el.split('位置');
                    singleRecord.location = removeType(this.trim(R.last(temp) || ''))
                }
            }


        }
        return singleRecord as SecondLine;
    }


}

export default ChineseParse
