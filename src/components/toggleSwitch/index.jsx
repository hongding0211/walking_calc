import React, {Fragment, useState} from 'react';
import './index.css'

function ToggleSwitch({defaultStatus = false, onClickHandler = (status) => {}}) {

    const [status, setStatus] = useState(defaultStatus)

    function toggle() {
        setStatus(!status)
        onClickHandler(status)
    }

    return (
        <Fragment>
            <div className={`toggle-container ${status ? 'toggle-container-on' : ''}`} onClick={toggle}>
                <div className={`toggle-dot ${status ? 'toggle-dot-on' : 'toggle-dot-off'}`} onClick={toggle}/>
            </div>
        </Fragment>
    );
}

export default ToggleSwitch;