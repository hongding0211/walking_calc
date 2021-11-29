import './App.css'
import React, {useEffect, useState} from 'react'
import {Outlet, useNavigate} from "react-router-dom";

export default function App() {

    const navigate = useNavigate()

    const [uid, setUid] = useState(null)
    const [user, setUser] = useState(null)

    function getUser(uid) {
        fetch(global.host + `/getUsers?uid=${uid}`)
            .then(v => v.json())
            .then(v => {
                if (v.code === 200) {
                    setUser(v.data.users[0])
                }
            })
    }


    useEffect(() => {
        // TODO 登陆逻辑
        setUid('0000')

        getUser(uid)
        navigate('/home')
    }, [uid, navigate])

    return (
       <div>
           <Outlet />
       </div>
    )
}
