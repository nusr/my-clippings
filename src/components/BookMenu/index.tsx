import React from 'react';
import styles from './index.module.scss'

type Props = {
    menuList: string[],
    onChange: (item: string) => void,
    value: string;
};


const BookMenu: React.FunctionComponent<Props> = ({
                                                      menuList = [],
                                                      onChange,
                                                      value
                                                  }) => {


    function handleClick(item: string) {
        if (onChange) {
            onChange(item)
        }
    }


    return (
        <ul className={styles.container}>
            {
                menuList.map((item: string): React.ReactNode => (
                    <li key={item} onClick={() => handleClick(item)}
                        className={`${styles.item} ${value === item ? styles.active : ''}`}>
                        <div className={styles.title}>{item}</div>
                    </li>
                ))
            }
        </ul>
    )
}
export default BookMenu
