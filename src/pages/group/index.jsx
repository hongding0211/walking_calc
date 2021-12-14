import React, {useEffect} from 'react';
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './index.css'
import {faChevronLeft, faCog, faPlusCircle, faQrcode} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {selectGroupById} from "../../features/group/groupSlice";
import {formatDebt} from "../../module/module";
import AvatarStack from "../../components/avatarStack";
import RecordCard from "./recordCard";
import {fetchMemberData, selectMembersByUids} from "../../features/users/usersSlice";
import {toast} from "react-hot-toast";
import {format} from "date-fns";


// TODO 解决刷新问题
// 应该是刷新后 redux 没法重新读取新数据导致

function Group() {
    const {groupId} = useParams()

    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()

    const group = useSelector(selectGroupById(groupId))

    const membersDetail = useSelector(selectMembersByUids(group.members))

    function recordCards() {
        let components = []
        let lastestTimestamp = 0
        for(const record of group.records){
            if(Math.abs(record.time-lastestTimestamp)>24*3600*1000){
                lastestTimestamp = record.time
                components.push(<div key={record.time} className='group-main-card-time-stamp'>{format(new Date(record.time),'M月d日')}</div>)
            }
            components.push(
                <div key={record.recordID} onClick={() => showTransactionDetail(record.recordID)}>
                    <RecordCard record={record}/>
                </div>
            )
        }
        return components
    }

    function navBack() {
        navigate(-1)
    }

    function shareGroup() {
        navigate(`${location.pathname}/share`)
    }

    function showDebtDetail() {
        navigate(`${location.pathname}/debtDetail`)
    }

    function showAddRecordCard() {
        navigate(`${location.pathname}/addRecord`)
    }

    function showTransactionDetail(transactionId) {
        navigate(`${location.pathname}/${transactionId}`)
    }

    function showGroupConfig() {
        // TODO
        toast('IN DEVELOPING', {
            icon: '😋'
        })
    }


    useEffect(() => {
        // 缓存所有成员的相信数据
        group.members.every(member => dispatch(fetchMemberData(member)))
    }, [group.members, dispatch])

    return (
        <div>
            <div onClick={showAddRecordCard}>
                <FontAwesomeIcon className='group-add-btn' icon={faPlusCircle}/>
            </div>
            <div className='group-container'>
                <div className='group-container-title-bar'>
                    <div className='small-hover-btn-deep' onClick={navBack}>
                        <FontAwesomeIcon icon={faChevronLeft}/>
                        <span className='group-container-title-bar-text'>群组</span>
                    </div>
                    <div className='small-hover-btn-deep' onClick={showGroupConfig}>
                        <FontAwesomeIcon icon={faCog}/>
                    </div>
                </div>
                <div className='group-container-main-card'>
                    <div className='group-container-main-card-row'>
                        <span className='group-name'>{group.groupName}</span>
                        <FontAwesomeIcon icon={faQrcode} color='#336FE9' className='small-hover-btn'
                                         onClick={shareGroup}/>
                    </div>
                    <div>
                        <div className='group-main-card-sub-text' style={{'marginBottom': '5px'}}>成员</div>
                        <AvatarStack users={membersDetail} size='22px'/>
                    </div>
                    <div className='group-container-main-card-row'>
                    <span className='small-hover-btn group-debt-detail-btn'
                          style={{
                              'fontWeight': '600', 'fontSize': '14px', 'marginLeft': '-5px'
                          }}
                          onClick={showDebtDetail}
                    >
                        债务详细 >
                    </span>
                        <div className='group-main-card-debt'>
                            <span className='group-main-card-sub-text'>{group.debt >= 0 ? '别人欠我的' : '我欠别人的'}</span>
                            <span className='group-main-card-main-text'>{formatDebt(group.debt)}</span>
                        </div>
                    </div>
                </div>
                <div className='group-cards-container'>{recordCards()}</div>
            </div>
            <Outlet/>
        </div>
    );
}

export default Group;