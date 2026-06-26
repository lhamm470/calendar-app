import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import './registerform.css'
import { TextInput } from '../FormInputComponents';
import { LoginStatusContext } from "../../LoginStatusContext";
import { useContext, useState } from "react";

console.log(localStorage);

const RegisterForm = ({ registeredUsers }) => {

  // Get loginstatus
  const { loginStatus, setLoginStatus } = useContext(LoginStatusContext);
  
  return (
    <div className="register-form">
      <h2>Register New User</h2>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .test("email-exists", "Email already in use", (email) => !Object.values(registeredUsers).some((u) => u.email === email))
            .required("Required"),
          password: Yup.string()
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
              "Password must contain 8 characters or more, at least one uppercase and lowercase letter, a number and a special case character"
            )
            .required("Required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Required"),
          
        })}
        onSubmit={(values, { setSubmitting }) => {
          // Destructure values to remove confirmPassword field
          const { confirmPassword, ...userData } = values;

          let nextUserId = Number(localStorage.getItem("nextUserId"));
          registeredUsers[`user${nextUserId}`] = userData;

          localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
          localStorage.setItem("nextUserId", String(nextUserId + 1));

          console.log(registeredUsers);
          console.log(localStorage);

          setLoginStatus("login");
          setSubmitting(false);
        }}
      >
        <Form className="input-form">
          <TextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Dover"
          />

          <TextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Ben"
          />

          <TextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="dover@ben.com"
          />

          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder=""
          />

          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder=""
          />

          <button type="submit" className="authentication-button">Submit</button>

          <button 
            className="login-instead" 
            onClick={() => {
              setLoginStatus("login");
              localStorage.setItem("currentUser", "");
            }}
          >
            Login instead
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;