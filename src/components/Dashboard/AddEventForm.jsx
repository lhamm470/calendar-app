import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import InputMask from 'react-input-mask';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './addeventform.css';

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

export default function AddEventForm({ show, onHide }) {
  
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="modal-header">
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Event
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Formik
          initialValues={{
            title: "",
            location: "",
            date: null,
            startTime: "",
            endTime: "",
          }}
          validationSchema={Yup.object({
            title: Yup.string()
              .max(30, "Must be 30 characters or less")
              .required("Required"),
            location: Yup.string()
              .max(40, "Must be 40 characters or less"),
            date: Yup.date()
              .nullable()
              .required("Required"),
            startTime: Yup.string()
              .required("Required"),
            endTime: Yup.string(),
          })}
          onSubmit={(values, { setSubmitting, setErrors }) => {

            
            localStorage.setItem("currentUser", JSON.stringify(user));
            setSubmitting(false);
          }}
        >
          <Form className="add-event-form">
            <TextInput
              label={"Title"}
              name="title"
              type="text"
              placeholder="Meeting"
            />

            <TextInput
              label={"Location"}
              name="location"
              type="text"
              placeholder=""
            />

            <DateInput 
              label={"Date"}
              name="date"
            />

            <div className="start-and-end-times">
              <TextInput 
                label={"Start Time"}
                name="startTime"
                type="time"
              />

              <TextInput 
                label={"End Time"}
                name="endTime"
                type="time"
              />
            </div>

            <TextInput
              label={"Type"}
              name="type"
              type="text"
              placeholder=""
            />

            <TextareaInput
              label={"Description"}
              name="description"
              type="text"
              placeholder=""
            />

            <button type="submit">Add Event</button>
          </Form>
        </Formik>
      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>
    </Modal>
  )
}
