import React, {useEffect, useState} from 'react';
import styles from "./index.module.scss";
import TextInput from '../../components/TextInput'
import {parseContent} from '../../tool'
import zhCn from '../../i18n/zh-cn'
import {RecordItem} from '../../type'
import BookMenu from '../../components/BookMenu'
import BookClippings from '../../components/BookClippings'
import _ from 'lodash'

const HomePage: React.FunctionComponent = () => {
    const [contentList, setContentList] = useState<RecordItem[]>([])
    const [menuList, setMenuList] = useState<string[]>([])
    const [currentMenu, setCurrentMenu] = useState<string>('')
    const [bookData, setBookData] = useState<RecordItem[]>([])
    useEffect(() => {
        const temp: RecordItem[] = contentList.filter(v => v.key && v.key === currentMenu)
        setBookData(temp)
        console.log(temp)
    }, [contentList, currentMenu])

    function handleContentChange(data: string) {
        const result: RecordItem[] = parseContent(data, zhCn)
        const temp: string[] = []
        result.forEach((item: RecordItem) => {
            let key: string = item.title || ''
            const author: string = item.author || ''
            if (author) {
                key = `${key}-${author}`
            }
            item.key = key;
            if (temp && !temp.includes(key)) {
                temp.push(key)
            }
            item.backId = _.uniqueId('kindle-')
        })
        setContentList(result)
        setMenuList(temp)
        setCurrentMenu(temp[0])
    }

    function handleMenuChange(item: string) {
        setCurrentMenu(item)
    }

    return (
        <div className={styles.container}>
            <TextInput onChange={handleContentChange}/>
            <div>
                <div className={styles.bookMenu}>
                    <BookMenu menuList={menuList} onChange={handleMenuChange} value={currentMenu}/>
                </div>
                <div>
                    <BookClippings data={bookData}/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
