export interface FirstLine {
    title: string;
    author: string;
}

export interface SecondLine {
    time: number;
    type: string;
    location: string;
    page: string;
}

export interface RecordItem extends SecondLine, FirstLine {
    text: string;
    key: string;
    backId:string;
}

