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

    const shareLink = `http://foo.com?share=${group.groupCode}`

    return (
        <div>
            <PopCard title='分享群组' btnType='none'>
                <div className='share-group-card-container'>
                    {/* TODO 缺一个 API 来对接扫码入群 */}
                    <div className='share-group-qrcode'><QRCode value={shareLink} /></div>
                    <span className='share-group-code'>{group.groupCode.toUpperCase()}</span>
                    <span className='share-group-text'>复制链接并发送至好友</span>
                    <a href={shareLink} className='share-group-text share-group-text-sub'>{shareLink}</a>
                </div>
            </PopCard>
        </div>
    );
}

export default ShareGroup;