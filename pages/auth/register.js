import { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

export default function Register() {
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });
  const [status, setStatus] = useState('Normal');

  async function registerHandler(e) {
    e.preventDefault();

    setStatus('Loading');

    const registerReq = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!registerReq.ok) return setStatus('error ' + registerReq.status);

    const registerRes = await registerReq.json();

    setStatus('Success');

    Router.push('/auth/login');
  }

  function fieldHandler(e) {
    const name = e.target.getAttribute('name');

    setFields({
      ...fields,
      [name]: e.target.value,
    });
  }

  return (
    <div>
      <nav>
        <ul>
          <Link href="/auth/register">
            <a className={styles.nav}>Register</a>
          </Link>
          <Link href="/auth/login">
            <a className={styles.nav}>login</a>
          </Link>
          <Link href="/posts">
            <a className={styles.nav}>Posts</a>
          </Link>
        </ul>
      </nav>
      <h1>Register</h1>
      <form onSubmit={registerHandler.bind(this)}>
        <input
          name="email"
          onChange={fieldHandler.bind(this)}
          type="text"
          placeholder="Email"
        />
        <br />
        <input
          name="password"
          onChange={fieldHandler.bind(this)}
          type="password"
          placeholder="Password"
        />
        <br />
        <button type="submit">Register</button>
        <div>Output: {status}</div>
      </form>
    </div>
  );
}
