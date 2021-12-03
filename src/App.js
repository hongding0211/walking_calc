import './App.css'
import React, {useEffect} from 'react'
import {Outlet, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchUserData} from "./features/authentication/authenticationSlice";

export default function App() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
            // TODO 暂时写死 UID
            dispatch(fetchUserData('0000'))
            navigate('/home')
        },
        // TODO 寻求有没有更好的解决方法
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [])

    return (
        <div>
            <Outlet/>
        </div>
    )
}
