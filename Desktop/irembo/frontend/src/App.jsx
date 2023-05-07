import { Route, Routes } from "react-router-dom";

import BounceRoute from './app/bounce';
import PrivateRoute from './app/privateRoute';
import AdminRoute from "./app/adminRoute";
import Register from "./components/Register";
import Login from "./components/Login";
import UpdateProfile from "./components/UpdateProfile";
import AddDocument from "./components/AddDocument"
import Home from "./components/Home";
import Cpanel from "./components/Cpanel";

function App() {
  return (
    <Routes>
      <Route element={<BounceRoute />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/add-document" element={<AddDocument/>}/>
      </Route>
      <Route element={<AdminRoute/>}>
      <Route path="/cpanel" element={<Cpanel/>}/>
      </Route>
    </Routes>
  );
}

export default App;
