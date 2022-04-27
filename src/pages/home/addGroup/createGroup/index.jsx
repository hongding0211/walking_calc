import React, {useRef, useState} from 'react';
import Input from '../../../../components/input';
import PopCard from '../../../../components/popCard';
import AvatarStack from '../../../../components/avatarStack'
import './index.css'
import SearchBar from '../../../../components/searchBar';
import Avatar from '../../../../components/avatar';
import AvatarTag from "../../../../components/avatarTag";
import {useDispatch, useSelector} from "react-redux";
import {selectUserData} from "../../../../features/users/usersSlice";
import {createGroup, getUsersById} from "../../../../api/client";
import {fetchGroups} from "../../../../features/group/groupSlice";
import {newRejectedPromise} from "../../../../module/module";
import ToggleSwitch from "../../../../components/toggleSwitch";

/*
 * @Project    : walking_calc
 * @Created    : hong 2021/11/16 21:22
 * @Component  : CreateGroup
 * @Props      : n/a
 * @Description: Card for creating a new group.
*/

const CreateGroupCard = () => {

    const [members, setMembers] = useState([])
    const [feedbackMsg, setFeedbackMsg] = useState('')
    const [searchCandidates, setSearchCandidates] = useState([])

    const groupNameRef = useRef()

    const isGameMode = useRef(false)

    const creator = useSelector(selectUserData)

    const dispatch = useDispatch()

    async function updateCandidate(text) {
        let newSearchCandidates = []
        for (const u of await getUsersById(text)) {
            newSearchCandidates.push({
                name: u.name,
                img: u.img,
                uid: u.uid
            })
        }
        setSearchCandidates(newSearchCandidates)
    }

    function addItem(item) {
        let newFeedbackMsg = ''
        if (members.find(m => item.uid === m.uid) || creator.uid === item.uid)
            newFeedbackMsg = '不能重复添加成员'
        else {
            setMembers([...members, item])
        }
        setFeedbackMsg(newFeedbackMsg)
        setSearchCandidates([])
    }

    function dropItem(item) {
        setMembers(members.filter(i => i.uid !== item.uid))
    }

    async function submit() {
        setFeedbackMsg('')
        const groupName = groupNameRef.current.value
        if (groupName === '') {
            return newRejectedPromise('群组名不能为空')
        } else {
            // try to submit
            try {
                let res = await createGroup(groupName, creator.uid, isGameMode.current, members)
                if (res.code === 200) {
                    return new Promise(resolve => resolve('添加成功'))
                } else
                    return new Promise((_, reject) => reject('操作失败，稍后再试'))
            } catch (e) {
                return new Promise((_, reject) => reject('操作失败，稍后再试'))
            } finally {
                dispatch(fetchGroups(creator.uid))
            }
        }
    }

    function toggleGameMode(status) {
        isGameMode.current = status
    }

    return (
        <div>
            <PopCard
                title='创建一个群组'
                onSubmit={submit}
            >
                <div className='create-group-content'>
                    <div className='feedback-text'>
                        {feedbackMsg}
                    </div>
                    <Input title='群名' inputRef={groupNameRef}/>
                    <span className='small-title margin-top-20'>组内成员</span>
                    <div className='create-group-avatar-stack-container'>
                        <div className='create-group-avatar-stack-container-1'>
                            <Avatar size='32px' img={creator.img}/>
                        </div>
                        <AvatarStack size='32px' users={members} allowDelete={true}
                                     onAvatarDelete={dropItem}/>
                    </div>
                    <SearchBar
                        placeHolder='搜索添加用户'
                        onSearchContentUpdate={updateCandidate}
                        list={
                            searchCandidates.map(c => {
                                return (
                                    <div
                                        onClick={() => {
                                            addItem(c)
                                        }}
                                        key={c.uid}
                                    >
                                        <AvatarTag size='18px' text={`${c.uid} (${c.name})`} img={c.img} uid={c.uid}/>
                                    </div>
                                )
                            })
                        }
                    />
<<<<<<< HEAD
                    <ToggleSwitch />
=======
                    <div className='small-title margin-top-20 margin-bottom-10'>游戏模式</div>
                    <ToggleSwitch onClickHandler={toggleGameMode}/>
>>>>>>> dev
                </div>
            </PopCard>
        </div>
    )
}

export default CreateGroupCard;
