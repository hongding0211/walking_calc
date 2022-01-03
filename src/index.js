import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {HashRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import CreateGroupCard from "./pages/home/addGroup/createGroup";
import {Provider} from "react-redux";
import store from './app/store'
import JoinGroupCard from "./pages/home/addGroup/joinGroup";
import AddGroupCard from "./pages/home/addGroup";
import Group from "./pages/group";
import ShareGroup from "./pages/group/shareGroup";
import TransactionDetailCard from "./pages/group/transactionDetail";
import DebtDetailCard from "./pages/group/debtDetail";
import AddRecordCard from "./pages/group/addRecord";
import Login from "./pages/login";
import RegisterCard from "./pages/login/register";
import GroupConfigCard from "./pages/group/groupConfigCard";
import {PersistGate} from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

let persistor = persistStore(store)

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <HashRouter>
                    <Routes>
                        <Route path='/' element={<App/>}>
                            <Route path='login' element={<Login/>}>
                                <Route path='register' element={<RegisterCard/>}/>
                            </Route>
                            <Route path='home' element={<Home/>}>
                                <Route path='addGroup' element={<AddGroupCard/>}>
                                    <Route path='createGroup' element={<CreateGroupCard/>}/>
                                    <Route path='joinGroup' element={<JoinGroupCard/>}/>
                                </Route>
                            </Route>
                            <Route path='home/:groupId' element={<Group/>}>
                                <Route path='share' element={<ShareGroup/>}/>
                                <Route path='debtDetail' element={<DebtDetailCard/>}/>
                                <Route path='addRecord' element={<AddRecordCard/>}/>
                                <Route path='groupConfig' element={<GroupConfigCard/>}/>
                                <Route path=':transactionId' element={<TransactionDetailCard/>}/>
                            </Route>
                        </Route>
                        <Route path='/*' element={<App/>}/>
                    </Routes>
                </HashRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
    , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
