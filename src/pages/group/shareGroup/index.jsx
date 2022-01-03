import React from 'react';
import PopCard from "../../../components/popCard";
import {useParams} from "react-router-dom";
import './index.css'
import {useSelector} from "react-redux";
import {selectGroupById} from "../../../features/group/groupSlice";

const QRCode = require('qrcode.react');

function ShareGroup() {
    const {groupId} = useParams()

    const group = useSelector(selectGroupById(groupId))

    const shareLink = `${global.host}/#/join/${groupId}`

    return (
        <div>
            <PopCard title='分享群组' btnType='none'>
                <div className='share-group-card-container'>
                    <div className='share-group-qrcode'><QRCode value={shareLink}/></div>
                    <span className='share-group-code'>{groupId.toUpperCase()}</span>
                    <span className='share-group-name'>{group.groupName}</span>
                    <span className='share-group-text'>复制链接并发送至好友</span>
                    <span className='share-group-text share-group-text-sub'>{shareLink}</span>
                </div>
            </PopCard>
        </div>
    );
}

export default ShareGroup;