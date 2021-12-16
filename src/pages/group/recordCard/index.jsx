import React from 'react';
import './index.css'
import MemberCountSmall from "../../../components/memberCountSmall";
import {format} from 'date-fns'
import {formatPrice} from "../../../module/module";
import {useSelector} from "react-redux";
import {selectMembersByUids} from "../../../features/users/usersSlice";
import Tag from "../../../components/tag";

function RecordCard(props) {

    const {record} = props

    const membersDetail = useSelector(selectMembersByUids(record.forWhom))

    return (
        <div className='record-card-container'>
            <div className='record-card-left'>
                <div className='flex-align-center flex-vertical-split'>
                    <span className='record-card-type-icon'>{record.type}</span>
                    <MemberCountSmall count={record.forWhom.length}/>
                </div>
                <div className='record-card-split'/>
                <div className='flex-vertical-split'>
                    <div className='record-card-tags'>
                        {membersDetail.map(m => <Tag key={m.uid}>{m.name}</Tag>)}
                    </div>
                    <span className='record-card-date'>{format(new Date(record.time), 'MM月dd日 HH:mm')}</span>
                </div>
            </div>
            <div className='flex-vertical-split record-card-right '>
                <span className='record-card-price'>{formatPrice(record.paid)}</span>
                <span className='record-card-price-sub'>我的那份: {formatPrice(record.myPart)}</span>
            </div>
        </div>
    );
}

export default RecordCard;