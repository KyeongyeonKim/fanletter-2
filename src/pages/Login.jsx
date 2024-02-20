import React, { useState } from "react";
import UserLogin from "components/login/UserLogin";
import SignUp from "components/login/SignUp";

function Login() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const userLoginClick = () => {
    setIsLoginForm(false);
  };

  const SignUpClick = () => {
    setIsLoginForm(true);
  };

  return (
    <>
      <div>
        {isLoginForm ? (
          <UserLogin onSignUpClick={userLoginClick} />
        ) : (
          <SignUp onLogInClick={SignUpClick} />
        )}
      </div>
    </>
  );
}

export default Login;
