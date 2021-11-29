import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/main";
import CreateGroupCard from "./components/popCards/createGroup";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App/>}>
                    <Route path='home' element={<Main uid='0000'/>}>
                        <Route path='addGroup'>
                            <Route path='createGroup'
                                   element={<CreateGroupCard creator={{uid: '0000', name: 'foo', img: null}}/>}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
