import React, { useState } from 'react';
import Cookie from 'js-cookie';
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

export default function Login() {
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });
  const [status, setStatus] = useState('normal');

  async function loginHandler(e) {
    e.preventDefault();

    setStatus('loading');

    const loginReq = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    });

    if (!loginReq.ok) return setStatus('error ' + loginReq.status);

    const loginRes = await loginReq.json();

    setStatus('success');

    Cookie.set('token', loginRes.token);

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
      <h1>Login</h1>
      <form onSubmit={loginHandler.bind(this)}>
        <input
          onChange={fieldHandler.bind(this)}
          type="text"
          name="email"
          placeholder="Email"
        />
        <br />
        <input
          onChange={fieldHandler.bind(this)}
          type="password"
          name="password"
          placeholder="Password"
        />
        <br />
        <button type="submit">Login</button>
        <div>Status: {status}</div>
      </form>
    </div>
  );
}
