import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/counter/auth/Login";
import { SingUp } from "./features/counter/auth/SingUp";
import Welcome from "./features/counter/auth/Welcome";
import RequireAuth from "./features/counter/auth/RequireAuth";
import "./App.css";
import { Account } from "./features/counter/auth/Account";

function App() {
  return (
    <Account>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="singUp" element={<SingUp />} />
          <Route path="welcome" element={<Welcome />} />
        </Route>
      </Routes>
    </Account>
  );
}

export default App;
