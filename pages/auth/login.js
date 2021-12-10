import { useState } from 'react';

export default function Login() {
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });

  function loginHandler(e) {
    e.preventDefault();

    console.log(fields);
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
      </form>
    </div>
  );
}
