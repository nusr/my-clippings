import React, {useEffect, useState} from 'react';
import {getI18n} from "../../store";
import styles from './index.module.scss'
import {backToTop} from '../../utils'

type Props = {
    visibilityHeight?: number;
};
let interval: any;
const BackToTop: React.FunctionComponent<Props> = ({
                                                       visibilityHeight = 400
                                                   }) => {
    const [visible, setVisible] = useState<boolean>(false)

    function handleBack() {
        interval = backToTop()
    }


    useEffect(() => {
        function handleScroll() {
            const temp: boolean = window.pageYOffset > visibilityHeight;
            setVisible(temp)
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [visibilityHeight])

    return (
        <div className={styles.container} onClick={handleBack} style={{display: visible ? 'block' : ""}}>
            <svg
                width="16"
                height="16"
                className={styles.icon}
                viewBox="0 0 17 17"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <title>{getI18n('components.BackToTop.tip')}</title>
                <g>
                    <path
                        d="M12.036 15.59c0 .55-.453.995-.997.995H5.032c-.55 0-.997-.445-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29c.39-.39 1.026-.385 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z"

                    />
                </g>
            </svg>
        </div>
    )
}
export default BackToTop
