import React, {Fragment, useEffect, useState} from 'react';
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
import {CustomOverlay, Map} from "react-bmapgl";
import Avatar from "../../../components/avatar";


function TransactionDetailCard() {

    const {groupId, transactionId} = useParams()

    const transaction = useSelector(selectTransactionById(groupId, transactionId))

    const members = useSelector(selectMembersByUids([transaction.who, ...transaction.forWhom]))

    const uid = useSelector(selectUserData).uid

    const dispatch = useDispatch()

    const [realPos, setRealPos] = useState(null)
    const [realPosText, setRealPosText] = useState(null)

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

    function getRealPos() {
        if (!transaction?.location?.lat || !transaction?.location?.long)
            return
        const convertor = new window.BMapGL.Convertor()
        const pointArr = [new window.BMapGL.Point(transaction.location.long, transaction.location.lat)]
        convertor.translate(pointArr, 1, 5, (data) => {
            setRealPos(data.points[0])
            const geo = new window.BMapGL.Geocoder()
            geo.getLocation(data.points[0], function (result) {
                if (result) {
                    setRealPosText(`${result.addressComponents.city} ${result.addressComponents.district} ${result.addressComponents.street}`)
                }
            });
        })
    }

    useEffect(getRealPos, [transaction.location])


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
                    realPos &&
                    <Map
                        style={{
                            height: '100px',
                            marginTop: '-5px',
                            marginBottom: '10px'
                        }}
                        className='transaction-map'
                        enableDragging={false}
                        center={realPos}
                        zoom="15"
                    >
                        <CustomOverlay position={realPos} offset={{width: 0, height: 15}}>
                            <div className='transaction-map-marker'>
                                <Avatar img={members.find(e => e.uid === transaction.who).img} size={'30px'}/>
                            </div>
                        </CustomOverlay>
                    </Map>
                }
                {
                    transaction.typeText &&
                    <div className='transaction-sub-text2'>备注：{transaction.typeText}</div>
                }
                {
                    realPos &&
                    <div className='transaction-id flex-vertical-split'>
                        <span><strong>定位：{realPosText}</strong></span>
                    </div>
                }
                <div className='transaction-id flex-vertical-split'>
                    <span><strong>Record ID：</strong><i>{transaction.recordID}</i></span>
                </div>
            </PopCard>
        </Fragment>
    );
}

export default TransactionDetailCard;