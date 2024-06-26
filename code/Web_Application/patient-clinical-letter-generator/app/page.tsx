'use client'
import React from "react";
import Link from 'next/link';
import styles from './Home.module.css'; // Adjust the path as necessary

const Home: React.FC<any> = () => {
  return (
    <div className={styles.background}>
      <h1>Welcome to the Home Page</h1>
      <Link href="/login">
        Login
      </Link>
      <br />
      <Link href="/register">
        Register
      </Link>
    </div>
  );
};

export default Home;


