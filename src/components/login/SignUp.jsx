import { authApi } from "axios/api";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setProfile } from "redux/modules/authSlice";
import styled from "styled-components";

function SignUp({ onLogInClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authApi.post("/register", {
        id: userId,
        password: password,
        nickname: nickname,
      });
      if (!userId || !password || !nickname) {
        return alert("아이디, 비밀번호, 닉네임은 필수값입니다.");
      }
      dispatch(setProfile({ avatar: "", nickname: nickname }));
      navigate("/");
    } catch (error) {
      alert("오류!");
    }
  };

  return (
    <StDiv onSubmit={handleSubmit}>
      <form>
        <StH1>회원가입</StH1>
        <StInput
          type="text"
          placeholder="아이디 (4~10글자)"
          minLength={4}
          maxLength={10}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <StInput
          type="text"
          placeholder="비밀번호 (4~15글자)"
          minLength={4}
          maxLength={15}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StInput
          type="text"
          placeholder="닉네임 (1~10글자)"
          minLength={1}
          maxLength={10}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <StBtn type="submit">회원가입</StBtn>
        <StLoginBtn type="button" onClick={onLogInClick}>
          로그인
        </StLoginBtn>
      </form>
    </StDiv>
  );
}

export default SignUp;

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

const StLoginBtn = styled.button`
  width: 400px;
  height: 40px;
  display: block;
  border: none;
  background-color: #ddd;
  cursor: pointer;
`;
