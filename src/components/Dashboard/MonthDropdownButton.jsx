import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useContext } from 'react';
import './monthdropdownbutton.css';
import { SelectedDateContext } from '../../SelectedDateContext';

function MonthDropdownButton() {

  // Get selectedDate and setSelectedDate
  const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);
  
  let monthsArray = [
    {
      month: "January", 
      value: 0
    },
    {
      month: "February", 
      value: 1
    },
    {
      month: "March", 
      value: 2
    },
    {
      month: "April", 
      value: 3
    },
    {
      month: "May", 
      value: 4
    },
    {
      month: "June", 
      value: 5
    },
    {
      month: "July", 
      value: 6
    },
    {
      month: "August", 
      value: 7
    },
    {
      month: "September", 
      value: 8
    },
    {
      month: "October", 
      value: 9
    },
    {
      month: "November", 
      value: 10
    },
    {
      month: "December", 
      value: 11
    }
  ]
  
  return (
    <Dropdown>
      <Dropdown.Toggle 
        id="dropdown-basic"
        className="month-dropdown-button"
      >
        {selectedDate.toLocaleString("default", { month: "short" })}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {monthsArray.map((element, index) => 
          <Dropdown.Item 
            key={element.month} 
            className="dropdown-option" 
            onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), element.value, 1))}>{element.month}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MonthDropdownButton;