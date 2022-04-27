import React, {Fragment, useState} from 'react';
import './index.css'

<<<<<<< HEAD
function ToggleSwitch(defaultStatus = false) {

    const [status, setStatus] = useState(defaultStatus)

    function toggle() {
        setStatus(!status)
=======
function ToggleSwitch({onClickHandler = (status) => {}}) {

    const [status, setStatus] = useState(undefined)

    function toggle() {
        const newStatus = (status === false || status === undefined ) ? true : false
        onClickHandler(newStatus)
        setStatus(newStatus)
>>>>>>> dev
    }

    return (
        <Fragment>
            <div className={`toggle-container ${status ? 'toggle-container-on' : ''}`} onClick={toggle}>
<<<<<<< HEAD
                <div className={`toggle-dot ${status ? 'toggle-dot-on' : ''}`} onClick={toggle}/>
=======
                <div className={`toggle-dot ${status === undefined ? '' : status ? 'toggle-dot-on' : 'toggle-dot-off'}`}/>
>>>>>>> dev
            </div>
        </Fragment>
    );
}

export default ToggleSwitch;