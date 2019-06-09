import React from 'react';
import {RecordItem} from '../../type'

import _ from 'lodash'

type Props = {
    data: RecordItem[] | undefined
};
const BookClippings: React.FunctionComponent<Props> = ({
                                                           data = []
                                                       }) => {
    if (_.isEmpty(data)) {
        return null;
    }
    return (
        <div>
            {
                data.map((item: RecordItem) => (
                    <div key={item.time || item.backId}>
                        <div>
                            <span>{item.title}</span>
                            <span>{item.author}</span>
                        </div>
                        <div>
                            <span>{item.type}</span>
                            <span>{item.location}</span>
                            <span>{item.page}</span>
                            <span>{item.time}</span>
                        </div>
                        <div>
                            {item.text}
                        </div>
                    </div>
                ))
            }
        </div>
    )

}
export default BookClippings;
