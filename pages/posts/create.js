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

  return { props: {} };
}

export default function PostCreate() {
  return (
    <div>
      <h1>Create a Post </h1>

      <form>
        <input type="text" placeholder="Title" name="title" />
        <br />
        <textarea placeholder="Content" name="content"></textarea>
        <br />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
