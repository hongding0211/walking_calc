import React, {Fragment, useEffect, useState} from 'react';
import PopCard from "../../../components/popCard";
import {useParams} from "react-router-dom";
import './index.css'
import {useSelector} from "react-redux";
import {selectGroupById} from "../../../features/group/groupSlice";
import {selectMembersByUids, selectUserData} from "../../../features/users/usersSlice";
import SingleTransactionDetail from "../transactionDetail/singleTransactionDetaili";
import DebtTransfer from "./debtTransfer";
import {newFulfilledPromise, newRejectedPromise} from "../../../module/module";
import {addRecord} from "../../../api/client";

function DebtDetailCard() {
    const {groupId} = useParams()

    const uid = useSelector(selectUserData).uid

    const group = useSelector(selectGroupById(groupId))

    const members = useSelector(selectMembersByUids(group.members))

    const [debts, setDebts] = useState([])
    const [calcedDebt, setCalcedDebt] = useState({from: [], to: []})

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

    function calcDebt() {
        let newDebts = []
        for (const uid of group.members) {
            newDebts.push({
                ...members.find(e => e.uid === uid),
                debt: calculateOnesDebt(uid)
            })
        }
        setDebts(newDebts)
        setCalcedDebt({
            from: newDebts.filter(debt => debt.debt < -1e-6),
            to: newDebts.filter(debt => debt.debt >= 0)[0]
        })
    }

    async function clearDebt() {
        if (calcedDebt.from.length === 0)
            return newRejectedPromise('所有债务已和解')
        if (group.creator !== uid)
            return newRejectedPromise('只有群主才可以清空债务')
        try {
            let flag = true
            for (const debt of calcedDebt.from) {
                const res = await addRecord(groupId, debt.uid, Math.abs(Number(debt.debt)), [calcedDebt.to.uid], '💶')
                if (res?.code === 200)
                    flag = flag && true
            }
            if (flag)
                return newFulfilledPromise('债务已和解')
            else
                return newRejectedPromise('操作失败')
        } catch (e) {
            return newRejectedPromise('操作失败')
        }
    }

    useEffect(calcDebt,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])

    return (
        <Fragment>
            <PopCard title='债务详细' btnType='delete' btnText='清空债务' onSubmit={clearDebt}>
                <div className='debt-detail-members'>
                    <div className='debt-detail-text-sub'>债务列表</div>
                    {
                        debts.map(debt => {
                            return (
                                <div key={debt.uid} className='transaction-single-detail'>
                                    <SingleTransactionDetail
                                        user={members.find(e => e.uid === debt.uid)}
                                        due={debt.debt}
                                        colored={true}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div className='debt-detail-simplify flex-vertical-split'>
                    <div className='debt-detail-text-sub'>{calcedDebt.from.length > 0 ? '债务和解' : '所有债务已和解'}</div>
                    {
                        calcedDebt.from.map(debt => {
                            return (
                                <div key={debt.uid} className='transaction-single-detail'>
                                    <DebtTransfer from={debt} to={calcedDebt.to} due={debt.debt}/>
                                </div>
                            )
                        })
                    }
                </div>
            </PopCard>
        </Fragment>
    );
}

export default DebtDetailCard;