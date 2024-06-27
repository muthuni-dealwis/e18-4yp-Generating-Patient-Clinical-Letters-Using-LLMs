import React from "react";

interface Props {
  patient: string;
  setPatient: React.Dispatch<React.SetStateAction<string>>;
}

const PatientSearchBar: React.FC<Props> = ({ patient, setPatient }) => {
  const fetchData = async (value: string) => {
    const response = await fetch("http://127.0.0.1:8080/api/names");
    const json = await response.json();
    const results = json.names.filter(
      (name: string) =>
        value && name.toLowerCase().includes(value.trim().toLowerCase())
    );
    console.log(results);
  };

  const handleChange = (value: string) => {
    setPatient(value);
    fetchData(value);
  };

  return (
    <div className="patient-input flex flex-grow bg-slate-800 rounded-md mr-2">
      <label
        htmlFor="patientName"
        className="font-sans text-slate-300 text-sm px-4 my-auto"
      >
        Patient Name/No
      </label>
      <input
        type="text"
        id="patientName"
        className="patientName-input flex-grow"
        value={patient}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
        placeholder={patient ? "" : "type patient name or no..."} // Conditional placeholder
      />
    </div>
  );
};

export default PatientSearchBar;
