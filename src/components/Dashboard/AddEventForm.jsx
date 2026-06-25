import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import InputMask from 'react-input-mask';
import './addeventform.css';
import { TextInput, TextareaInput, DateInput } from '../FormInputComponents';

export default function AddEventForm({ show, onHide }) {
  
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* Header */}
      <Modal.Header closeButton className="modal-header">
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Event
        </Modal.Title>
      </Modal.Header>
      
      {/* Form body */}
      <Modal.Body className="modal-body">
        <Formik
          initialValues={{
            title: "",
            location: "",
            date: null,
            startTime: "",
            endTime: "",
          }}
          
          // Validation schema
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
          <Form className="add-event-form input-form">
            
            {/* Title */}
            <TextInput
              label={"Title *"}
              name="title"
              type="text"
              placeholder="GP Appointment"
            />

            {/* Location */}
            <TextInput
              label={"Location"}
              name="location"
              type="text"
              placeholder="123 street"
            />

            {/* Date */}
            <DateInput 
              label={"Date *"}
              name="date"
            />

            <div className="start-and-end-times">
              {/* Start time */}
              <TextInput 
                label={"Start Time *"}
                name="startTime"
                type="time"
              />

              {/* End time */}
              <TextInput 
                label={"End Time"}
                name="endTime"
                type="time"
              />
            </div>

            {/* Description */}
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
