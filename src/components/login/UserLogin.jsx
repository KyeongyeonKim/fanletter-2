import { authApi } from "axios/api";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "redux/modules/authSlice";
import styled from "styled-components";

function UserLogin({ onSignUpClick }) {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authApi.post("/login", {
        id: userId,
        password: password,
      });
      if (!userId || !password) {
        return alert("아이디와 비밀번호를 입력해주세요.");
      }
      dispatch(login({ userId, password }));
    } catch (error) {
      alert("오류!");
    }
  };

  return (
    <StDiv>
      <form onSubmit={handleSubmit}>
        <StH1>로그인</StH1>
        <StInput
          type="text"
          placeholder="아이디 (4~10글자)"
          minLength={4}
          maxLength={10}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <StInput
          type="password"
          placeholder="비밀번호 (4~15글자)"
          minLength={4}
          maxLength={15}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StBtn type="submit">로그인</StBtn>
        <StSignUpBtn type="button" onClick={onSignUpClick}>
          회원가입
        </StSignUpBtn>
      </form>
    </StDiv>
  );
}

export default UserLogin;

const StDiv = styled.div`
  background-color: #ddd;
  border-radius: 20px;
  width: 500px;
  height: 400px;
  padding: 50px 0;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StH1 = styled.h1`
  margin-bottom: 40px;
  font-size: 25px;
`;

const StInput = styled.input`
  width: 400px;
  height: 40px;
  display: block;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid black;
`;

const StBtn = styled.button`
  width: 400px;
  height: 40px;
  display: block;
  margin-bottom: 20px;
  border: 3px solid #fff;
  background-color: #ddd;
  cursor: pointer;
`;

const StSignUpBtn = styled.button`
  width: 400px;
  height: 40px;
  display: block;
  border: none;
  background-color: #ddd;
  cursor: pointer;
`;
