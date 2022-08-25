import { Route, Routes } from "react-router-dom";
import "./App.css";
import Page404 from "./features/404/Page404";
import Login from "./features/auth/login/Login";
import Register from "./features/auth/register/Register";
import Dashboard from "./features/dashboard/Dashboard";
import MapDetail from "./features/mapDetail/MapDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/map" element={<MapDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
