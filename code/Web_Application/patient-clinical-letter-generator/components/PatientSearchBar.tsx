import React from "react";

interface Props {
  searchBarInput: string;
  setSearchBarInput: React.Dispatch<React.SetStateAction<string>>;
  setPatientsSearched: React.Dispatch<React.SetStateAction<object>>;
  setSearchResultListOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const PatientSearchBar: React.FC<Props> = ({
  searchBarInput,
  setSearchBarInput,
  setPatientsSearched,
  setSearchResultListOpened,
}) => {
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
    setSearchBarInput(value);
    fetchData(value);
  };

  return (
    <div className="relative flex flex-grow rounded-r-md bg-slate-800 mr-2">
      <input
        type="text"
        id="patientName"
        className="bg-slate-200 patientName-input flex-grow rounded-md"
        value={searchBarInput}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
        onFocus={() => {
          setSearchResultListOpened(true);
        }}
        placeholder={searchBarInput ? "" : "type to search or add patient ..."} // Conditional placeholder
      />
    </div>
  );
};

export default PatientSearchBar;
