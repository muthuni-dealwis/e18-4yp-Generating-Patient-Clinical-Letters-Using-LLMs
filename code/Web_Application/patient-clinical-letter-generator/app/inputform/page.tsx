'use client'

import React, { useState, useEffect } from "react";
import { TextField, Button} from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from "axios";

// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DataInputForm: React.FC<any> = (props) =>{

    const [patientname,setPatientname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [input,setInput] = useState('');
    const [period,setPeriod] = useState('');
    const [lettertype,setLettertype] = useState('');
    const [output, setOutput] = useState("");

    const handleSubmit = () => {
        // e.preventDefault();
        console.log(email);
       
        setOutput("Loading");

        axios.post('http://localhost:8080/api/home', {
            patientName: patientname,
            email: email,
            period: period,
            letterType: lettertype
        })
        .then(response => {
            console.log(response.data); // Log the response from the server
            setOutput(response.data.patientName);
        })
        .catch(error => {
            console.error(error); // Log any errors that occur
        });

        // fetch("http://localhost:8080/api/home")
        // .then((response) => response.json())
        // .then((data) => {
        //   setOutput(data.message);
        // });
    }

    const handleChange = () => {
        // setAge(event.target.value);
      };

    return(

        <div className="data-input-container">
            <div className="data-input-form">
                <h2 className="patient-data-form-heading">Patient Details</h2>

                <form className="patient-data-form">
                    <Button style={{ marginRight: '10px' }} variant="contained" color="success">
                        Start
                    </Button>

                    <Button variant="contained" color="error">
                        Stop
                    </Button>

                    <div style={{ margin: '10px',width: '500px' }}>
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

                    <div style={{ margin: '10px' }}>
                        <TextField
                            id="outlined-controlled"
                            label="Patient Name/ No."
                            value={patientname}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPatientname(event.target.value);
                            }}
                                    
                        />
                    </div>

                    <div style={{ margin: '10px' }}>
                        <TextField
                            id="outlined-controlled"
                            label="Period"
                            value={period}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPeriod(event.target.value);
                            }}
                        />
                    </div>

                    <div style={{ margin: '10px' }}>
                        <Button style={{ marginRight: '10px' }} variant="contained" >
                            Previous Diagnosis and Symptoms
                        </Button>
                    </div>

                    <div style={{ margin: '10px' }}>
                        <TextField
                            id="outlined-controlled"
                            label="Letter Type"
                            value={lettertype}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setLettertype(event.target.value);
                            }}
                        />
                    </div>

                    <div style={{marginTop:'10px',marginLeft: '10px'}}>
                    <Button variant="contained" onClick={handleSubmit}>
                        Generate Clinical Letter
                    </Button>
                    </div>            
                </form>
            </div>

            <div className="data-input-form">
                <h2 className="patient-data-form-heading">Output</h2>

                <div style={{ marginTop: '20px',paddingLeft: '5px', width: '580px' }}>
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
            </div>
        </div>

    )
}

export default DataInputForm;