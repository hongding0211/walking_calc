import React, {useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './index.css'
import {faChevronLeft, faCog, faPlusCircle, faQrcode} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {selectGroupById} from "../../features/group/groupSlice";
import {formatDebt} from "../../module/module";
import {getOneUserById} from "../../api/client";
import AvatarStack from "../../components/avatarStack";

// TODO 解决刷新问题
// 应该是刷新后 redux 没法重新读取新数据导致

function Group() {
    const {groupId} = useParams()

    const navigate = useNavigate()
    const location = useLocation()

    const group = useSelector(selectGroupById(groupId))

    const [members, setMembers] = useState([])

    function navBack() {
        navigate(-1)
    }

    function shareGroup() {
        navigate(`${location.pathname}/share/${groupId}`)
    }

    useEffect(() => {
        let newMembers = []
        const fetchAllMembersDetail = async () => {
            for (const uid of group.members) {
                let u = await getOneUserById(uid)
                u.img = 'data:image/png;base64,' + u.img
                newMembers.push(u)
            }
        }

        fetchAllMembersDetail().then(_ => setMembers(newMembers))
    }, [group.members])

    return (
        <div>
            <div className='group-container'>
                <div className='group-container-title-bar'>
                    <div className='small-hover-btn-deep' onClick={navBack}>
                        <FontAwesomeIcon icon={faChevronLeft}/>
                        <span className='group-container-title-bar-text'>群组</span>
                    </div>
                    <div className='small-hover-btn-deep'>
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
                        <AvatarStack users={members} size='22px'/>
                    </div>
                    <div className='group-container-main-card-row'>
                    <span className='small-hover-btn'
                          style={{
                              'fontWeight': '600', 'fontSize': '14px', 'marginLeft': '-5px'
                          }}
                    >
                        债务详细 >
                    </span>
                        <div className='group-main-card-debt'>
                            <span className='group-main-card-sub-text'>{group.debt >= 0 ? '别人欠我的' : '我欠别人的'}</span>
                            <span className='group-main-card-main-text'>{formatDebt(group.debt)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <FontAwesomeIcon className='group-add-btn' icon={faPlusCircle}/>

            <Outlet/>
        </div>
    );
}

export default Group;