import './App.css';
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import EmployeeTable from  "./components/Table/Employee-table/Employee-table";
import UsersTable from "./components/Table/User-table/Users-table";
import VastusedTable from "./components/Table/Vastused-table/Vastused-table";
import Login from "./components/Auth/Login/Login";
import Registration from "./components/Auth/Registration/Registration";
import AuthGuard from "./Security/Auth-guard";
import { startRefreshTokenTimer} from "./Services/Auth/Auth-services";
import {useEffect} from "react";
import VerifyEmail from "./components/Card/Verify-email";

function App() {
    useEffect(() => {
        startRefreshTokenTimer()

    })
  return (
    <div className="App">
      <Header/>
        <Routes>
            <Route path="/"
                   element={
                    <AuthGuard>
                        <EmployeeTable/>
                    </AuthGuard>
                   }/>

            <Route
                path="/users"
                element={
                <AuthGuard>
                    <UsersTable/>
                </AuthGuard>
            }/>

            <Route
                path="/vastused"
                element={
                <AuthGuard>
                    <VastusedTable/>
                </AuthGuard>

                }/>

            <Route path="/verify-email" element={<VerifyEmail/>}/>

            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
        </Routes>

    </div>
  );
}

export default App;
