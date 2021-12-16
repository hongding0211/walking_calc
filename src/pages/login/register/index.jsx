import React, {Fragment, useRef, useState} from 'react';
import PopCard from "../../../components/popCard";
import Input from "../../../components/input";
import {useNavigate, useSearchParams} from "react-router-dom";
import './index.css'
import FileInput from "../../../components/fileInput";
import {toast} from "react-hot-toast";
import {newFulfilledPromise, newRejectedPromise} from "../../../module/module";
import {register} from "../../../api/client";
import {useDispatch} from "react-redux";
import {fetchUserData} from "../../../features/users/usersSlice";
import {fetchGroups} from "../../../features/group/groupSlice";
import {useCookies} from "react-cookie";

function RegisterCard() {
    const [searchParams] = useSearchParams()
    const uid = searchParams.get('uid')

    const [file, setFile] = useState(null)

    const nameInputRef = useRef()

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [, setCookie,] = useCookies(['authentication'])

    function fileInputHandler(file) {
        if (file.size > 10240 * 1000)
            toast.error('文件大小大于 10M')
        else
            setFile(file)
    }

    async function submit() {
        const nameInput = nameInputRef.current.value
        if (nameInput.length === 0)
            return newRejectedPromise('请输入用户名')
        if (!file)
            return newRejectedPromise('请上传头像')
        // submit
        const res = await register(uid, nameInput, file)
        if (res?.code === 200) {
            setCookie('uid', uid)
            dispatch(fetchUserData(uid))
            dispatch(fetchGroups(uid))
            navigate('/home', {replace: true})
            return newFulfilledPromise('注册成功')
        } else
            return newRejectedPromise('操作失败，请稍后重试')
    }

    return (
        <Fragment>
            <PopCard title='注册' loadingIcon={true} onSubmit={submit} autoPopout={false}>
                <div className='register-card-sub-text'>UID</div>
                <div className='register-card-main-text'>{uid}</div>
                <div className='horizon-split register-card-split'/>
                <Input className='register-input' title='用户名' inputRef={nameInputRef}/>
                <div className='margin-top-20'>
                    <FileInput
                        title='头像'
                        acceptTypes='image/jpeg, image/png'
                        onFileInput={fileInputHandler}
                    />
                </div>
            </PopCard>
        </Fragment>
    );
}

export default RegisterCard;