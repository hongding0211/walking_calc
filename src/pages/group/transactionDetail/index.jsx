import React, {Fragment} from 'react';
import {useParams} from "react-router-dom";
import PopCard from "../../../components/popCard";
import {format} from 'date-fns'
import {useSelector} from "react-redux";
import {selectTransactionById} from "../../../features/group/groupSlice";
import './index.css'
import MemberCount from "../../../components/memberCount";
import {selectMembersByUids} from "../../../features/users/usersSlice";
import SingleTransactionDetail from "./singleTransactionDetaili";

function TransactionDetailCard() {

    const {groupId, transactionId} = useParams()

    const transaction = useSelector(selectTransactionById(groupId, transactionId))

    const members = useSelector(selectMembersByUids([transaction.who, ...transaction.forWhom]))

    return (
        <Fragment>
            {/*TODO 删除操作*/}
            <PopCard title='交易详情' btnType='delete'>
                <div className='transaction-top flex-horizon-split flex-align-center'>
                    <div className='flex-vertical-split'>
                        <span className='transaction-date-sub'>{format(new Date(transaction.time), 'yyyy年M月d日')}</span>
                        <span className='transaction-date'>{format(new Date(transaction.time), 'HH:mm')}</span>
                    </div>
                    <MemberCount count={transaction.forWhom.length}/>
                </div>
                <div className='transaction-record'>
                    <div className='transaction-sub-text'>谁付的钱</div>
                    <SingleTransactionDetail user={members.find(e => e.uid === transaction.who)}
                                             due={transaction.paid}/>
                </div>
                <div className='transaction-record transaction-for-whom'>
                    <div className='transaction-sub-text'>为谁</div>
                    {transaction.forWhom.map(uid => {
                        return <div key={uid} className='transaction-single-detail'>
                            <SingleTransactionDetail
                                user={members.find(e => e.uid === uid)}
                                due={transaction.paid / transaction.forWhom.length}
                            />
                        </div>
                    })}
                </div>
            </PopCard>
        </Fragment>
    );
}

export default TransactionDetailCard;