import React from 'react'
import CardButton from './cardButton'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import './index.css'
import TransparentMask from "../transparentMask";

/*
 * @Project    : walking_calc
 * @Created    : hong 2021/11/16 21:18
 * @Component  : PopCard
 * @Props      : title:          String
 *               btnType:        String { normal, warning, none }
 *               loadingIcon:    Boolean
 *               onSubmit:       Function() -> To submit.
 *               children:       Component -> Content in the card
 * @Description: A blank and basic pop-out card with an optional button.
*/

function PopCard({
                     title,
                     children,
                     btnType = 'normal',
                     loadingIcon = false,
                     onSubmit = ()=>{
                         console.error('Popcard does not have a submit callback.')
                     }
                 }) {

    function closeCard(){
        // TODO 利用路由回退
        console.log('todo: close card')
    }

    function submit(){
        // TODO 通知父组件，如果结果成功则关闭
        onSubmit()
    }

    return (
        <div>
            <TransparentMask />
            <div className='pop-card'>

                <div className='pop-card-header'>
                    <div>{title}</div>
                    <div onClick={closeCard}>
                        <FontAwesomeIcon icon={faTimes} transform="shrink-6"/>
                    </div>
                </div>

                <div className='pop-card-content'>
                    {children}
                </div>

                {btnType !== 'none' &&
                <div onClick={submit} style={{width: '100%'}}>
                    <CardButton type={btnType} loadingIcon={loadingIcon}/>
                </div>
                }

            </div>
        </div>
    )

}

export default PopCard
