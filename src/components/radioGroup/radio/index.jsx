import React from 'react'
import './index.css'

function Radio({selected = false, tag = 'item', onItemSelected, index}) {

    return (
        <div className='radio-container'>
            <div
                onClick={() => onItemSelected(index)}
                className={`radio-box ${selected ? 'radio-box-selected' : ''}`}
            />
            <div
                onClick={() => onItemSelected(index)}
                className='radio-text'
            >{tag}</div>
        </div>
    );
}

export default Radio;

