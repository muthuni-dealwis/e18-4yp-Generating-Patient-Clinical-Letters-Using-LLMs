'use client'
import Image from "next/image";
import React, { useState } from "react";
// import { useRouter } from 'next/router';

// export default function Home(): React.FC<any> = (props) => {

const Home: React.FC<any> = (props) =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  // const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Add your form submission logic here
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
          {/* {errors.email && <span className='text-danger'> {errors.email} </span>} */}
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
          {/* {errors.password && <span className='text-danger'> {errors.password} </span>} */}
          <button type="submit">Log In</button>
        </form>
        <button className="link-btn">Don't have an account? Register here.</button>
      </div>
    </main>
  );
}

export default Home;
