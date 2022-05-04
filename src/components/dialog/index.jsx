import React, {Fragment} from 'react';
import './index.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import CardButton from "../cardButton";

function Dialog({
                    text = '',
                    type = 'normal',
                    handleCancel = undefined,
                    handleConfirm = undefined
                }) {

    function cancel() {
        handleCancel && handleCancel()
    }

    function confirm() {
        handleConfirm && handleConfirm()
    }

    return (handleConfirm && handleCancel) ? (
        <Fragment>
            <div
                className='transparent-mask'
                onClick={cancel}
            />
            <div className={'dialog-container'}>
                <div className={'dialog-top'}>
                    <div className={'dialog-text'}>{text}</div>
                    <div className={'dialog-close-btn'} onClick={cancel}>
                        <FontAwesomeIcon icon={faTimes} transform="shrink-6"/>
                    </div>
                </div>
                <div className={'dialog-bottom'}>
                    <div onClick={cancel} style={{width: '48%'}}><CardButton text={'取消'} type={'plain'}/></div>
                    <div onClick={confirm} style={{width: '48%'}}><CardButton text={'确定'} type={type}/></div>
                </div>
            </div>
        </Fragment>
    ) : null
}

export default Dialog;