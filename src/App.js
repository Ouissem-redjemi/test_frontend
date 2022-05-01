
import './App.css';
import Navbar from "./component/navbar/Navbar";
import UserList from "./component/list/UserList";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        <Navbar/>
        <UserList/>
    </div>
  );
}

export default App;
