import {RecordItem, FirstLine, SecondLine} from './type'
import * as R from 'ramda'
import {isString} from '../utils'

abstract class BaseParse {
    private dataText: string;

    constructor(data: string) {
        this.dataText = data;
    }

    abstract parseLocation(lines: string[]): SecondLine ;

    getResult(): RecordItem[] {
        const records: string[] = this.splitRecords(this.dataText)
        const list: RecordItem[] = this.parseLines(records)
        list.sort((a: RecordItem, b: RecordItem): number => {
            return a.time - b.time
        })
        return list;
    }


    parseTitle(lines: string[]): FirstLine {
        const [line,] = lines
        if (!isString(line)) {
            return {
                title: '',
                author: ''
            }
        }
        const [title, author] = line.split(' (');
        const realAuthor: string = author ? author.slice(0, -1) : '';
        return {
            title,
            author: realAuthor
        };
    }


    parseContent(lines: string[]): string {
        const [, , line,] = lines
        if (!isString(line)) {
            return ''
        }
        return this.trim(line);
    }


    parseLines(records: string[]): RecordItem[] {
        let result: RecordItem[] = [];
        for (let record of records) {
            // split record into lines (section of a record - title / time / text)
            const lines: string[] = this.splitRecord(record);
            let singleRecord: RecordItem = {
                title: '',
                author: '',
                time: 0,
                type: '',
                location: '',
                text: ''
            };
            // first line - title and author
            const first: FirstLine = this.parseTitle(lines);

            singleRecord.title = first.title;
            singleRecord.author = first.author;
            //second line - type, location, time,page
            const second: SecondLine = this.parseLocation(lines);
            singleRecord =
                {
                    ...singleRecord,
                    ...second
                }

            // third line - content
            const third: string = this.parseContent(lines) || ''
            singleRecord.text = third
            if (singleRecord.title) {
                result.push(singleRecord);
            }

        }
        return result;
    }

    splitRecords(data: string): string[] {
        return data.split('==========')
    }

    splitRecord(record: string): string[] {
        const list: string[] = record.split('\r\n');
        let lines: string[] = [];
        list.forEach((item: string) => {
            if (item) {
                lines.push(item.trim());
            }
        })
        return lines;
    }

    trim(data: string): string {
        if (!isString(data)) {
            return ''
        }
        return R.trim(data)
    }

}

export default BaseParse
