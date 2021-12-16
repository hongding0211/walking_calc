import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import Avatar from '../../components/avatar'
import '../../config'
import './index.css'
import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {quitLogin, selectUserData} from "../../features/users/usersSlice";
import MainCard from './mainCard';
import GroupCard from "./groupCard";
import {selectGroups, selectTotalDebt} from "../../features/group/groupSlice";
import {useCookies} from "react-cookie";

/*
 * @Project    : walking_calc
 * @Created    : hong 2021/11/16 21:34
 * @Component  : Main
 * @Props      : uid: String 
 * @Description: The main page of the App.
*/

const Main = () => {

    // TODO 同步刷新 or 间隔刷新

    const userData = useSelector(selectUserData)
    const groups = useSelector(selectGroups)
    const totalDebt = useSelector(selectTotalDebt)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [,,removeCookie] = useCookies()

    function onAddBtnClick() {
        navigate('/home/addGroup')
    }

    function groupCardClickedHandler(groupId) {
        navigate(`/home/${groupId}`)
    }

    function avatarClickerHandler(){
        dispatch(quitLogin())
        removeCookie('uid')
        navigate('/login')
    }

    return (
        <div className='main'>
            <div className='main-page-container'>

                <div className='main-title'>
                    <div className='main-title-l' onClick={onAddBtnClick}>
                        <span>群组</span>
                        <FontAwesomeIcon className='small-hover-btn-deep' icon={faPlusCircle}/>
                    </div>
                    <div className='main-avatar-container' onClick={avatarClickerHandler}>
                        <Avatar size='40px' img={userData.img}/>
                    </div>
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