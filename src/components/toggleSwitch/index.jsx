import React, {Fragment, useState} from 'react';
import './index.css'

function ToggleSwitch({onClickHandler = (status) => {}}) {

    const [status, setStatus] = useState(undefined)

    function toggle() {
        const newStatus = (status === false || status === undefined ) ? true : false
        onClickHandler(newStatus)
        setStatus(newStatus)
    }

    return (
        <Fragment>
            <div className={`toggle-container ${status ? 'toggle-container-on' : ''}`} onClick={toggle}>
                <div className={`toggle-dot ${status === undefined ? '' : status ? 'toggle-dot-on' : 'toggle-dot-off'}`}/>
            </div>
        </Fragment>
    );
}

export default ToggleSwitch;