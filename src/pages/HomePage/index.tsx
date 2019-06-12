import React, {useEffect, useState} from 'react';
import styles from "./index.module.scss";
import TextInput from '../../components/TextInput'
import {parseContent} from '../../tool'
import {RecordItem} from '../../type'
import BookMenu from '../../components/BookMenu'
import BookClippings from '../../components/BookClippings'
import _ from 'lodash'
import Store from '../../store'

function getItemTitle(item: RecordItem): string {
    let key: string = item.title || ''
    const author: string = item.author || ''
    if (author) {
        key = `${key}-${author}`
    }
    return key;
}

const HomePage: React.FunctionComponent = () => {
    const {languageData} = Store.useContainer()
    const [contentList, setContentList] = useState<RecordItem[]>([])
    const [menuList, setMenuList] = useState<string[]>([])
    const [currentMenu, setCurrentMenu] = useState<string>('')
    const [bookData, setBookData] = useState<RecordItem[]>([])


    useEffect(() => {
        const temp: RecordItem[] = contentList.filter(v => {
            const key: string = getItemTitle(v)
            return key && key === currentMenu
        })
        setBookData(temp)
    }, [contentList, currentMenu])

    function handleContentChange(data: string) {
        const result: RecordItem[] = parseContent(data, languageData)
        const temp: string[] = []
        result.forEach((item: RecordItem) => {
            const key: string = getItemTitle(item)
            if (temp && !temp.includes(key)) {
                temp.push(key)
            }
        })
        setContentList(result)
        setMenuList(temp)
        setCurrentMenu(temp[0])
    }

    function handleMenuChange(item: string) {
        setCurrentMenu(item)
    }

    const checkContent = _.isEmpty(contentList)
    const Content = () => (
        <div className={styles.content}>
            <div className={styles.bookMenu}>
                <BookMenu menuList={menuList} onChange={handleMenuChange} value={currentMenu}/>
            </div>
            <div className={styles.bookClippings}>
                <BookClippings data={bookData}/>
            </div>
        </div>
    )

    return (
        <div className={styles.container}>
            <TextInput onChange={handleContentChange}/>
            {checkContent ? null : <Content/>}

        </div>
    );
}

export default HomePage;
