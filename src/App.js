import './App.css';
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import EmployeeTable from  "./components/Table/Employee-table/Employee-table";
import UsersTable from "./components/Table/User-table/Users-table";
import VastusedTable from "./components/Table/Vastused-table/Vastused-table";
import Login from "./components/Auth/Login/Login";
import Registration from "./components/Auth/Registration/Registration";

function App() {
  return (
    <div className="App">
      <Header/>
        <Routes>
            <Route path="/" element={<EmployeeTable/>}/>
            <Route path="/users" element={<UsersTable/>}/>
            <Route path="/vastused" element={<VastusedTable/>}/>

            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
        </Routes>

    </div>
  );
}

export default App;
