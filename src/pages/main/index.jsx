import React, {useEffect, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import Avatar from '../../components/avatar'
import '../../config'
import './index.css'

/*
 * @Project    : walking_calc
 * @Created    : hong 2021/11/16 21:34
 * @Component  : Main
 * @Props      : uid: String 
 * @Description: The main page of the App.
*/

const Main = props => {
    const [imgSrc, setImgSrc] = useState(null)

    function onAddBtnClick() {
        // TODO
        console.log('todo')
    }

    useEffect(() => {
        async function fetchAvatar() {
            const uid = props.uid

            let avatarImg = await fetch(global.host + '/getUserAvatar?uid=' + uid)
            avatarImg = await avatarImg.json()
            if (avatarImg.code === 200) {
                setImgSrc('data:image/png;base64,' + avatarImg.data.img)
            }
        }

        fetchAvatar()
    }, [props.uid])


    return (
        <div className='main'>
            <div className='main-page-container'>

                <div className='main-title'>
                    <div className='main-title-l' onClick={onAddBtnClick}>
                        <span>群组</span>
                        <FontAwesomeIcon icon={faPlusCircle}/>
                    </div>
                    <Avatar size='40px' img={imgSrc}/>
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

            {/*TODO router*/}
            {/*{popCard && <div onClick={this.closeCard}> <TransparentMask /></div>}*/}

        </div>
    )
}

export default Main