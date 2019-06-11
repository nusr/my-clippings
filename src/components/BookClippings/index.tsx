import React from 'react';
import {RecordItem} from '../../type'
import styles from './index.module.scss'
import _ from 'lodash'

type Props = {
    data: RecordItem[] | undefined
};
const BookClippings: React.FunctionComponent<Props> = ({
                                                           data = []
                                                       }) => {
    if (_.isEmpty(data)) {
        return null;
    }
    console.log(data)
    return (
        <div className={styles.container}>
            {
                data.map((item: RecordItem) => (
                    <div key={item.time + item.title + item.location} className={styles.item}>
                        <div>
                            <span className={styles.title}>{item.title}</span>
                            <span>{item.author}</span>
                        </div>
                        <div className={styles.info}>
                            <span>{item.type}</span>
                            <span>{item.location}</span>
                            <span>{item.page}</span>
                            <span>{item.time}</span>
                        </div>
                        <div>
                            {item.text}
                        </div>
                    </div>
                ))
            }
        </div>
    )

}
export default BookClippings;
