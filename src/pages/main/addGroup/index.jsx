import React from 'react';
import PopCard from "../../../components/popCard";
import './index.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faUserFriends} from '@fortawesome/free-solid-svg-icons'
import {Outlet, useNavigate} from "react-router-dom";

function AddGroupCard() {
    const navigate = useNavigate()

    return (
        <div>
            <PopCard btnType='none'>
                <div className='add-group-card-content'>
                    <div className='icon-text-container'
                         onClick={() => navigate('/home/addGroup/createGroup', {replace: true})}>
                        <FontAwesomeIcon icon={faPlus} size='3x'/>
                        <span>新建一个群组</span>
                    </div>
                    <div className='vertical-splitter'/>
                    <div className='icon-text-container'
                         onClick={() => navigate('/home/addGroup/joinGroup', {replace: true})}>
                        <FontAwesomeIcon icon={faUserFriends} size='3x'/>
                        <span>加入一个群组</span>
                    </div>
                </div>
            </PopCard>
            <Outlet/>
        </div>
    );
}

export default AddGroupCard;