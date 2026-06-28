import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import InputMask from 'react-input-mask';
import './addeventform.css';
import { TextInput, TextareaInput, DateInput, ColourInput } from '../FormInputComponents';

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
            colour: "#008000",
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
            endTime: Yup.string()
              .test(
                "after-start",
                "End time must be after start time",
                function (endTime) {
                  const { startTime } = this.parent;

                  if (!startTime || !endTime) return true;

                  return endTime > startTime;
                }
              ),
          })}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            // Get current user id and eventId
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            const currentUserId = currentUser.userId;
            const currentEventId = currentUser.nextEventId;

            // Destructure values to reformat the date
            const { date, ...otherValues } = values;
            const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const formattedValues = { ...otherValues, date: formattedDate, eventId: currentEventId };

            // Get a copy of registeredUsers from localStorage and update the current user's events array with the newly added event
            const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || {};
            registeredUsers[currentUserId].nextEventId += 1;
            registeredUsers[currentUserId].events.push(formattedValues);

            // Update currentUser details
            const { ...userInformation } = registeredUsers[currentUserId];
            const updatedCurrentUserInformation = { userId: currentUserId, ...userInformation }
            localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUserInformation));

            // Update localStorage with the added event and update currentUser details
            localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
            console.log(localStorage);

            setSubmitting(false);
            onHide();
          }}
        >
          <Form className="add-event-form input-form">
            
            {/* Title */}
            <div className="title-and-colour">
              <TextInput
                label={"Title *"}
                name="title"
                type="text"
                placeholder="GP Appointment"
              />

              <ColourInput
                label="."
                name="colour"
                type="colour" 
              />
            </div>

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

            <button type="submit" className="authentication-button add-event-submission">Add Event</button>
          </Form>
        </Formik>
      </Modal.Body>
      <Modal.Footer className="modal-footer">

      </Modal.Footer>
    </Modal>
  )
}
