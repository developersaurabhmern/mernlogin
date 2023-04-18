import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Guard from "./utils/custom.guard";
import { AuthContext } from "./utils/user.context";
import useUserContext from "./utils/user.context";

import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";

import { ToastContainer } from "react-toastify";

function App() {
  const data = useUserContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    data.login(JSON.parse(token));
  }, []);

  return (
    <AuthContext.Provider value={data}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {Guard(Login, "/", { unAuthRequire: true })}
          {/* {Guard(Login, "/login", { unAuthRequire: true })} */}
          {Guard(Dashboard, "/dashboard", { authRequire: true })}
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
