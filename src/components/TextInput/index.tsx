import React from 'react';
import _ from 'lodash'

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
        <div>
            <input type="file" accept=".txt" onChange={handleChange}/>
        </div>
    )
}
export default TextInput
