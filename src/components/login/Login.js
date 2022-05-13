import React, { useRef } from "react";

import { useHistory } from "react-router-dom";
import validator from "validator";

import { auth } from "../../firebase";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const history = useHistory();

  const login = async () => {
    try {
      const { email, password } = getInputs();
      if (isUserCredentialsValid(email, password)) {
        await auth.signInWithEmailAndPassword(email, password);
        alert(`Welcome ${email}`);
        resetForm();
      } else {
        alert("Your email or password is not correct");
      }
    } catch (error) {
      alert("Your email or password is not correct");
    }
  };

  const getInputs = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    return { email, password };
  };

  const isUserCredentialsValid = (email, password) => {
    return validator.isEmail(email) && password;
  };

  const resetForm = () => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const createAccount = () => {
    history.push("/register");
  };

  return (
    <div className="login__container">
      <div className="login__welcome">
        <p>
          <span style={{ color: "#0B65C2", fontWeight: "bold" }}>
            Code Courses
          </span>{" "}
        </p>
      </div>
      <div className="login__form-container">
        <div className="login__form">
          <input
            type="text"
            placeholder="Email or phone number"
            ref={emailRef}
          />
          <input type="password" placeholder="Password" ref={passwordRef} />
          <button className="login__submit-btn" onClick={login}>
            Login
          </button>
          <span className="login__signup" onClick={createAccount}>
            Create New Account
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
