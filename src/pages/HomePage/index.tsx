import React, {useState} from 'react';
import styles from "./index.module.scss";
import TextInput from '../../components/TextInput'
import {parseContent} from '../../tool'

const HomePage: React.FunctionComponent = () => {
    const [content, setContent] = useState<string>('')

    function handleChange(result: string) {
        setContent(result)
        console.log(parseContent(result))
    }

    return (
        <div className={styles.container}>
            <TextInput onChange={handleChange}/>
            <div>
                {content}
            </div>
        </div>
    );
}

export default HomePage;
