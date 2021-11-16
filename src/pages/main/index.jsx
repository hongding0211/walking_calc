import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Avatar from '../../components/avatar'
import TransparentMask from '../../components/transparentMask'
import '../../config'
import './index.css'

class Main extends Component {

    state = {
        imgSrc: null,
        popCard: false
    }

    async componentDidMount() {
        const uid = this.props.uid

        let avatarImg = await fetch(global.host + '/getUserAvatar?uid=' + uid)
        avatarImg = await avatarImg.json()
        if (avatarImg.code === 200) {
            this.setState({
                imgSrc: 'data:image/png;base64,' + avatarImg.data.img
            })
        }
    }


    closeCard = () => {
        this.setState({
            popCard: false
        })
    }


    render() {
        return (
            <div className='main'>
                <div className='main-page-container'>

                    <div className='main-title'>
                        <div className='main-title-l'>
                            <span>群组</span>
                            <FontAwesomeIcon icon={faPlusCircle} />
                        </div>
                        <Avatar size='40px' img={this.state.imgSrc} />
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

                {this.state.popCard && <div onClick={this.closeCard}> <TransparentMask /></div>}

            </div>
        );
    }
}

export default Main;