import React, {Fragment} from 'react';
import PopCard from "../../../components/popCard";
import {useParams} from "react-router-dom";
import './index.css'
import {useSelector} from "react-redux";
import {selectGroupById} from "../../../features/group/groupSlice";
import {selectMembersByUids} from "../../../features/users/usersSlice";
import SingleTransactionDetail from "../transactionDetail/singleTransactionDetaili";

function DebtDetailCard() {
    const {groupId} = useParams()
    const group = useSelector(selectGroupById(groupId))
    const members = useSelector(selectMembersByUids(group.members))

    function calculateOnesDebt(uid) {
        let debt = 0
        for (const record of group.records) {
            // users paid the bill
            const dividedBill = record.paid / record.forWhom.length
            const totalBill = Number(record.paid)
            if (uid === record.who) {
                debt += totalBill
            }
            // someone paid for users
            if (record.forWhom.find(e => e === uid)) {
                debt -= dividedBill
            }
        }
        return debt
    }

    // TODO core algorithm
    function simplifyDebt() {

    }

    return (
        <Fragment>
            <PopCard title='债务详细' btnType='none'>
                <div className='debt-detail-members'>
                    <div className='debt-detail-text-sub'>债务列表</div>
                    {group.members.map(uid => {
                        return (
                            <div key={uid} className='transaction-single-detail'>
                                <SingleTransactionDetail
                                    user={members.find(e => e.uid === uid)}
                                    due={calculateOnesDebt(uid)}
                                    colored={true}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className='debt-detail-simplify flex-vertical-split'>
                    <div className='debt-detail-text-sub'>债务和解</div>
                    {/* TODO transfer*/}
                </div>
            </PopCard>
        </Fragment>
    );
}

export default DebtDetailCard;