import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './index.css'
import {faCheck} from "@fortawesome/free-solid-svg-icons";

function Select({selected = false, tag = 'item', onItemSelected, index}) {

    return (
        <div className='select-container'>
            <div
                onClick={() => onItemSelected(index)}
                className={`select-box ${selected ? 'select-box-selected' : ''}`}
            >
                {selected && <FontAwesomeIcon icon={faCheck} transform='shrink-8'/>}
            </div>
            <div
                onClick={() => onItemSelected(index)}

                className='select-text'
            >{tag}</div>
        </div>
    );
}

export default Select;

