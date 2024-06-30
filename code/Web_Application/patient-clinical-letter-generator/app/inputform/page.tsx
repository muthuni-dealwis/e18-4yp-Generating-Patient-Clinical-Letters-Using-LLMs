"use client";

import React, { useState, useEffect } from "react";
import { TextField, Button, useRadioGroup } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import PrintIcon from "@mui/icons-material/Print";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CleaningServicesRoundedIcon from "@mui/icons-material/CleaningServicesRounded";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";
import Link from "next/link";
import MyDatePicker from "@/components/DatePicker";

// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { jsPDF } from "jspdf";

import LetterTypeSelect from "@/components/LetterTypeSelect";
import PatientSearchBar from "@/components/PatientSearchBar";

import "./loadIcon.css";
import "./inputForm.css";
import PatientSearchResults from "@/components/PatientSearchResults";

const DataInputForm: React.FC<any> = (props) => {
  const [patientname, setPatientname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState("");
  const [period, setPeriod] = useState("");

  const [micState, setMicState] = useState(true);
  // const [genLetIsClicked, setGenLetIsClicked] = useState(false);
  const [voice2TextInput, setVoice2TextInput] = useState("");
  const [output, setOutput] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipMsg, setTooltipMsg] = useState("");
  const [outputEditable, setOutputEditable] = useState(false);

  const [searchBarInput, setSearchBarInput] = useState("");
  const [letterType, setLetterType] = useState("Discharge");
  const [patientsSearched, setPatientsSearched] = useState({});
  const [searchResultListOpened, setSearchResultListOpened] = useState(false);

  // useEffect(() => {
  //   console.log(searchBarInput);
  // }, [searchBarInput]);

  // const handleGenLetterClick = async (voice2TextInput: string) => {
  //   try {
  //     setOutput("Loading ...");
  //     const response = await fetch("http://localhost:8080/api/chat", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ prompt: voice2TextInput }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to send message");
  //     }

  //     const responseData = await response.json();
  //     setOutput(responseData.response);
  //     setText(responseData.response);

  //     console.log("Message sent successfully");
  //   } catch (error) {
  //     console.error("Error:", error);
  //     setOutput("Error occured! Try again");
  //   }
  // };

  const handleGenLetterClick = async (voice2TextInput: string) => {
    try {
      setLoading(true);
      setOutput("");
      const response = await fetch("http://localhost:5050/api/generate", {
        //ollama serve api
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "phi3-ft", //set ollama model
          prompt: voice2TextInput,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to send message");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let result = "";
      let firstWordShown = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });

        const lines = result.split("\n");
        result = lines.pop() || "";

        for (const line of lines) {
          if (line) {
            const parsed = JSON.parse(line);
            if (parsed.done) break;
            if (!firstWordShown) {
              setLoading(false);
              firstWordShown = true;
            }
            setOutput((prev) => prev + parsed.response);
          }
        }
      }

      if (!firstWordShown) {
        setLoading(false);
      }

      setOutput((prev) => prev + result);
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setOutput("Error occured! Try again");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "Enter") {
        if (voice2TextInput) {
          handleGenLetterClick(voice2TextInput);
        } else {
          alert("please enter patient deatails first!");
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [voice2TextInput, handleGenLetterClick]);

  const downloadClinicalLetter = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxLineWidth = pageWidth - margin * 2;
    const lineHeight = 10;

    // Split the text into lines that fit within the page width
    const splitText = doc.splitTextToSize(output, maxLineWidth);
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

    doc.save("generated.pdf");
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(output)
      .then(() => {
        setTooltipMsg("Copied!");
        setTooltipOpen(true);
        setTimeout(() => setTooltipOpen(false), 2000); // Hide tooltip after 2 seconds
      })
      .catch((err) => {
        setTooltipMsg("Error Copying!");
        setTooltipOpen(true);
        setTimeout(() => setTooltipOpen(false), 2000);
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="data-input-container box-border w-full h-screen flex flex-col px-7 md:px-16 py-2">
      <div className="menu-bar w-full px-1 h-16 text-white flex flex-row place-content-between pt-2 mb-3">
        <div>
          <MyDatePicker />
        </div>
        <div className="right-menu-items h-fit w-fit flex flex-row">
          <div className="user-name bg-slate-500 px-5 py-1 rounded-md mr-5">
            Settings
          </div>
          <Link href="/">
            <div className="user-name bg-slate-500 px-5 py-1 rounded-md">
              Logout
            </div>
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
              <label
                htmlFor="patientName"
                className="flex items-center rounded-l-md font-sans text-slate-300 text-sm px-4 my-auto bg-slate-800 h-full"
              >
                Patient Name/No
              </label>
              <div className="search-bar-container relative flex flex-grow flex-col">
                <PatientSearchBar
                  searchBarInput={searchBarInput}
                  setSearchBarInput={setSearchBarInput}
                  setPatientsSearched={setPatientsSearched}
                  setSearchResultListOpened={setSearchResultListOpened}
                />
                {searchResultListOpened ? (
                  <>
                    <PatientSearchResults
                      patientsSearched={patientsSearched}
                      setPatientsSearched={setPatientsSearched}
                      setSearchResultListOpened={setSearchResultListOpened}
                      setSearchBarInput={setSearchBarInput}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
              <LetterTypeSelect
                letterType={letterType}
                setLetterType={setLetterType}
              />
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
                <AutoFixHighRoundedIcon className="mr-1 text-lg" />
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
              {/* <LetterTypeSelect /> */}
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
              {loading ? (
                <>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="lds-facebook">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <textarea
                    className="output-textarea absolute inset-0 w-full h-full bg-transparent px-4 py-7 text-justify resize-none"
                    style={{ whiteSpace: "pre-line" }}
                    value={output}
                    placeholder="Here is your output will be shown ..."
                    onChange={(e) => setOutput(e.target.value)}
                    disabled={!outputEditable}
                  />
                </>
              )}
            </div>
            <div className="output-controllers absolute flex flex-row">
              <div
                className={`${
                  outputEditable ? "w-32 px-3" : "w-10"
                } bg-red-500 h-9 rounded-2xl flex justify-center items-center shadow-lg border 
                border-red-500 text-white font-sans font-medium hover:bg-red-600 hover:text-white hover:border-red-600 
                active:bg-red-700 active:text-white active:border-red-800 mr-1 transition-all duration-300 ease-in-out`}
                onClick={() => {
                  setOutputEditable((prevState) => !prevState);
                }}
              >
                <DriveFileRenameOutlineRoundedIcon style={{ fontSize: 20 }} />
                {outputEditable ? (
                  <label className="text-sm ml-2 transition-opacity duration-300 ease-in-out opacity-100">
                    Edit mode
                  </label>
                ) : (
                  <label className="text-sm ml-2 transition-opacity duration-300 ease-in-out opacity-0 absolute">
                    Edit mode
                  </label>
                )}
              </div>

              <Tooltip title={tooltipMsg} open={tooltipOpen} arrow>
                <div
                  className="bg-green-500 w-10 h-9 rounded-2xl flex justify-center items-center shadow-lg border 
                  border-green-500 text-white font-sans font-medium hover:bg-green-600 hover:text-white hover:border-green-600 
                  active:bg-green-700 active:text-white active:border-green-800 mr-1"
                  onClick={handleCopyToClipboard}
                >
                  <ContentCopyRoundedIcon style={{ fontSize: 19 }} />
                </div>
              </Tooltip>

              <div
                className="bg-blue-500 w-10 h-9 rounded-2xl flex justify-center items-center shadow-lg border 
                border-blue-500 text-white font-sans font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 
                active:bg-blue-700 active:text-white active:border-blue-800 mr-1"
                onClick={() => {
                  setOutput("");
                }}
              >
                <CleaningServicesRoundedIcon style={{ fontSize: 19 }} />
              </div>

              <div
                className="bg-purple-500 w-10 h-9 rounded-2xl flex justify-center items-center shadow-lg border 
                border-purple-500 text-white font-sans font-medium hover:bg-purple-600 hover:text-white hover:border-purple-600 
                active:bg-purple-700 active:text-white active:border-purple-800"
                onClick={() => downloadClinicalLetter()}
              >
                <PrintIcon style={{ fontSize: 19 }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataInputForm;
