import React, {Fragment} from 'react';
import Avatar from "../../../../components/avatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import './index.css'
import {formatPrice} from "../../../../module/module";

function DebtTransfer(props) {
    const {from, to, due} = props
    return (
        <Fragment>
            <div className='flex-horizon-split flex-align-center debt-transfer-container'>
                {/* TODO 传入参数 */}
                <div className='avatar-name'>
                    <Avatar img={from.img} size='24px'/>
                    <div className='avatar-name-text'>{from.name}</div>
                </div>
                <FontAwesomeIcon className='right-arrow' icon={faArrowRight} transform='shrink-4'/>
                <div className='avatar-name'>
                    <Avatar img={to.img} size='24px'/>
                    <div className='avatar-name-text'>{to.name}</div>
                </div>
            </div>
            <div className='debt-transfer-due'>{formatPrice(due)}</div>
        </Fragment>
    );
}

export default DebtTransfer;