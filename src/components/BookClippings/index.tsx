import React from 'react';
import {RecordItem} from '../../type'
import styles from './index.module.scss'

type Props = {
    data: RecordItem[] | undefined
};

const BookClippings: React.FunctionComponent<Props> = ({
                                                           data = []
                                                       }) => {

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
                            <span className={styles.location}>{item.location}</span>
                            <span>{item.page}</span>
                            <span className={styles.time}>{item.time}</span>
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
