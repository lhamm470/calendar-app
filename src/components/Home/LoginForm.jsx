import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import './loginform.css'
import { TextInput } from '../FormInputComponents';
import { LoginStatusContext } from "../../LoginStatusContext";
import { useContext, useState } from "react";

const LoginForm = ({ registeredUsers }) => {
  
  // Get loginstatus
  const { loginStatus, setLoginStatus } = useContext(LoginStatusContext);
  
  return (
    <div className="login-form">
      <h2>Login</h2>
      <hr></hr>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(8, "Must be 8 characters or more")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting, setErrors }) => {

          // Check if email and password are valid
          const entry = Object.entries(registeredUsers).find(([userId, userInformation]) => userInformation.email === values.email)

          if (!entry) {
            setErrors({ email: "Email does not exist"});
            setSubmitting(false);
            return;
          } 

          const [userId, user] = entry;
          
          if (user.password !== values.password) {
            setErrors({ password: "Incorrect password"});
            setSubmitting(false);
            return;
          }
          
          setLoginStatus("loggedIn");
          localStorage.setItem("currentUser", JSON.stringify({ userId, ...user }));
          console.log(localStorage);
          setSubmitting(false);
        }}
      >
        <Form className="input-form">
          <TextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="example@email.com"
          />

          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder=""
          />

          <button type="submit" className="authentication-button">Login</button>

          <button 
            className="register-instead" 
            onClick={() => {
              setLoginStatus("register");
              localStorage.setItem("currentUser", "null");
            }}
          >
            Register New User
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;