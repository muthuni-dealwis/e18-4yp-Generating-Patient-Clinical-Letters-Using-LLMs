"use client";

import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";
import Link from 'next/link';
import MyDatePicker from "@/components/DatePicker";

// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import LetterTypeSelect from "../../components/LetterTypeSelect";
import { jsPDF } from 'jspdf';

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
  // const [genLetIsClicked, setGenLetIsClicked] = useState(false);
  const [voice2TextInput, setVoice2TextInput] = useState("");
  const [output, setOutput] = useState("");
  const [text, setText] = useState('');

  const handleNameChange = (event: any) => {
    setPatient(event.target.value);
  };

  const handleGenLetterClick = async (voice2TextInput: string) => {
    try {
      setOutput("Loading ...");
      const response = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: voice2TextInput }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const responseData = await response.json();
      setOutput(responseData.response);
      setText(responseData.response);

      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error:", error);
      setOutput("Error occured! Try again");
    }
  };

  const downloadClinicalLetter = ()=>{
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxLineWidth = pageWidth - margin * 2;
    const lineHeight = 10;

    // Split the text into lines that fit within the page width
    const splitText = doc.splitTextToSize(text, maxLineWidth);
    let cursorY = margin;

    splitText.forEach((line: string | string[]) => {
      doc.text(line, margin, cursorY);
      cursorY += lineHeight;

      // Add new page if the current page is filled
      if (cursorY > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        cursorY = margin;
      }
    });

    doc.save('generated.pdf');
  }

  const handleSubmit = () => {
    console.log(email);

    setOutput("Loading");
  };

  const handleChange = () => {
    // setAge(event.target.value);
  };

  return (
    <div className="data-input-container box-border w-full h-screen flex flex-col px-7 md:px-16 py-2">
      <div className="menu-bar w-full px-1 h-16 text-white flex flex-row place-content-between pt-2 mb-3">
        <div><MyDatePicker /></div>
        <div className="right-menu-items h-fit w-fit flex flex-row">
          <div className="user-name bg-slate-500 px-5 py-1 rounded-md mr-5">Settings</div>
          <Link href = "/">
            <div className="user-name bg-slate-500 px-5 py-1 rounded-md">Logout</div>
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row h-full pb-7">
        <div className="box w-full md:w-1/2 h-full md:mr-4 flex flex-col">
          <div className="data-input-form mb-3 flex flex-col flex-grow h-4/5">
            <div className="font-sans text-lg font-medium tracking-wide ml-3 h-12">
              Patient Details
            </div>
            <div className="patient-identity flex w-full mb-7">
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
                  onChange={handleNameChange}
                  placeholder={patient ? "" : "type patient name or no..."} // Conditional placeholder
                />
              </div>
              <LetterTypeSelect />
            </div>
            <div className="voice2text-container relative flex-grow mb-4">
              <div className="relative h-full overflow-hidden font-sans font-medium text-sm text-slate-300 bg-slate-700 rounded-md">
                <textarea
                  className="absolute inset-0 w-full h-full bg-transparent px-4 py-7 text-justify resize-none"
                  style={{ whiteSpace: "pre-line" }}
                  value={voice2TextInput}
                  placeholder="Describe patient disease, symptoms, diagnosis and treatment..."
                  onChange={(e) => setVoice2TextInput(e.target.value)}
                />
              </div>
              <div className="voice2text-controllers absolute flex flex-row">
                <div
                  className={`${
                    micState ? "bg-green-500" : "bg-red-500"
                  } w-14 h-10 rounded-2xl flex justify-center items-center shadow-lg`}
                  onClick={() => setMicState(!micState)}
                >
                  {micState ? <MicIcon /> : <MicOffIcon />}
                </div>
              </div>
              <div
                className="gen-letter bg-sky-500 w-fit h-8 px-5 rounded-2xl absolute flex justify-center 
                items-center shadow-lg border border-sky-500 text-white font-sans font-medium hover:bg-sky-600 
                hover:text-white hover:border-sky-600 active:bg-sky-700 active:text-white active:border-sky-800"
                onClick={() => handleGenLetterClick(voice2TextInput)}
              >
                <label>Generate Patient Clinical Letter</label>
              </div>
            </div>
          </div>
          <div className="data-input-form flex flex-grow flex-grow-0 flex-col h-1/5">
            <div className="font-sans text-lg font-medium tracking-wide ml-3 h-12">
              Patient History
            </div>
            <div className="period-select flex-glow bg-slate-500 w-full h-full flex items-center justify-center rounded-md py-5">
              <label className="font-sans font-medium tracking-wide pr-5">
                Period
              </label>
              <LetterTypeSelect />
              <Button
                style={{
                  marginLeft: "8px",
                  backgroundColor: "#f59e0b",
                  padding: "0 10px",
                  textTransform: "capitalize",
                }}
                variant="contained"
              >
                Previous Diagnosis and Symptoms
              </Button>
            </div>
          </div>
        </div>
        <div className="box data-input-form flex flex-col w-full md:w-1/2 h-full">
          <div className="font-sans text-lg font-medium tracking-wide ml-3 h-12">
            Output
          </div>
          <div className="output-container relative flex-grow">
            <div className="relative h-full overflow-hidden font-sans font-medium text-sm text-slate-300 bg-slate-800 rounded-md">
              <textarea
                className="absolute inset-0 w-full h-full bg-transparent px-4 py-7 text-justify resize-none"
                style={{ whiteSpace: "pre-line" }}
                value={output}
                placeholder="Here is your output will be shown ..."
                onChange={(e) => setOutput(e.target.value)}
                disabled
              />
            </div>
            <div
                className="gen-letter bg-sky-500 w-fit h-8 px-5 rounded-2xl absolute flex justify-center 
                items-center shadow-lg border border-sky-500 text-white font-sans font-medium hover:bg-sky-600 
                hover:text-white hover:border-sky-600 active:bg-sky-700 active:text-white active:border-sky-800"
                onClick={() => downloadClinicalLetter()}
              >
                <label>Download Letter</label>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataInputForm;
