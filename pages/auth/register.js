import { useState } from 'react';
import Router from 'next/router';

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;

  if (token) {
    return {
      redirect: {
        destination: '/posts',
        permanent: true,
      },
    };
  }
  return { props: {} };
}

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

    Router.push('/posts');
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
