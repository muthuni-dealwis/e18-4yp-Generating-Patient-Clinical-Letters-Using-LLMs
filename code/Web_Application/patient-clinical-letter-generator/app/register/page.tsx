'use client'

import React, { useState } from "react";
import { TextField, Button } from '@mui/material';

const RegisterPage: React.FC<any> = (props) =>{

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

    return(
        <div className="auth-form-container">
            <h2  className="login-register-heading">Register</h2>

        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            {/* {errors.name && <span className='text-danger'> {errors.name} </span>} */}

            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            {/* {errors.email && <span className='text-danger'> {errors.email} </span>} */}

            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            {/* {errors.password && <span className='text-danger'> {errors.password} </span>} */}

            <button type="submit">Register</button>
        </form>
        <button className="link-btn">Already have an account? Login here.</button>
    </div>
    )
}

export default RegisterPage;

// 'use client'

// import React, { useState } from "react";
// // import { validation } from "./RegisterValidation";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// interface RegisterProps {
//     onFormSwitch: (path: string) => void;
// }

// export const Register = (props: RegisterProps) => {
    // const [name,setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [errors, setErrors] = useState({});
//     const navigate = useNavigate();

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     // setErrors(validation(name, email, password));
    //     console.log(email);
    //     // if(errors.name === "" && errors.email === "" && errors.password === ""){
    //     //     axios.post('http://localhost:8081/patient_clinical_letters', values)
    //     //     .then(result =>{
    //     //         console.log(result);
    //     //         navigate('/');

    //     //     })
    //     //     .catch(error => console.log(error));
    //     // }
    // }

//     return (
    //     <div className="auth-form-container">
    //         <h2>Register</h2>

    //     <form className="register-form" onSubmit={handleSubmit}>
    //         <label htmlFor="name">Full name</label>
    //         <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
    //         {/* {errors.name && <span className='text-danger'> {errors.name} </span>} */}

    //         <label htmlFor="email">email</label>
    //         <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
    //         {/* {errors.email && <span className='text-danger'> {errors.email} </span>} */}

    //         <label htmlFor="password">password</label>
    //         <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
    //         {/* {errors.password && <span className='text-danger'> {errors.password} </span>} */}

    //         <button type="submit">Register</button>
    //     </form>
    //     {/* <button className="link-btn" onClick={() => props.onFormSwitch('/')}>Already have an account? Login here.</button> */}
    // </div>
//     )
// }