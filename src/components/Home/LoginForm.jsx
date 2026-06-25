import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import './loginform.css'
import { TextInput } from '../FormInputComponents';
import { LoginStatusContext } from "../../LoginStatusContext";
import { useContext, useState } from "react";

let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

const LoginForm = () => {
  
  // Get loginstatus
  const { loginStatus, setLoginStatus } = useContext(LoginStatusContext);
  
  return (
    <div className="login-form">
      <h2>Login</h2>
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
          const user = registeredUsers.find((user) => user.email === values.email)

          if (!user) {
            setErrors({ email: "Email does not exist"});
            setSubmitting(false);
            return;
          } 
          
          if (user.password !== values.password) {
            setErrors({ password: "Incorrect password"});
            setSubmitting(false);
            return;
          }
          
          setLoginStatus("loggedIn");
          localStorage.setItem("currentUser", JSON.stringify(user));
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

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;