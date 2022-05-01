import './App.css';
import UserList from "./component/list/UserList";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Component} from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import AddUser from "./component/addUser/AddUser";
import Navbar from "./component/navbar/Navbar";


class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Navbar/>
                    <Routes>
                        <Route exact path='/' element={<UserList/>}/>
                        <Route  path='/addUser' element={<AddUser/>}/>
                        <Route  path='/users/update/:id' element={<AddUser/>}/>
                    </Routes>
                </BrowserRouter>
            </div>

        )
    }
}

export default App;
