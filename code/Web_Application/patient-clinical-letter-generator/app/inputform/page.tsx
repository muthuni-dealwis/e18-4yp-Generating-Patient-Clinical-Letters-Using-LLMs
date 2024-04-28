"use client";

import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";

// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DataInputForm: React.FC<any> = (props) => {
  const [patientname, setPatientname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState("");
  const [period, setPeriod] = useState("");
  const [lettertype, setLettertype] = useState("");
  // const [output, setOutput] = useState("");

  const [patient, setPatient] = useState("");
  const [micState, setMicState] = useState(true);
  const [genLetIsClicked, setGenLetIsClicked] = useState(false);
  const [voice2TextInput, setVoice2TextInput] = useState("");
  const [output, setOutput] = useState("");

  const handleNameChange = (event: any) => {
    setPatient(event.target.value);
  };

  const handleGenLetterClick = () => {
    setGenLetIsClicked(!genLetIsClicked);
  };

  useEffect(() => {
    // console.log("genLetIsClicked changed:", genLetIsClicked);
    setOutput(voice2TextInput);
  }, [genLetIsClicked]);

  const handleSubmit = () => {
    // e.preventDefault();
    console.log(email);

    setOutput("Loading");

    const msg =
      "patientname: " +
      patientname +
      "\nletterType: " +
      lettertype +
      "\nwrite a clinical letter for the above given cancer patient";

    axios
      .post("http://localhost:8080/api/chat", {
        prompt: msg,
      })
      .then((response) => {
        console.log(response.data); // Log the response from the server
        setOutput(response.data.patientName);
      })
      .catch((error) => {
        console.error(error); // Log any errors that occur
      });

    // fetch("http://localhost:8080/api/home")
    // .then((response) => response.json())
    // .then((data) => {
    //   setOutput(data.message);
    // });
  };

  const handleChange = () => {
    // setAge(event.target.value);
  };

  const msg =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate voluptatum consequatur magni hic in ipsa neque perspiciatis odit quod soluta consequuntur cum odio reprehenderit praesentium, optio, quia eligendi dignissimos porro. Veniam possimus magnam facere obcaecati fuga, iste temporibus quos necessitatibus ea doloribus velit dolores, rem molestias eaque saepe quis placeat!\n\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate voluptatum consequatur magni hic in ipsa neque perspiciatis odit quod soluta consequuntur cum odio reprehenderit praesentium, optio, quia eligendi dignissimos porro. Veniam possimus magnam facere obcaecati fuga, iste temporibus quos necessitatibus ea doloribus velit dolores, rem molestias eaque saepe quis placeat!";
  // const msg =
  //   "Dr. Smart\nDoctor's Surgery\nAustralia\n\nSpecialist Clinic\nAustralia\n\nDear Mr. Specialist,\n\nRe: Kevin Hall, 42 Wallaby Way, Sydney\n\nThank you for considering Kevin Hall, a 44-year-old gentleman, for consultation regarding his bone tumor.\n\nMr. Hall presents with a high-grade pleiomorphic leiomyosarcoma, specifically diagnosed as Leiomyosarcoma in the parascapular region.\n\nTreatment: Mr. Hall has undergone a combination of radiotherapy and surgery to address his condition.\n\nCurrent Medications:\nNone\n\nI have advised Mr. Hall regarding his treatment plan and its implications for his ongoing care.\n\nFurthermore, Mr. Hall has undergone investigations to assess his condition and fitness for further interventions, including [please insert relevant investigations].\n\nBased on these findings, I have determined Mr. Hall's current status and recommended course of action.\n\nI kindly request any further guidance or feedback regarding Mr. Hall's condition and treatment plan to ensure optimal management.\n\nRegards,\n\nDr. Smart\nSpecialist\n[Signature]\n[Date]";

  return (
    <div className="data-input-container box-border w-full h-screen flex flex-col px-7 md:px-16">
      <div className="menu-bar w-full h-16 text-white">menu-bar</div>
      <div className="flex flex-col md:flex-row h-full pb-7">
        <div className="box w-full md:w-1/2 h-full md:mr-4 flex flex-col">
          <div className="data-input-form mb-3 flex flex-col flex-grow h-4/5">
            <div className="font-sans text-lg font-medium tracking-wide ml-3 h-12">
              Patient Details
            </div>
            <div className="patient-identity flex w-full mb-7">
              <div className="patient-input flex flex-grow bg-slate-800 rounded-md">
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
                  onChange={handleNameChange}
                  placeholder={patient ? "" : "type patient name or no..."} // Conditional placeholder
                />
              </div>
              <Button
                style={{
                  marginLeft: "3px",
                  backgroundColor: "#f59e0b",
                  padding: 0,
                  textTransform: "capitalize",
                }}
                variant="contained"
                // color="success"
              >
                Search
              </Button>
            </div>
            <div className="voice2text-container relative flex-grow mb-4">
              {/* <div
                className="h-full overflow-auto font-sans font-medium text-sm text-slate-300 bg-slate-700 rounded-md px-4 py-7 text-justify"
                style={{ whiteSpace: "pre-line" }}
              >
                {msg}
              </div> */}
              <div className="relative h-full overflow-hidden font-sans font-medium text-sm text-slate-300 bg-slate-700 rounded-md">
                <textarea
                  className="absolute inset-0 w-full h-full bg-transparent px-4 py-7 text-justify resize-none"
                  style={{ whiteSpace: "pre-line" }}
                  value={voice2TextInput}
                  placeholder="Describe patient symptoms and diagnosis with his/her personal 
                  details ..."
                  onChange={(e) => setVoice2TextInput(e.target.value)}
                />
              </div>
              <div
                className={`controllers ${
                  micState ? "bg-green-500" : "bg-red-500"
                } w-14 h-10 rounded-2xl absolute flex justify-center items-center shadow-lg`}
                onClick={() => setMicState(!micState)}
              >
                {micState ? <MicIcon /> : <MicOffIcon />}
              </div>
              {/* <div
                className={`gen-letter bg-sky-500 w-fit h-10 px-5 rounded-2xl absolute flex justify-center items-center shadow-lg border border-sky-600 transition duration-300 ${
                  genLetIsClicked ? "transform scale-90" : ""
                }`}
                onClick={handleGenLetterClick}
              >
                Generate Patient Clinical Letter
              </div> */}
              <div
                className="gen-letter bg-sky-500 w-fit h-10 px-5 rounded-2xl absolute flex justify-center 
                items-center shadow-lg border border-sky-500 text-white font-sans font-medium hover:bg-sky-600 
                hover:text-white hover:border-sky-600 active:bg-sky-700 active:text-white active:border-sky-800"
                onClick={handleGenLetterClick}
              >
                Generate Patient Clinical Letter
              </div>
            </div>
          </div>
          <div className="data-input-form flex-grow flex-grow-0 h-1/5">
            <div className="font-sans text-lg font-medium tracking-wide ml-3 h-12">
              Patient History
            </div>
          </div>
        </div>
        <div className="box data-input-form flex flex-col w-full md:w-1/2 h-full">
          <div className="font-sans text-lg font-medium tracking-wide ml-3 h-12">
            Output
          </div>
          <div
            className="output-container overflow-auto font-sans font-medium text-sm text-slate-300 flex-grow bg-slate-800 rounded-md px-4 py-7 text-justify"
            style={{ whiteSpace: "pre-line" }}
          >
            {output}
          </div>
        </div>
      </div>

      {/* <div className="data-input-form">
        <h2 className="patient-data-form-heading">Patient Details</h2>

        <form className="patient-data-form">
          <Button
            style={{ marginRight: "10px" }}
            variant="contained"
            color="success"
          >
            Start
          </Button>

          <Button variant="contained" color="error">
            Stop
          </Button>

          <div style={{ margin: "10px", width: "500px" }}>
            <TextField
              id="outlined-controlled"
              label=""
              value={input}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setInput(event.target.value);
              }}
              fullWidth
              multiline
              rows={4}
            />
          </div>

          <div style={{ margin: "10px" }}>
            <TextField
              id="outlined-controlled"
              label="Patient Name/ No."
              value={patientname}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPatientname(event.target.value);
              }}
            />
          </div>

          <div style={{ margin: "10px" }}>
            <TextField
              id="outlined-controlled"
              label="Period"
              value={period}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPeriod(event.target.value);
              }}
            />
          </div>

          <div style={{ margin: "10px" }}>
            <Button style={{ marginRight: "10px" }} variant="contained">
              Previous Diagnosis and Symptoms
            </Button>
          </div>

          <div style={{ margin: "10px" }}>
            <TextField
              id="outlined-controlled"
              label="Letter Type"
              value={lettertype}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setLettertype(event.target.value);
              }}
            />
          </div>

          <div style={{ marginTop: "10px", marginLeft: "10px" }}>
            <Button variant="contained" onClick={handleSubmit}>
              Generate Clinical Letter
            </Button>
          </div>
        </form>
      </div>

      <div className="data-input-form">
        <h2 className="patient-data-form-heading">Output</h2>

        <div style={{ marginTop: "20px", paddingLeft: "5px", width: "580px" }}>
          <TextField
            id="outlined-controlled"
            label=""
            value={output}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInput(event.target.value);
            }}
            fullWidth
            multiline
            rows={10}
          />
        </div>
      </div> */}
    </div>
  );
};

export default DataInputForm;
