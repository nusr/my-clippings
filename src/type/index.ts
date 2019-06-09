export interface FirstLine {
    title: string;
    author: string;
}

export interface SecondLine {
    time: string;
    type: string;
    location: string;
    page: string;
}

export interface RecordItem extends SecondLine, FirstLine {
    text: string;
}

export interface LanguageData {
    [key: string]: string;
}
