import './incrementdatebutton.css';
import { SelectedDateContext } from '../../SelectedDateContext';
import { useContext } from 'react';

export default function IncrementDateButton({ incrementYear=0, incrementMonth=0 }) {

  // Get selectedDate and setSelectedDate
  const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);
  
  return (
    <button 
      onClick={() => 
        setSelectedDate(
          new Date(
            selectedDate.getFullYear() + incrementYear, 
            selectedDate.getMonth() + incrementMonth, 
            1
          )
        )
      }>
      {incrementYear < 0 || incrementMonth < 0 ? `<` : `>`}
    </button>
  )
}