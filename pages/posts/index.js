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

export default function PostIndex() {
  return (
    <div>
      <h1>Posts</h1>
    </div>
  );
}
