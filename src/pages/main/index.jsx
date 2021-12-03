import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import Avatar from '../../components/avatar'
import '../../config'
import './index.css'
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUserData} from "../../features/authentication/authenticationSlice";

/*
 * @Project    : walking_calc
 * @Created    : hong 2021/11/16 21:34
 * @Component  : Main
 * @Props      : uid: String 
 * @Description: The main page of the App.
*/

const Main = () => {

    const userData = useSelector(selectUserData)

    const navigate = useNavigate()

    function onAddBtnClick() {
        navigate('/home/addGroup')
    }

    return (
        <div className='main'>
            <div className='main-page-container'>

                <div className='main-title'>
                    <div className='main-title-l' onClick={onAddBtnClick}>
                        <span>群组</span>
                        <FontAwesomeIcon icon={faPlusCircle}/>
                    </div>
                    <Avatar size='40px' img={userData.img}/>
                </div>

                <div className='main-card'>
                    <div className='main-card-top'>
                        债务统计
                    </div>
                    <div className='main-card-bottom'>
                        xxxx
                    </div>
                </div>

            </div>
            <Outlet />
        </div>
    )
}

export default Main