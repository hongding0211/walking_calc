import React from 'react';
import './index.css'
import MemberCount from "../../../components/memberCount";
import {formatDebt} from "../../../module/module";
import {format} from 'date-fns'

/*
    * @Created    : hong 2021-12-3 15:37
    * @Component  : GroupCard
    * @Props      : groupName:  String
    *             : memberCnt:  Number
    *             : latestEdit: Number
    *             : debt:       Number
    * @Description: GroupCard
*/

function GroupCard(props) {
    let {groupName, memberCnt, latestEdit, debt} = props

    latestEdit = latestEdit===0?'暂无记录':format(new Date(latestEdit), 'MM月dd日')

    return (
        <div className='group-card-container'>
            <div className='group-card'>
                <div className='group-card-group-name'>{groupName}</div>
                <MemberCount count={memberCnt}/>
            </div>
            <div className='group-card'>
                <div className='group-card-last-edit'>
                    <span className='group-card-sub-text'>上次编辑</span>
                    <span className='group-card-main-text'>{latestEdit}</span>
                </div>
                <div className='group-card-debt'>
                    <span className='group-card-sub-text'>别人欠我的</span>
                    <span className='group-card-main-text'>{formatDebt(debt)}</span>
                </div>
            </div>
        </div>
    );
}

export default GroupCard;
