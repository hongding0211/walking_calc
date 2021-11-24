import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleNotch} from '@fortawesome/free-solid-svg-icons'
import './index.css'

/*
 * @Project    : walking_calc
 * @Created    : hong 2021/11/16 21:15
 * @Component  : CardButton
 * @Props      : text:          String
 *               type:          String { normal, warning }
 *               pending:       Boolean
 *               width:         Number
 *               height:        Number
 *               loadingIcon:   Boolean  
 *               
 * @Description: A button with 2 different styles used in a pop-out card.
*/

function CardButton({
                        text = '确认',
                        type = 'normal',
                        pending = false,
                        width = '100%',
                        height = '35px',
                        loadingIcon = false
                    }) {
    if (type === 'delete')
        text = '删除'
    return (
        <button
            className={`card-button ${type === 'delete' ? 'card-button-delete' : ''} ${pending ? 'card-button-pending' : ''} ${type === 'delete' && pending ? 'card-button-delete-pending' : ''}`}
            style={{text, type, width, height}}
        >
            {pending && loadingIcon && <FontAwesomeIcon className='loading-icon' icon={faCircleNotch} spin/>}
            {text}
        </button>
    )
}

export default CardButton;
