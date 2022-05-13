import React, { useRef } from "react";
import validator from "validator";

import { auth } from "../../firebase";

const SignUp = () => {
  const confirmPasswordRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const signup = async () => {
    try {
      const { email, password, confirmPassword } = getInputs();
      if (
        isSignupValid({
          email,
          password,
          confirmPassword,
        })
      ) {
        await auth.createUserWithEmailAndPassword(email, password);
        alert(
          `${email} was created successfully! Please sign in with your created account!`
        );
        resetForm();
      }
    } catch (error) {
      alert("Cannot create your account, please try again!");
    }
  };

  const getInputs = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    return { email, password, confirmPassword };
  };

  const isSignupValid = ({ email, password, confirmPassword }) => {
    if (!validator.isEmail(email)) {
      alert("Please input your email");
      return false;
    }
    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, { min: 6 })
    ) {
      alert(
        "Please input your password. You password must have at least 6 characters"
      );
      return false;
    }
    if (validator.isEmpty(confirmPassword)) {
      alert("Please input your confirm password");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Confirm password and password must be the same");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  return (
    <div className="signup">
      <div className="signup__content">
        <div className="signup__container">
          <div className="signup__title">Sign Up</div>
        </div>
        <div className="signup__subtitle"></div>
        <div className="signup__form">
          <input type="text" placeholder="Email" ref={emailRef} />
          <input type="password" placeholder="Password" ref={passwordRef} />
          <input
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
          />
          <button className="signup__btn" onClick={signup}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
