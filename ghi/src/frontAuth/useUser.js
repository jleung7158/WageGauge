import { useEffect, useState } from "react";

const useUser = (token) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`${"host_url"}/token`, {
        // credentials: 'include',
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      const result = await res.json();
      setUser(result.account);

      if (token) {
        getUser();
      }
    };
  }, [token]);

  return user;
};
// import useUser to App.js
// pass down to component as prop user={user}
// in index.js use a AuthProvider component with baseUrl={host_url}
// import useToken from galvanize jwtdown
// const {token, register, login} = useToken(); also can logout
function Component() {
  const token = null;
  const { user } = useUser(token);
}

export default useUser;
