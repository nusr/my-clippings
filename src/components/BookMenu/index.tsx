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
        onChange(item)
    }


    return (
        <ul className={styles.container}>
            {
                menuList.map((item: string) => (
                    <li key={item} onClick={() => handleClick(item)} className={styles.item} style={{
                        color: value !== item ? '' : '#0fd2fd'
                    }}>
                        <div className={styles.title}>{item}</div>
                    </li>
                ))
            }
        </ul>
    )
}
export default BookMenu
