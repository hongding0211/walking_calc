import './App.css'
import React, {Component} from 'react'
import Main from './pages/main'
import CreateGroupCard from "./components/popCards/createGroup";


class App extends Component {
    render() {
        return (
            <div className="App">
                {/*<Main uid='0000'/>*/}
                <CreateGroupCard creator={{uid: '0000', name: 'hong', img: null}}/>
            </div>
        )
    }
}

export default App

