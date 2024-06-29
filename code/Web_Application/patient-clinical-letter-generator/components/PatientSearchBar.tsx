import React, { useState } from "react";

interface Props {
  setPatientsSearched: React.Dispatch<React.SetStateAction<string>>;
}

const PatientSearchBar: React.FC<Props> = ({ setPatientsSearched }) => {
  const [input, setInput] = useState("");

  const fetchData = async (value: string) => {
    const response = await fetch("http://localhost:8080/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: value,
      }),
    });

    const results = await response.json();
    setPatientsSearched(results);
  };

  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="relative flex flex-grow rounded-r-md bg-slate-800 mr-2">
      <input
        type="text"
        id="patientName"
        className="patientName-input flex-grow rounded-md"
        value={input}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
        placeholder={input ? "" : "type patient name or no..."} // Conditional placeholder
      />
    </div>
  );
};

export default PatientSearchBar;
