import {RecordItem, FirstLine, SecondLine} from './type'
import _ from "lodash";


abstract class BaseParse {
    private dataText: string;

    constructor(data: string) {
        this.dataText = data;
    }

    abstract parseLocation(lines: string[]): SecondLine ;

    getResult(): RecordItem[] {
        const records: string[] = this.splitRecords(this.dataText)
        return this.parseLines(records)
    }



    parseTitle(lines: string[]): FirstLine {
        const [line,] = lines
        if (!_.isString(line)) {
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
        if (!_.isString(line)) {
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
                time: '',
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
            const third: string = this.parseContent(lines);
            if (third) {
                singleRecord.text = third;
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
        if (!_.isString(data)) {
            return ''
        }
        return _.trim(data)
    }

}

export default BaseParse