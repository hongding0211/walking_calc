import React from 'react';
import './index.css'
import {formatDebt, formatPrice} from "../../../../module/module";
import Avatar from "../../../../components/avatar";

function SingleTransactionDetail({user, due, colored = false}) {

    return (
        <div className='flex-vertical-split'>
            <div className='single-transaction-content flex-horizon-split flex-align-center'>
                <div className='flex-horizon-split flex-align-center'>
                    <Avatar img={user.img} size='24px'/>
                    <span className='single-transaction-name'>{user.name}</span>
                </div>
                {!colored && <span className='single-transaction-detail-text'>{formatPrice(due)}</span>}
                {colored && <span
                    className={`single-transaction-detail-text ${Number(due) > -1e-2 ? 'single-transaction-price-p' : 'single-transaction-price-n'}`}>{formatDebt(due)}</span>}
            </div>
            <div className='horizon-split'/>
        </div>
    )
}


export default SingleTransactionDetail;