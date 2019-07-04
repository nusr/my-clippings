import * as React from 'react';
import {getI18n} from "../../store";

type Props = {};

const BackToTop: React.FunctionComponent<Props> = () => {
    return (
        <div>
            <svg
                width="16"
                height="16"
                viewBox="0 0 17 17"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <title>{getI18n('components.BackToTop.tip')}</title>
                <g>
                    <path
                        d="M12.036 15.59c0 .55-.453.995-.997.995H5.032c-.55 0-.997-.445-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29c.39-.39 1.026-.385 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z"
                        fill-rule="evenodd"
                    />
                </g>
            </svg>
        </div>
    )
}
export default BackToTop
