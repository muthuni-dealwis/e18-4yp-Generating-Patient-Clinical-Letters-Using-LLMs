import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyDatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="data-time-show bg-slate-500 h-fit px-5 py-1 rounded-2xl">
      <label className="text-white">Date: </label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        className="custom-datepicker bg-slate-500 text-white rounded px-2 py-1"
      />
    </div>
  );
};

export default MyDatePicker;
