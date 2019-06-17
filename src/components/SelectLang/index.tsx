import * as React from 'react';
import styles from './index.module.scss';
import Menu from '../BookMenu'
import Store from '../../store'
import {LanguageMap} from '../../i18n'

type Props = {
    className: string;
};

const SelectLang: React.FunctionComponent<Props> = ({className}) => {
    const {language, changeLanguage} = Store.useContainer()
    const [visible, setVisible] = React.useState<boolean>(false)
    const menuList = Object.values(LanguageMap)

    function handleMouseEnter() {
        setVisible(true)
    }

    function handleMouseLeave() {
        setVisible(false)
    }

    function handleChange(value: string) {
        changeLanguage(value as LanguageMap)
        window.location.reload()
    }

    return (
        <div className={className} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img src="global.svg" alt="language" className={styles.container}/>
            <div className={styles.menu} style={{display: visible ? 'block' : ''}}>
                <Menu menuList={menuList} onChange={handleChange} value={language}/>
            </div>
        </div>)
}
export default SelectLang;
