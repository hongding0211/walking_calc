import React, { Component } from 'react';
import Input from '../../input';
import PopCard from '../../popCard';
import AvatarStack from '../../avatarStack'
import './index.css'
import SearchBar from '../../searchBar';
import Avatar from '../../avatar';

class CreateGroupCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            creator: props.creator,
            members: [],
            feedback: '',
            searchCandidates: []
        }
        this.groupNameRef = React.createRef()
    }

    updateCandidate = (text) => {
        let searchCandidates = []

        fetch(`${global.host}/getUsers?keyword=${text}`).then(v => v.json())
            .then(v => {
                if (v.code === 200) {
                    for (const u of v.data.users)
                        searchCandidates.push({
                            name: u.name,
                            img: `data:image/png;base64,${u.img}`,
                            uid: u.uid
                        })
                }
                this.setState({
                    searchCandidates
                })
            })
    }

    addItem = (item) => {
        let feedback = ''
        console.log(item)
        if (this.state.members.find(m => item.uid === m.uid) || this.state.creator.uid === item.uid)
            feedback = '不能重复添加成员'
        else {
            this.setState({
                members: [...this.state.members, item]
            })
        }
        this.setState({ feedback })
    }

    dropItem = (item) => {
        this.setState({
            members: this.state.members.filter(i => i.uid !== item.uid)
        })
    }

    submit = () => {
        let feedback = ''
        const groupName = this.groupNameRef.current.value
        const members = this.state.members
        const creator = this.state.creator.uid
        if (groupName === '') {
            feedback = '* 群组名称不能为空'
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
                })
        }
        this.setState({
            feedback
        })
    }

    render() {
        return (
            <div>
                <PopCard
                    title='创建一个群组'
                    children={
                        <div className='create-group-content'>
                            <div className='feedback-text'>
                                {this.state.feedback}
                            </div>
                            <Input title='群名' inputRef={this.groupNameRef} />
                            <span className='small-title margin-top-20'>组内成员</span>
                            <div className='create-group-avatar-stack-container'>
                                <Avatar size='32px' img={`data:image/png;base64,${this.state.creator.img}`} />
                                <AvatarStack size='32px' users={this.state.members} allowDelete={true} onAvatarDelete={this.dropItem} />
                            </div>
                            <SearchBar searchCandidateUpdate={this.updateCandidate} searchCandidates={this.state.searchCandidates} itemSelectedCallback={this.addItem} />
                        </div>
                    }
                    onCardbtnClick={this.submit}
                />
            </div>
        );
    }
}

export default CreateGroupCard;
