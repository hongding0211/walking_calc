import React, {Fragment} from 'react';
import PopCard from "../../../components/popCard";
import Input from "../../../components/input";
import {useSearchParams} from "react-router-dom";
import './index.css'
import FileInput from "../../../components/fileInput";

function RegisterCard() {
    const [searchParams] = useSearchParams()
    const uid = searchParams.get('uid')
    return (
        <Fragment>
            {/*TODO onsubmit*/}
            <PopCard title='注册' loadingIcon={true}>
                <div className='register-card-sub-text'>UID</div>
                <div className='register-card-main-text'>{uid}</div>
                <div className='horizon-split register-card-split'/>
                <Input className='register-input' title='用户名'/>
                <FileInput />
            </PopCard>
        </Fragment>
    );
}

export default RegisterCard;