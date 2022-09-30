import { useEffect, useState } from "react";

import { getUserFromToken } from "../utils/getUser";

const useGetUser = (token) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (token) {
      getUserFromToken(token)
        .then(user => {
          setUser(user);
        })
        .then(error => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return {
    user,
    isLoading,
    error
  };
};

export default useGetUser;
