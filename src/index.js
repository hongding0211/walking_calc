import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/main";
import CreateGroupCard from "./pages/main/addGroup/createGroup";
import {Provider} from "react-redux";
import store from './app/store'
import JoinGroupCard from "./pages/main/addGroup/joinGroup";
import AddGroupCard from "./pages/main/addGroup";
import Group from "./pages/group";
import ShareGroup from "./pages/group/shareGroup";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App/>}>
                        <Route path='home' element={<Main/>}>
                            <Route path='addGroup' element={<AddGroupCard/>}>
                                <Route path='createGroup' element={<CreateGroupCard/>}/>
                                <Route path='joinGroup' element={<JoinGroupCard/>}/>
                            </Route>
                        </Route>
                        <Route path='home/group/:groupId' element={<Group/>}>
                            <Route path='share/:groupId' element={<ShareGroup/>}/>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
    , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
