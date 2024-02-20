import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

function Layout() {
  return (
    <>
      <StNav>
        <Link to="/">HOME</Link>
        <div>
          <Link to="/profile">내 프로필</Link>
          <Link to="/">로그아웃</Link>
        </div>
      </StNav>
      <Outlet />
    </>
  );
}

export default Layout;

const StNav = styled.nav`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  background-color: #b5c0d0;
`;
