import React, {Fragment, useEffect, useRef, useState} from 'react';
import PopCard from "../../../components/popCard";
import {useParams} from "react-router-dom";
import './index.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchGroups, selectGroupById} from "../../../features/group/groupSlice";
import {selectMembersByUids, selectUserData} from "../../../features/users/usersSlice";
import SingleTransactionDetail from "../transactionDetail/singleTransactionDetaili";
import DebtTransfer from "./debtTransfer";
import {newFulfilledPromise, newRejectedPromise} from "../../../module/module";
import {addRecord, clearGroup} from "../../../api/client";
import {exportComponentAsPNG} from "react-component-export-image";

function DebtDetailCard() {
    const {groupId} = useParams()

    const uid = useSelector(selectUserData).uid

    const group = useSelector(selectGroupById(groupId))

    const members = useSelector(selectMembersByUids(group.members))

    const [debts, setDebts] = useState([])
    const [calcedDebt, setCalcedDebt] = useState([])

    const dispatch = useDispatch()

    const exportRef = useRef()

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


        let debts = {
            from: newDebts.filter(debt => debt.debt < -1e-2).sort((x, y) => y.debt - x.debt),
            to: newDebts.filter(debt => debt.debt >= 0).sort((x, y) => y.debt - x.debt)
        }
        debts = JSON.parse(JSON.stringify(debts))
        let newCalcDebts = []
        for (let pay of debts.from) {
            let payAmount = Math.abs(pay.debt)
            for (let i = 0; payAmount > 0 && i < debts.to.length; i++) {
                const payDue = payAmount <= debts.to[i].debt ? payAmount : debts.to[i].debt
                if (payDue < 1e-2)
                    continue
                payAmount -= payDue
                debts.to[i].debt -= payDue
                newCalcDebts.push({from: pay, to: debts.to[i], due: payDue})
            }
        }
        setCalcedDebt(newCalcDebts)
    }

    async function clearDebt() {
        if (calcedDebt.length === 0)
            return newRejectedPromise('?????????????????????')
        if (group.creator !== uid)
            return newRejectedPromise('?????????????????????????????????')
        try {
            if (group?.isGameMode === 'true') {
                const res = await clearGroup(groupId)
                dispatch(fetchGroups(uid))
                if (res?.code === 200)
                    return newFulfilledPromise('???????????????')
                else
                    return newRejectedPromise('????????????')
            } else {
                let flag = true
                for (const debt of calcedDebt) {
                    const res = await addRecord(groupId, debt.from.uid, debt.due, [debt.to.uid], '????', '????????????')
                    if (res?.code === 200)
                        flag = flag && true
                }
                if (flag) {
                    dispatch(fetchGroups(uid))
                    return newFulfilledPromise('???????????????')
                } else
                    return newRejectedPromise('????????????')
            }
        } catch (e) {
            return newRejectedPromise('????????????')
        }
    }

    useEffect(calcDebt,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])

    const DebtDetailExport = React.forwardRef(((props, ref) => (
        <div className='debt-detail-export' ref={ref}>
            <div className='debt-detail-text-sub'>????????????({debts.length})</div>
            <div className='debt-detail-export-members'>
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
                <div
                    className='debt-detail-text-sub'>{calcedDebt.length > 0 ? `????????????(${calcedDebt.length})` : '?????????????????????'}</div>
                <div>
                    {
                        calcedDebt.map(debt => {
                            return (
                                <div key={debt.from.uid + debt.to.uid} className='transaction-single-detail'>
                                    <DebtTransfer from={debt.from} to={debt.to} due={debt.due}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )))

    return (
        <Fragment>
            <PopCard title='????????????' btnType='delete' btnText='????????????' onSubmit={clearDebt} confirmOnSubmit={true} confirmType={'delete'} confirmText={'?????? ????????????????????????'}>
                <div onClick={() => exportComponentAsPNG(exportRef, {fileName: `debt${Date.now()}`})}
                     className='debt-detail-text-sub'>????????????({debts.length})
                </div>
                <div className='debt-detail-members'>
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
                    <div
                        className='debt-detail-text-sub'>{calcedDebt.length > 0 ? `????????????(${calcedDebt.length})` : '?????????????????????'}</div>
                    <div className='debt-detail-transfer-container'>
                        {
                            calcedDebt.map(debt => {
                                return (
                                    <div key={debt.from.uid + debt.to.uid} className='transaction-single-detail'>
                                        <DebtTransfer from={debt.from} to={debt.to} due={debt.due}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </PopCard>
            <DebtDetailExport ref={exportRef}/>
        </Fragment>
    );
}

export default DebtDetailCard;