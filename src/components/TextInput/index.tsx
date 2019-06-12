import React from 'react';
import _ from 'lodash'
import styles from './index.module.scss'
import Store from '../../store'

type Props = {
    onChange: (result: string) => void
}

const TextInput: React.FunctionComponent<Props> = ({onChange}) => {
    const {languageData} = Store.useContainer()

    function handleChange(event: React.SyntheticEvent) {
        const file: File = _.get(event, 'currentTarget.files[0]')
        const reader: FileReader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            const temp: string = reader.result as string
            if (!_.isEmpty(temp)) {
                onChange(temp)
            }
        }
    }


    return (
        <div className={styles.container}>
            <label htmlFor="file-upload"
                   className={styles.label}>{_.get(languageData, 'components.TextInput.selectFileTip')}</label>
            <input type="file" accept=".txt" onChange={handleChange} id="file-upload" className={styles.input}/>
        </div>
    )
}
export default TextInput
