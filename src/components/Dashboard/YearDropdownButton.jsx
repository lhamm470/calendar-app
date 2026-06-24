import Dropdown from "react-bootstrap/Dropdown";
import { useState, useContext } from "react";
import "./yeardropdownbutton.css";
import { SelectedDateContext } from "../../SelectedDateContext";

function YearDropdownButton() {
  
  // Get selectedDate and setSelectedDate
  const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);
  
  const startYear = 2000;
  const endYear = 2050;
  let yearsArray = [];

  for (let i = startYear; i <= endYear; i++) {
    yearsArray.push(i);
  }

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" className="year-dropdown-button">
        {selectedDate.getFullYear()}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {yearsArray.map((year, index) => (
          <Dropdown.Item
            key={year}
            className="dropdown-option"
            onClick={() =>
              setSelectedDate(new Date(year, selectedDate.getMonth(), 1))
            }
          >
            {year}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default YearDropdownButton;
