import React, { Component } from 'react';
import Input from '../../input';
import PopCard from '../../popCard';
import AvatarStack from '../../avatarStack'
import './index.css'
import SearchBar from '../../searchBar';
import Avatar from '../../avatar';

class CreateGroupContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            creator: props.creator,
            members: []
        }

    }

    addItem = (item) => {
        if (!this.state.members.find(m => item.uid === m.uid)) {
            this.setState({
                members: [...this.state.members, item]
            })
        }
    }

    dropItem = (item) => {
        this.setState({
            members: this.state.members.filter(i => i.uid !== item.uid)
        })
    }

    render() {
        return (
            <div className='create-group-content'>
                <Input title='群名' />
                <span className='small-title margin-top-20'>组内成员</span>
                <div className='create-group-avatar-stack-container'>
                    <Avatar size='32px' img={`data:image/png;base64,${this.state.creator.img}`} />
                    <AvatarStack size='32px' users={this.state.members} allowDelete={true} onAvatarDelete={this.dropItem} />
                </div>
                <SearchBar itemSelectedCallback={this.addItem} />
            </div>
        )
    }
}

class CreateGroupCard extends Component {

    submit = () => {

    }

    render() {
        return (
            <div>
                <PopCard
                    title='创建一个群组'
                    children={<CreateGroupContent creator={this.props.creator} />}
                    onCardbtnClick={this.submit}
                />
            </div>
        );
    }
}

export default CreateGroupCard;
