export interface FirstLine {
    title: string;
    author: string;
}

export interface SecondLine {
    time: Date;
    type: string;
    location: string;
    page: string;
}

export interface RecordItem extends SecondLine, FirstLine {
    text: string;
}
