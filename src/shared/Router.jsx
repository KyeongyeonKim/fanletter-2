import Layout from "components/Layout";
import Detail from "pages/Detail";
import Home from "pages/Home";
import Login from "pages/Login";
import Profile from "pages/Profile";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function Router() {
  const isLogin = useSelector((state) => state.auth.isLogin);

  return (
    <BrowserRouter>
      <Routes>
        {isLogin && isLogin ? (
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route
              path="/detail/:id"
              element={<Navigate replace to="/login" />}
            />
            <Route path="/profile" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
