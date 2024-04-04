'use client'

import React, { useState } from "react";
import { TextField, Button} from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DataInputForm: React.FC<any> = (props) =>{

    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // setErrors(validation(name, email, password));
        console.log(email);
        // if(errors.name === "" && errors.email === "" && errors.password === ""){
        //     axios.post('http://localhost:8081/patient_clinical_letters', values)
        //     .then(result =>{
        //         console.log(result);
        //         navigate('/');

        //     })
        //     .catch(error => console.log(error));
        // }
    }

    const handleChange = () => {
        // setAge(event.target.value);
      };

    return(

        <div className="data-input-container">
            <div className="data-input-form">
                <h2 className="patient-data-form-heading">Patient Details</h2>

                <form className="patient-data-form" onSubmit={handleSubmit}>
                <Button style={{ marginRight: '10px' }} variant="contained" color="success">
                    Start
                </Button>

                <Button variant="contained" color="error">
                    Stop
                </Button>

                <div style={{ margin: '10px', height: '300px', width: '500px' }}>
                    <TextField
                        id="outlined-controlled"
                        label=""
                        value={name}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setName(event.target.value);
                        }}
                        fullWidth
                    />
                </div>
                
                </form>
            </div>

            <div className="data-input-form">
                <h2 className="patient-data-form-heading">Patient History</h2>
                <div style={{ margin: '20px', border: '1px solid #ccc', borderRadius: '5px', borderColor: '#176B87'}}>
                    <form className="patient-data-form" onSubmit={handleSubmit}>
                        <div style={{ margin: '10px' }}>
                            <TextField
                                id="outlined-controlled"
                                label="Patient Name/ No."
                                value={name}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setName(event.target.value);
                                }}
                                
                            />
                        </div>
                        
                        <div style={{ margin: '10px' }}>
                            <TextField
                                id="outlined-controlled"
                                label="Period"
                                value={name}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setName(event.target.value);
                                }}
                            />
                        </div>
                        
                        <div style={{ margin: '10px' }}>
                            <Button style={{ marginRight: '10px' }} variant="contained" >
                                Previous Diagnosis and Symptoms
                            </Button>
                        </div>
                    </form>
                </div>

                <div style={{ margin: '20px', border: '1px solid #ccc', borderRadius: '5px', padding: '25px' , borderColor: '#176B87'}}>
                    <TextField
                        id="outlined-controlled"
                        label="Letter Type"
                        value={name}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setName(event.target.value);
                        }}
                    />
                    <div style={{marginTop:'10px'}}>
                        <Button variant="contained">
                            Generate Clinical Letter
                        </Button>
                    </div>
                </div>
                

                {/* <DatePicker label="Basic date picker" /> */}

                {/* <div>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                        <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        // value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                    <MenuItem value="">
                            <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <FormHelperText>With label + helper text</FormHelperText>
                    </FormControl>

                </div> */}

                
            </div>
        </div>

        // <>
        // <div className="data-input-form">
        //     <h2  className="patient-data-form-heading">Patient Details</h2>

        //     <form className = "patient-data-form" onSubmit={handleSubmit}>
        //         <TextField>

        //         </TextField>
        //     </form>
        
        // </div>

        // <div className="data-input-form">
        //     <h2  className="patient-data-form-heading">Patient History</h2>

        //     <form className = "patient-data-form" onSubmit={handleSubmit}>
        //         <TextField>

        //         </TextField>
        //     </form>

        //  </div>
        // </>
    )
}

export default DataInputForm;