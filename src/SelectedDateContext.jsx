import { createContext, useState } from 'react';

export const SelectedDateContext = createContext({
  selectedDate: new Date(),
  setSelectedDate: () => {},
});

export const SelectedDateProvider = ({ children }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTime = today.getTime();
  const [selectedDate, setSelectedDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  return (
    <SelectedDateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </SelectedDateContext.Provider>
  );
}