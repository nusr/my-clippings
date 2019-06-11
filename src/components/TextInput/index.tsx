import React from 'react';
import _ from 'lodash'
import styles from './index.module.scss'

type Props = {
    onChange: (result: string) => void
}

const TextInput: React.FunctionComponent<Props> = ({onChange}) => {

    function handleChange(event: React.SyntheticEvent) {
        const file: File = _.get(event, 'currentTarget.files[0]')
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            const temp: string = reader.result as string
            onChange(temp)
        }
    }


    return (
        <div className={styles.container}>
            <label htmlFor="file-upload" className={styles.label}>Select your file</label>
            <input type="file" accept=".txt" onChange={handleChange} id="file-upload" className={styles.input}/>
        </div>
    )
}
export default TextInput
