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
            // Get current user id
            const currentUserId = JSON.parse(localStorage.getItem("currentUser")).userId;

            // Destructure values to reformat the date
            const { date, ...otherValues } = values;
            const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const formattedValues = { ...otherValues, date: formattedDate };

            // Get a copy of registeredUsers from localStorage and update the current user's events array with the newly added event
            const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || {};
            registeredUsers[currentUserId].events.push(formattedValues);

            // Update localStorage with the added event
            localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
            console.log(localStorage.getItem("registeredUsers"));

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

            <button type="submit" className="authentication-button">Add Event</button>
          </Form>
        </Formik>
      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>
    </Modal>
  )
}
