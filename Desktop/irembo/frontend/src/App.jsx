import { Route, Routes } from "react-router-dom";

import BounceRoute from './app/bounce';
import PrivateRoute from './app/privateRoute';
import Register from "./components/Register";
import Login from "./components/Login";

import Home from "./components/Home";

function App() {
  return (
    <Routes>
      <Route element={<BounceRoute />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
