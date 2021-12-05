import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import Avatar from '../../components/avatar'
import '../../config'
import './index.css'
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserData} from "../../features/users/usersSlice";
import MainCard from './mainCard';
import GroupCard from "./groupCard";
import {selectGroups, selectTotalDebt} from "../../features/group/groupSlice";

/*
 * @Project    : walking_calc
 * @Created    : hong 2021/11/16 21:34
 * @Component  : Main
 * @Props      : uid: String 
 * @Description: The main page of the App.
*/

const Main = () => {

    const userData = useSelector(selectUserData)
    const groups = useSelector(selectGroups)
    const totalDebt = useSelector(selectTotalDebt)

    const navigate = useNavigate()


    function onAddBtnClick() {
        navigate('/home/addGroup')
    }

    function groupCardClickedHandler(groupId) {
        navigate(`/home/${groupId}`)
    }


    return (
        <div className='main'>
            <div className='main-page-container'>

                <div className='main-title'>
                    <div className='main-title-l' onClick={onAddBtnClick}>
                        <span>群组</span>
                        <FontAwesomeIcon className='small-hover-btn-deep' icon={faPlusCircle}/>
                    </div>
                    <Avatar size='40px' img={userData.img}/>
                </div>
                <MainCard debt={totalDebt}/>
                {groups.length === 0 && <div className='main-info-msg'>加入或创建一个群组</div>}
                {groups.map(group => {
                    return (
                        <div key={group.groupID}
                             onClick={() => groupCardClickedHandler(group.groupID)}
                        >
                            <GroupCard
                                groupName={group.groupName}
                                memberCnt={group.members.length}
                                latestEdit={group.latestEdit}
                                debt={group.debt}
                            />
                        </div>
                    )
                })}
            </div>
            <Outlet/>
        </div>
    )
}

export default Main