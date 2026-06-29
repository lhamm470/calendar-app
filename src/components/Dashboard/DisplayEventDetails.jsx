import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import InputMask from 'react-input-mask';
import './displayeventdetails.css';
import { MdEdit, MdDelete } from "react-icons/md";
import { useState, useRef, useContext } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { RefreshKeyContext } from '../../RefreshKeyContext';
import EditEventForm from './EditEventForm';

export default function DisplayEventDetails({ show, onHide, event }) {
  const { refreshKey, setRefreshKey } = useContext(RefreshKeyContext);
  
  const eventDate = new Date(event.date);
  const date = eventDate.getDate();
  const monthName = eventDate.toLocaleDateString("en-AU", { month: "long" });
  const year = eventDate.getFullYear();
  const dayName = eventDate.toLocaleDateString("en-AU", { weekday: "long" });

  // Delete event popup
  const[showDeleteEvent, setShowDeleteEvent] = useState(false);

  // Edit event modal
  const [showEditEventForm, setShowEditEventForm] = useState(false);

  const deletePopover = (
    <Popover id="delete-popover">
      <Popover.Header as="h3">Delete Event?</Popover.Header>
      <Popover.Body>
        <div className="d-flex gap-2">
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => {
              // Get current user id
              const currentUserId = JSON.parse(localStorage.getItem("currentUser")).userId;

              // Get a copy of registeredUsers from localStorage and update the current user's events array with the newly added event
              let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || {};
              let userEvents = {};
              userEvents = registeredUsers[currentUserId].events.filter(
                (e) => e.eventId !== event.eventId
              );
              registeredUsers[currentUserId].events = userEvents;

              // Update currentUser details
              const { ...userInformation } = registeredUsers[currentUserId];
              const updatedCurrentUserInformation = { userId: currentUserId, ...userInformation }
              localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUserInformation));

              // Update localStorage with the removed event
              localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
              console.log(localStorage);

              setRefreshKey((prev) => prev + 1);
              onHide();
              setShowDeleteEvent(false);
            }}
          >
            Delete
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setShowDeleteEvent(false)}>
            Cancel
          </Button>
        </div>
      </Popover.Body>
    </Popover>
  );
  
  
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* Header */}
        <Modal.Header closeButton className="modal-header">
          <div className="event-details-header">

            <div className="edit-and-remove-event-buttons">
              <button 
                className="icon-button" 
                title="Edit Event"
                onClick={() => {
                  setShowEditEventForm(true);
                  onHide();
                }}
              >
                <MdEdit style={{ color: "var(--opposite-theme)" }}/>
              </button>

              {/* Delete button confirmation popover */}
              <OverlayTrigger
                show={showDeleteEvent}
                trigger="click"
                placement="bottom"
                rootClose
                overlay={deletePopover}
                onToggle={(nextShow) => setShowDeleteEvent(nextShow)}
              >
                <button 
                  className="icon-button" 
                  title="Remove Event" 
                  onClick={() => {
                    setShowDeleteEvent(true);
                    console.log(showDeleteEvent);
                  }}
                >
                  <MdDelete style={{ color: "var(--opposite-theme)" }}/>
                </button>
              </OverlayTrigger>

            </div>

          </div>
        </Modal.Header>
        
        {/* Form body */}
        <Modal.Body className="modal-body event-details">
          <h3 className="details-text">{event.title}</h3>
          <span>{dayName} {date} {monthName} {year}</span>
          <span style={{ fontWeight: "bold" }}>{event.startTime}{event.endTime ? ` - ${event.endTime}` : null}</span>
          <br />
          <span className="details-text">Location: {event.location || "-"}</span>
          <br />
          <span className="details-text">Description: {event.description || "-"}</span>
        </Modal.Body>
        <Modal.Footer className="modal-footer">

        </Modal.Footer>
      </Modal>
      <EditEventForm show={showEditEventForm} onHide={() => setShowEditEventForm(false)} event={event} />
    </>
  )
}
