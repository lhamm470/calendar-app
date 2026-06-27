import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField, useFormikContext } from "formik";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './forminputcomponents.css';

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-element">
      <label className="form-label" htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const TextareaInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-element">
      <label className="form-label" htmlFor={props.id || props.name}>{label}</label>
      <textarea className="textarea-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const DateInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();

  return (
    <div className="form-element">
      <label className="form-label" htmlFor={props.id || props.name}>{label}</label>

      <DatePicker 
        selected={field.value}
        onChange={(date) => setFieldValue(field.name, date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="DD/MM/YYYY"
        className="date-input"
      />

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}

const ColourInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();

  return (
    <div className="form-element">
      <label className="form-label form-label-blank" htmlFor={props.id || props.name}>{label}</label>
      <input 
        {...field}
        {...props}
        type="color" 
        className="colour-input"
      />

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}

export { TextInput, TextareaInput, DateInput, ColourInput };