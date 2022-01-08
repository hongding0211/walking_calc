import React, {Fragment} from 'react';
import {useParams} from "react-router-dom";
import PopCard from "../../../components/popCard";
import {format} from 'date-fns'
import {useDispatch, useSelector} from "react-redux";
import {fetchGroups, selectTransactionById} from "../../../features/group/groupSlice";
import './index.css'
import MemberCount from "../../../components/memberCount";
import {selectMembersByUids, selectUserData} from "../../../features/users/usersSlice";
import SingleTransactionDetail from "./singleTransactionDetaili";
import {deleteRecord} from "../../../api/client";
import {newFulfilledPromise, newRejectedPromise} from "../../../module/module";
import CategoryIcon from "../addRecord/categoryIcon";
import {Map, Marker} from "react-bmapgl";

function TransactionDetailCard() {

    const {groupId, transactionId} = useParams()

    const transaction = useSelector(selectTransactionById(groupId, transactionId))

    const members = useSelector(selectMembersByUids([transaction.who, ...transaction.forWhom]))

    const uid = useSelector(selectUserData).uid

    const dispatch = useDispatch()

    async function submit() {
        try {
            const res = await deleteRecord(groupId, transactionId)
            if (res.code === 200) {
                dispatch(fetchGroups(uid))
                return newFulfilledPromise('删除成功')
            } else {
                return newRejectedPromise('操作失败，请稍后操作')
            }
        } catch (e) {
            return newRejectedPromise('操作失败，请稍后操作')
        }
    }

    return (
        <Fragment>
            <PopCard title='交易详情' btnType='delete' onSubmit={submit}>
                <div className='transaction-top flex-horizon-split flex-align-center'>
                    <div className='flex-horizon-split transaction-top-l'>
                        <div className='transaction-type margin-right-10'>
                            <CategoryIcon icon={transaction.type}
                                          text={global.categories.find(e => e[0] === transaction.type)[1]}/>
                        </div>
                        <div className='vertical-splitter margin-right-10' style={{'height': '40px'}}/>
                        <div className='flex-vertical-split'>
                            <span
                                className='transaction-date-sub'>{format(new Date(transaction.time), 'yyyy年M月d日')}</span>
                            <span className='transaction-date'>{format(new Date(transaction.time), 'HH:mm')}</span>
                        </div>
                    </div>
                    <MemberCount count={transaction.forWhom.length}/>
                </div>
                <div className='transaction-sub-text'>谁付的钱</div>
                <div className='transaction-record'>
                    <SingleTransactionDetail user={members.find(e => e.uid === transaction.who)}
                                             due={transaction.paid}/>
                </div>
                <div className='transaction-sub-text'>为谁({transaction.forWhom.length})</div>
                <div className='transaction-record transaction-for-whom'>
                    {transaction.forWhom.map(uid => {
                        return <div key={uid} className='transaction-single-detail'>
                            <SingleTransactionDetail
                                user={members.find(e => e.uid === uid)}
                                due={transaction.paid / transaction.forWhom.length}
                            />
                        </div>
                    })}
                </div>
                {
                    transaction.location && transaction.location.long && transaction.location.lat &&
                    <Map
                        style={{
                            height: '100px',
                            marginTop: '-5px',
                            marginBottom: '10px'
                        }}
                        className='transaction-map'
                        enableDragging={false}
                        center={{lng: transaction.location.long, lat: transaction.location.lat}}
                        zoom="15"
                    >
                        <Marker position={{lng: transaction.location.long, lat: transaction.location.lat}}
                                icon='simple_blue'/>
                    </Map>
                }
                {
                    transaction.typeText &&
                    <div className='transaction-sub-text2'>备注：{transaction.typeText}</div>
                }
                <div className='transaction-id flex-vertical-split'>
                    <span><strong>Record ID:</strong></span>
                    <span><i>{transaction.recordID}</i></span>
                </div>
            </PopCard>
        </Fragment>
    );
}

export default TransactionDetailCard;