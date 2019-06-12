import React from 'react';
import styles from './index.module.scss'

type Props = {
    menuList: string[],
    onChange: (item: string) => void,
    value: string;
};

function easeInOutQuad(t: number, b: number, c: number, d: number): number {
    if ((t /= d / 2) < 1) {
        return (c / 2) * t * t + b;
    }
    return (-c / 2) * (--t * (t - 2) - 1) + b;
}


const BookMenu: React.FunctionComponent<Props> = ({
                                                      menuList = [],
                                                      onChange,
                                                      value
                                                  }) => {


    function handleClick(item: string) {
        backToTop()
        onChange(item)
    }


    function backToTop(backPosition: number = 0): void {
        const start: number = window.pageYOffset;
        let i: number = 0;
        let interval: any = setInterval(() => {
            const next = Math.floor(easeInOutQuad(10 * i, start, -start, 500));
            if (next <= backPosition) {
                window.scrollTo(0, backPosition);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                clearInterval(interval);
            } else {
                window.scrollTo(0, next);
            }
            i++;
        }, 16.7);
    }


    return (
        <ul className={styles.container}>
            {
                menuList.map((item: string) => (
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
