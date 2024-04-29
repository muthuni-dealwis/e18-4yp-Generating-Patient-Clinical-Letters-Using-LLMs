'use client'
import Image from "next/image";
import React, { useState, useEffect } from "react";
// import { useRouter } from 'next/router';
import Link from 'next/link';

// export default function Home(): React.FC<any> = (props) => {

const Home: React.FC<any> = (props) =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string, password?: string }>({});
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  // const router = useRouter();

  const [isFormValid, setIsFormValid] = useState(false); 

  // useEffect(() => { 
  //     validateForm(); 
  // }, [email, password]);


  const validateForm = () => { 
    
    let errors: any = {}; 

    if(isLoginClicked){
      if (!email) { 
        errors.email = 'Email is required.'; 
      } else if (!/\S+@\S+\.\S+/.test(email)) { 
          errors.email = 'Email is invalid.'; 
      } 

      if (!password) { 
          errors.password = 'Password is required.'; 
      } else if (password.length < 6) { 
          errors.password = 'Password must be at least 6 characters.'; 
      } 

      setErrors(errors); 
      setIsFormValid(Object.keys(errors).length === 0); 

    }
  }; 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    // validateForm();

    if(isFormValid){
      e.preventDefault();
      console.log("Email:", email);
      console.log("Password:", password);
      // Add your form submission logic here
    }
    else{
      console.log("Invalid Form");
    }
    
  };

  // const handleFormSwitch = () => {
  //   router.push('/register');
  // };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="auth-form-container">
        <label className="login-register-heading font-sans text-slate-200 font-medium mb-9 tracking-wider">Login</label>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="font-sans text-slate-200 font-normal mb-1">Email</label>
          <input
            className="h-9 bg-slate-300 opacity-95 rounded px-4 font-sans font-normal placeholder-gray-500 text-slate-800 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          {errors.email &&  <span className='text-danger'> {errors.email} </span>}

          <label htmlFor="password" className="font-sans text-slate-200 font-normal mb-1">Password</label>
          <input
            className="h-9 bg-slate-300 opacity-95 rounded px-4 font-sans font-normal placeholder-gray-500 text-slate-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          {errors.password && <span className='text-danger'> {errors.password} </span>}


          <Link href =  "/inputform">
            <button className="linkSubmit mt-10 bg-violet-500 font-sans font-medium text-white tracking-widest" type="submit">Login</button>
          </Link>
          
        </form>

        <Link href =  "/register">
          <button className="link-btn" onClick={() => setIsLoginClicked(true)}>Don't have an account? Register here.</button>
        </Link>
        
      </div>
    </main>
  );
}

export default Home;
