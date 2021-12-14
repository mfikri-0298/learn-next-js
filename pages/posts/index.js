export async function getServerSideProps({ req }) {
  const { token } = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const postReq = await fetch('http://localhost:3000/api/posts', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  const posts = await postReq.json();

  console.log(posts);

  return { props: { posts: posts.data } };
}

export default function PostIndex(props) {
  console.log(props);
  return (
    <div>
      <h1>Posts</h1>
      {props.posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
