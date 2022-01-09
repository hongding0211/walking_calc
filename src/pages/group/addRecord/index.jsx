import React, {Fragment, useEffect, useRef, useState} from 'react';
import PopCard from "../../../components/popCard";
import './index.css'
import RadioGroup from "../../../components/radioGroup";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchGroups, selectGroupById} from "../../../features/group/groupSlice";
import {selectMembersByUids, selectUserData} from "../../../features/users/usersSlice";
import SelectGroup from "../../../components/selectGroup";
import CategoryIcon from "./categoryIcon";
import {newFulfilledPromise, newRejectedPromise} from "../../../module/module";
import {addRecord} from "../../../api/client";
import Input from "../../../components/input";

function AddRecordCard() {
    const inputPriceRef = useRef()
    const typeTextRef = useRef()
    const {groupId} = useParams()
    const group = useSelector(selectGroupById(groupId))
    const members = useSelector(selectMembersByUids(group.members))
    const uid = useSelector(selectUserData).uid

    const [whoPaidIdx, setWhoPaidIdx] = useState(-1)
    const [paidForIdx, setPaidForIdx] = useState([])
    const [location, setLocation] = useState(null)

    const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => inputPriceRef.current.focus(), [])

    useEffect(() => navigator.geolocation.getCurrentPosition(p => setLocation(p)), [])

    useEffect(() => setWhoPaidIdx(members.findIndex(e => e.uid === uid)),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])

    function whoPaidSelectedHandler(index) {
        setWhoPaidIdx(index)
    }

    function paidForSelectedHandler(indexList) {
        setPaidForIdx([...indexList])
    }

    function categorySelectedHandler(index) {
        setSelectedCategoryIdx(index)
    }

    async function submit() {
        // check param
        if (isNaN(inputPriceRef.current.value))
            return newRejectedPromise('输入的金额不正确')
        if (inputPriceRef.current.value === '')
            return newRejectedPromise('输入金额')
        if (whoPaidIdx < 0)
            return newRejectedPromise('选择支付方')
        if (paidForIdx.length < 1)
            return newRejectedPromise('至少选择一名被支付方')
        try {
            let forWhomList = []
            for (let i = 0; i < members.length; i++) {
                if (paidForIdx.includes(i))
                    forWhomList.push(members[i].uid)
            }
            const lat = location?.coords?.latitude
            const long = location?.coords?.longitude
            const res = await addRecord(
                groupId,
                members[whoPaidIdx].uid,
                Number(inputPriceRef.current.value),
                forWhomList,
                global.categories[selectedCategoryIdx][0],
                typeTextRef.current.value,
                {lat, long}
            )
            if (res?.code === 200) {
                dispatch(fetchGroups(uid))
                return newFulfilledPromise('添加成功')
            } else if (res?.code === 4008) {
                return newRejectedPromise('支付方和被支付方不能为同一个人')
            }
        } catch (e) {
            return newRejectedPromise('操作失败，请稍后尝试')
        }
    }

    return (
        <Fragment>
            <PopCard title='添加记录' onSubmit={submit}>
                <div className='add-record-card-container'>
                    <div className='add-record-card-price flex-horizon-split'>
                        <div>￥</div>
                        <input
                            ref={inputPriceRef}
                            inputMode="decimal"
                            className='add-record-card-price-input'
                            placeholder='0.00'
                        />
                    </div>
                    <span className='add-record-card-sub-text'>谁支付的</span>
                    <div className='add-record-card-member-group'>
                        <RadioGroup
                            items={members.map(member => member.name)}
                            defaultIdx={members.findIndex(e => e.uid === uid)}
                            onItemSelected={whoPaidSelectedHandler}
                        />
                    </div>
                    <span className='add-record-card-sub-text'>为谁支付</span>
                    <div className='add-record-card-member-group'>
                        <SelectGroup
                            items={members.map(member => member.name)}
                            onItemsSelected={paidForSelectedHandler}
                        />
                    </div>
                    <span className='add-record-card-sub-text'>类别</span>
                    <div className='add-record-card-icons-container'>
                        {global.categories.map((e, i) => {
                            return (
                                <div
                                    key={e[1]}
                                    className={`add-record-card-icons ${i === selectedCategoryIdx ? ' add-record-card-icons-selected' : ''}`}
                                    onClick={() => categorySelectedHandler(i)}
                                >
                                    <CategoryIcon icon={e[0]} text={e[1]}/>
                                </div>
                            )
                        })}
                    </div>
                    <Input title='' placeHolder='备注信息' inputRef={typeTextRef}/>
                </div>
            </PopCard>
        </Fragment>
    );
}

export default AddRecordCard