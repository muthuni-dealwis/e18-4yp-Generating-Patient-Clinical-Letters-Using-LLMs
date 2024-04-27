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
        <h1 className="login-register-heading">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />
          {errors.email &&  <span className='text-danger'> {errors.email} </span>}

          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          {errors.password && <span className='text-danger'> {errors.password} </span>}


          <Link href =  "/inputform">
            <button className="linkSubmit" type="submit">Log In</button>
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
