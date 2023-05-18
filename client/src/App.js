import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";
import Customers from "./Pages/Customers";
import Dashboard from "./Pages/Dashbaord";
import Inventory from "./Pages/Inventory";
import Orders from "./Pages/Orders";
import Login from "./Pages/Login";
import { getRoleFromToken } from "./Components/auth";
import { useEffect, useState } from "react";
import EditCustomers from "./Pages/Customers/EditCustomer";
import ViewCustomer from "./Pages/Customers/ViewCustomer";
import Register from "./Pages/Register/Register";
import ManageUsers from "./Pages/ManageUsers/ManageUsers";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get the JWT token from your authentication system or local storage
    const token = localStorage.getItem("token");
    // Extract the role from the token
    const role = getRoleFromToken(token);
    setUserRole(role);
    // console.log("Role", role);
  }, []);

  return (
    <div className="App">
      {isLoginPage ? (
        <Routes>
              <Route path="/login" element={<Login />} />       
        </Routes>
      ) : (
        <>
          <Header />
          <div className="SideMenuAndPageContent">
            <SideBar userRole={userRole} />
            <Routes>
              {userRole === "admin" && (
                <>           
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/customers" element={<Customers userRole={userRole} />} />
                  <Route path="/customers/editcustomers/:id" element={<EditCustomers />} />
                  <Route path="/customers/viewcustomers/:id" element={<ViewCustomer />} />               
                  <Route path="/register" element={<Register />} />               
                  <Route path="/users" element={<ManageUsers />} />               
                </>
              )}
              {userRole === "manager" && (
                <>              
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/customers" element={<Customers userRole={userRole} />} />
                  <Route path="/customers/editcustomers/:id" element={<EditCustomers  />} />
                  <Route path="/customers/viewcustomers/:id" element={<ViewCustomer />} />               
                </>
              )}
              {userRole === "user" && (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/customers" element={<Customers userRole={userRole} />} />
                  <Route path="/customers/viewcustomers/:id" element={<ViewCustomer />} />             
                </>
              )}
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
