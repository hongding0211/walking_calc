import React, {Fragment} from 'react';
import PopCard from "../../../components/popCard";
import './index.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchGroups, selectGroupById} from "../../../features/group/groupSlice";
import {useNavigate, useParams} from "react-router-dom";
import {selectMembersByUids, selectUserData} from "../../../features/users/usersSlice";
import Avatar from "../../../components/avatar";
import {newFulfilledPromise, newRejectedPromise} from "../../../module/module";
import {dismissGroup} from "../../../api/client";

function GroupConfigCard() {

    const {groupId} = useParams()

    const group = useSelector(selectGroupById(groupId))

    const creator = useSelector(selectMembersByUids([group.creator]))[0]

    const uid = useSelector(selectUserData).uid

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const members = useSelector(selectMembersByUids(group.members.slice(1)))

    async function submitHandler() {
        if (uid !== creator.uid)
            return newRejectedPromise('只有群主才可以解散')
        else {
            try {
                const res = await dismissGroup(uid, groupId)
                if (res?.code === 200) {
                    dispatch(fetchGroups(uid))
                    navigate(-2)
                    return newFulfilledPromise('解散成功')
                } else
                    return newRejectedPromise('出现错误，稍后再试')
            } catch (e) {
                return newRejectedPromise('出现错误，稍后再试')
            }
        }
    }

    return (
        <Fragment>
            <PopCard
                title='群组设置'
                btnType='delete'
                btnText='解散群组'
                onSubmit={submitHandler}
                autoPopout={false}
            >
                <div className='group-config-group'>
                    <div className='group-config-text-sub'>群名</div>
                    <div className='group-config-text'>{group.groupName}</div>
                </div>
                <div className='horizon-split'/>
                <div className='group-config-group'>
                    <div className='group-config-text-sub'>群主</div>
                    <div className='group-config-avatar'>
                        <Avatar img={creator.img} size='20px'/>
                        <div className='group-config-avatar-name'>{creator.name}</div>
                    </div>
                </div>
                <div className='horizon-split'/>
                <div className='group-config-group'>
                    <div className='group-config-text-sub'>组员({members.length})</div>
                    <div className='group-config-member'>
                        {members.map(member => (
                            <div className='group-config-avatar'>
                                <Avatar img={member.img} size='16px'/>
                                <div className='group-config-avatar-name'>{member.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='horizon-split'/>
                <div className='group-config-group'>
                    <div className='group-config-text-sub'>群组 ID</div>
                    <div className='group-config-text'>{group.groupID.toUpperCase()}</div>
                </div>
                <div className='horizon-split'/>
                <div className='group-config-group'>
                    <div className='group-config-text-sub'>记录条数</div>
                    <div className='group-config-text'>{group.records.length}</div>
                </div>
                <div className='horizon-split group-config-last-group'/>
            </PopCard>
        </Fragment>
    );
}

export default GroupConfigCard;