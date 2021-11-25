import React, {useRef, useState} from 'react';
import Input from '../../input';
import PopCard from '../../popCard';
import AvatarStack from '../../avatarStack'
import './index.css'
import SearchBar from '../../searchBar';
import Avatar from '../../avatar';
import AvatarTag from "../../avatarTag";

/*
 * @Project    : walking_calc
 * @Created    : hong 2021/11/16 21:22
 * @Component  : CreateGroup
 * @Props      : creator:   Object { uid, img, name }
 * @Description: Card for creating a new group.
*/

const CreateGroupCard = props => {
    const creator = props.creator
    const imgSrc = creator ? 'data:image/png;base64' + creator.img : null

    const [members, setMembers] = useState([])
    const [feedbackMsg, setFeedbackMsg] = useState('')
    const [searchCandidates, setSearchCandidates] = useState([])

    const groupNameRef = useRef()

    function updateCandidate(text) {
        let newSearchCandidates = []

        fetch(`${global.host}/getUsers?keyword=${text}`).then(v => v.json())
            .then(v => {
                if (v.code === 200) {
                    for (const u of v.data.users)
                        newSearchCandidates.push({
                            name: u.name,
                            img: `data:image/png;base64,${u.img}`,
                            uid: u.uid
                        })
                }
                setSearchCandidates(newSearchCandidates)
            })
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

    function submit() {
        let newFeedbackMsg = ''
        const groupName = groupNameRef.current.value
        if (groupName === '') {
            newFeedbackMsg = '* 群组名称不能为空'
        } else {
            // try to submit
            let membersStr = ''
            for (const i in members)
                membersStr += `&member${Number(i) + 1}=${members[i].uid}`
            fetch(`${global.host}/createGroup?groupName=${groupName}&creator=${creator}${membersStr}`)
                .then(v => v.json())
                .then(v => {
                    // TODO Group 创建成功后的callback 操作
                    // TODO 返回 code feedback
                    console.log('todo create group response', v)
                })
        }
        setFeedbackMsg(newFeedbackMsg)
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
                        <Avatar size='32px' img={imgSrc}/>
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
                </div>
            </PopCard>
        </div>
    )
}

export default CreateGroupCard;
