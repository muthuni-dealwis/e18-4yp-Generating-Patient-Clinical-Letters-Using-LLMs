'use client'

import React, { useState } from "react";
import { TextField, Button } from '@mui/material';
import Link from 'next/link';

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
            <label className="login-register-heading font-sans text-slate-200 font-medium mb-9 tracking-wider">Register</label>

        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name" className="font-sans text-slate-200 font-normal mb-1">Full name</label>
            <input 
                className="h-9 bg-slate-300 opacity-95 rounded px-4 font-sans font-normal placeholder-gray-500 text-slate-800 mb-4"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                id="name" 
                placeholder="full Name"
                name="name" />
            {/* {errors.name && <span className='text-danger'> {errors.name} </span>} */}

            <label htmlFor="email" className="font-sans text-slate-200 font-normal mb-1">Email</label>
            <input 
                className="h-9 bg-slate-300 opacity-95 rounded px-4 font-sans font-normal placeholder-gray-500 text-slate-800 mb-4" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}type="email" 
                placeholder="youremail@gmail.com" 
                id="email" 
                name="email" />
            {/* {errors.email && <span className='text-danger'> {errors.email} </span>} */}

            <label htmlFor="password" className="font-sans text-slate-200 font-normal mb-1">Password</label>
            <input 
                className="h-9 bg-slate-300 opacity-95 rounded px-4 font-sans font-normal placeholder-gray-500 text-slate-800 mb-4"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                type="password" 
                placeholder="********" 
                id="password" 
                name="password" />
            {/* {errors.password && <span className='text-danger'> {errors.password} </span>} */}

            <Link href = "/">
                <button  className="linkSubmit mt-10 bg-violet-500 font-sans font-medium text-white tracking-widest" type="submit">Register</button>
            </Link>  
        </form>

        <Link href = "/">
            <button className="link-btn">Already have an account? Login here.</button>
        </Link>
        
    </div>
    )
}

export default RegisterPage;
