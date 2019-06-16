import React from 'react';
import * as R from 'ramda'
import styles from './index.module.scss'
import {getI18n} from '../../store'

type Props = {
    onChange: (result: string) => void
}

const TextInput: React.FunctionComponent<Props> = ({onChange}) => {

    function handleChange(event: React.SyntheticEvent) {
        const file: File = R.path(['currentTarget', 'files', 0], event) as File;
        const reader: FileReader = new FileReader();
        try {
            // handle cancel select file
            reader.readAsText(file);
        } catch (error) {
            console.error(error)
        }
        reader.onload = () => {
            const temp: string = reader.result as string
            if (temp && onChange) {
                onChange(temp)
            }
        }
    }


    return (
        <div className={styles.container}>
            <label htmlFor="file-upload"
                   className={styles.label}>{getI18n('components.TextInput.selectFileTip')}</label>
            <input type="file" accept=".txt" onChange={handleChange} id="file-upload" className={styles.input}/>
        </div>
    )
}
export default TextInput
