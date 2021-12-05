import React, {useRef} from 'react'
import CardButton from './cardButton'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import './index.css'
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";

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
                     onSubmit = () => {
                         console.error('Popcard does not have a submit callback.')
                     }
                 }) {

    const navigate = useNavigate()

    const maskRef = useRef()
    const cardRef = useRef()

    function closeCard() {
        navigate(-1)
    }

    async function submit() {
        try {
            toast.success(await onSubmit())
            closeCard()
        } catch (e) {
            toast.error(e)
        }
    }

    return (
        <div>
            <div
                ref={maskRef}
                className='transparent-mask'
                onClick={closeCard}
            />
            <div ref={cardRef} className='pop-card'>

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
