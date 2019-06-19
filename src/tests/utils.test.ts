import {isString, getItemTitle} from '../utils'

describe('isString', () => {
    it('isString should return right result', () => {
        expect(isString('')).toBeTruthy()
        expect(isString('isString')).toBeTruthy()
        expect(isString('test.test')).toBeTruthy()
    });
    it('isString should handle exception', () => {
        expect(isString(null)).toBeFalsy()
        expect(isString({})).toBeFalsy()
        expect(isString(undefined)).toBeFalsy()
        expect(isString(22)).toBeFalsy()
        expect(isString(Symbol())).toBeFalsy()
    });
});

describe('getItemTitle', () => {
    it('getItemTitle should return right result', () => {
        expect(getItemTitle({
            title: '',
            author: '',
            time: '',
            type: '',
            location: '',
            text: ''
        })).toBe('')
        expect(getItemTitle({
            title: 'title',
            author: '',
            time: '',
            type: '',
            location: '',
            text: ''
        })).toBe('title')
        expect(getItemTitle({
            title: 'title',
            author: 'author',
            time: '',
            type: '',
            location: '',
            text: ''
        })).toBe('title-author')
    });
});
