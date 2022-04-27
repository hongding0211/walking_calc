import React, {useEffect} from 'react';
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './index.css'
import {faChevronLeft, faCog, faPlusCircle, faQrcode} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {fetchGroups, selectGroupById} from "../../features/group/groupSlice";
import {formatDebt} from "../../module/module";
import AvatarStack from "../../components/avatarStack";
import RecordCard from "./recordCard";
import {fetchMemberData, selectMembersByUids, selectUserData} from "../../features/users/usersSlice";
import {format} from "date-fns";

function Group() {
    const {groupId} = useParams()

    const navigate = useNavigate()
    const location = useLocation()

    const dispatch = useDispatch()


    let group = useSelector(selectGroupById(groupId))

    let membersDetail = useSelector(selectMembersByUids(group.members))

    let uid = useSelector(selectUserData).uid

    function recordCards() {
        let components = []
        let latestTimeStamp = 0
        for (const record of group.records) {
            if (latestTimeStamp === 0 || new Date(record.time).getDate() !== new Date(latestTimeStamp).getDate()) {
                latestTimeStamp = record.time
                components.push(
                    <div key={record.time} className='group-main-card-time-stamp'>
                        {format(new Date(record.time), 'M月d日')}
                    </div>)
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
        navigate(`${location.pathname}/groupConfig`)
    }

    useEffect(() => {
            // cache member detail info
            group.members.every(member => dispatch(fetchMemberData(member)))
            const timer = setInterval(() => {
                dispatch(fetchGroups(uid))
                group.members.every(member => dispatch(fetchMemberData(member)))
            }, global.backgroundRefreshRate * 1000)
            return () => clearInterval(timer)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])

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
                    <div className='flex-horizon-split flex-align-center' style={{width: '100%'}}>
                        <div>
                            <div className='group-main-card-sub-text' style={{'marginBottom': '5px'}}>成员</div>
                            <AvatarStack users={membersDetail} size='22px'/>
                        </div>
                        <div style={{display: `${group?.isGameMode === 'true' ? 'block' : 'none'}`}}>
                            <svg width={49} height={40} >
                                <path
                                    d="M.57 15.227C-.603 13.14.094 10.485 2.129 9.28L16.86.583c2.032-1.2 4.637-.488 5.814 1.593l12.758 22.598c1.169 2.086.474 4.742-1.559 5.945l-14.737 8.696c-2.032 1.203-4.63.492-5.806-1.586L.571 15.227zm13.603-1.168c-.796-.244-1.678.292-1.91 1.192l-2.136 8.354a4.01 4.01 0 0 0 2.67 4.833c2.01.568 4.007-.681 4.61-2.79l.186-.721c.008-.025.015-.057.023-.09l1.377 2.49-.936.568c-.518.308-.689.997-.395 1.54.302.544.96.723 1.47.414l3.73-2.254a1.16 1.16 0 0 0 .394-1.55 1.054 1.054 0 0 0-1.47-.413l-.929.568-1.377-2.49.093.024.681.187c2.011.568 4.077-.681 4.619-2.79.533-2.109-.658-4.274-2.67-4.842l-8.03-2.23zm23.075 9.967L26.422 6.087c.142-.013.277-.087.42-.087h17.726C47.014 6 49 7.967 49 10.241V35.76C49 38.099 47.014 40 44.568 40H26.841c-1.076 0-2.073-.371-2.841-1.053L34.708 33.1c3.315-1.833 4.455-5.893 2.54-9.074zm2.76-3.219l4.134-4.018a2.766 2.766 0 0 0-.19-4.17c-1.202-.948-2.964-.763-4.03.257l-.412.426-.43-.426c-1.074-1.02-2.853-1.205-4.013-.257-1.349 1.085-1.417 3.005-.214 4.17l4.167 4.018c.258.257.705.257.988 0z"
                                    fill="#F0F0F0"
                                    fillRule="nonzero"
                                />
                            </svg>
                        </div>
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
                            <span className='group-main-card-sub-text'>{group.debt > -1e-2 ? '别人欠我的' : '我欠别人的'}</span>
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