import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import UpdateUser from "./pages/updateUser/UpdateUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import SingleUser from "./components/singleUser/SingleUser";
import ExchangeContact from "./components/exchangeContact/ExchangeContact";
import UserAnalytic from "./components/userAnalytic/UserAnalytic";
import Login from "./pages/login/Login";
import AdminLogin from "./components/adminLogin/AdminLogin.js";
function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />

            </Route>
            <Route path="stats">
              <Route index element={<Home page="stats" />} />
            </Route>
            <Route path="user">
              <Route index element={<List />} />
              {/* <Route path=":userId" element={<Single />} /> */}
              <Route
                path=":userId"
                // element={<UpdateUser inputs={userInputs} title="View User Data" permission='view' />}
                element={<SingleUser />}
              />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
              <Route
                path="update/:userId"
                element={<UpdateUser inputs={userInputs} title="Update User Data" permission='update' />}
              />
            </Route>

            <Route path="/view/:id" element={<SingleUser />} />
            <Route path="/exchange-contact" element={<ExchangeContact />} />
            <Route path="/user-analytic/:id" element={<UserAnalytic />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
