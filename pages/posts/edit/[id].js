import { useState } from 'react';
import Router from 'next/router';
import Nav from '../../../components/Nav';

export async function getServerSideProps({ req, query }) {
  const { token } = req.cookies;

  const { id } = query;

  const postReq = await fetch('http://localhost:3000/api/posts/detail/' + id, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  const res = await postReq.json();

  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return { props: { token, post: res.data } };
}

export default function PostEdit(props) {
  const { post } = props;

  const [fields, setFields] = useState({
    title: post.title,
    content: post.content,
  });
  const [status, setStatus] = useState('normal');

  async function updateHandler(e) {
    e.preventDefault();

    setStatus('loading');

    const { token } = props;

    const update = await fetch('/api/posts/update/' + post.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(fields),
    });

    if (!update.ok) return setStatus('error');

    const res = await update.json();

    setStatus('success');

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
      <Nav />
      <h1>update a Post </h1>
      <p>Post id : {post.id}</p>
      <form onSubmit={updateHandler.bind(this)}>
        <input
          onChange={fieldHandler.bind(this)}
          type="text"
          placeholder="Title"
          name="title"
          defaultValue={post.title}
        />
        <br />
        <textarea
          onChange={fieldHandler.bind(this)}
          placeholder="Content"
          name="content"
          defaultValue={post.content}
        ></textarea>
        <br />
        <button type="submit">Save changes</button>
        <div>Status: {status}</div>
      </form>
    </div>
  );
}
