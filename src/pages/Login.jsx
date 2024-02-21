import { authApi } from "axios/api";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "redux/modules/authSlice";
import styled from "styled-components";

function Login() {
  const dispatch = useDispatch();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const onSubmitHandler = async (event) => {
    event.prventDefault();
    if (isLoginForm) {
      // 로그인 처리
      try {
        const { data } = await authApi.post("/login", {
          id: userId,
          password,
        });
        if (data.success) {
          dispatch(login(data.accessToken));
          toast.success("로그인 성공!");
        }
      } catch (err) {
        toast.error(err.response.data.message);
      }
    } else {
      // 회원가입 처리
      try {
        const { data } = await authApi.post("/register", {
          id: userId,
          password,
          nickname,
        });
        if (data.success) {
          setIsLoginForm(true);
          setUserId("");
          setPassword("");
          setNickname("");
          toast.success("회원가입 성공!");
        }
      } catch (err) {
        console.log("err : ", err);
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <>
      <StDiv>
        <form onSubmit={onSubmitHandler}>
          <StH1>{isLoginForm ? "로그인" : "회원가입"}</StH1>
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
          {!isLoginForm && (
            <StInput
              placeholder="닉네임 (1~10글자)"
              minLength={1}
              maxLength={10}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            ></StInput>
          )}
          <StBtn text={isLoginForm ? "로그인" : "회원가입"} />
          <ToggleText>
            <span onClick={() => setIsLoginForm((prev) => !prev)}>
              {isLoginForm ? "회원가입" : "로그인"}
            </span>
          </ToggleText>
        </form>
      </StDiv>
    </>
  );
}

export default Login;

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
  outline: none;
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

// const StSignUpBtn = styled.button`
//   width: 400px;
//   height: 40px;
//   display: block;
//   border: none;
//   background-color: #ddd;
//   cursor: pointer;
// `;

const ToggleText = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 24px;
  & span {
    color: lightblue;
    user-select: none;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
`;
