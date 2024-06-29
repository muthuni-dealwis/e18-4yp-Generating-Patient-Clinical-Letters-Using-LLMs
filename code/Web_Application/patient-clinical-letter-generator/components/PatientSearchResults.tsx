import React from "react";
import "./PatientSearchResults.css";
interface Props {
  patientsSearched: Record<number, string>;
}

const PatientSearchResults: React.FC<Props> = ({ patientsSearched }) => {
  if ("error" in patientsSearched) {
    return <></>;
  }

  return (
    <div
      className="search-result-container absolute w-full bg-slate-50 rounded-md top-full left-0 z-50 mt-2 mr-2"
      style={{
        width: `calc(100% - 0.5rem)`,
        boxShadow: "0px 0px 6px #a7a7a7",
      }}
    >
      <div
        className="search-results-list"
        style={{
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {Object.keys(patientsSearched).map((key) => (
          <div key={key} className="border-b-2 border-gray-200 py-2">
            {patientsSearched[parseInt(key, 10)]}
          </div>
        ))}
      </div>
      <div className="addPatient">add patient</div>
    </div>
  );
};

export default PatientSearchResults;
