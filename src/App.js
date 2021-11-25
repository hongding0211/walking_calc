import './App.css'
import React from 'react'
import { Route, Routes} from "react-router-dom";
import Main from "./pages/main";
import NoMatch from "./components/noMatch";

export default function App() {
    const uid = '0000'

    return (
        <Routes>
            <Route path='/'>
                <Route path='home' element={<Main uid={uid}/>}/>
            </Route>

            <Route path='*' element={<NoMatch/>}/>
        </Routes>
    )
}
