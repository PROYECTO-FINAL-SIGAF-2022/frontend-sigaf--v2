import { useState, useEffect } from 'react';
import { useSession, useSetSession } from "../context/SessionProvider";

export const useFetch = () => {
  const [configFetch, setConfigFetch] = useState({});
  const [fetchData, setFetchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const session = useSession();
  
  const sendFetchData = async () => {
    if (!configFetch.url) return;

    const { url, headersRequest } = configFetch;

    setLoading(true);
    //Pedimos los datos a la api
    headersRequest.headers = {
      Authorization: session,
      'Content-type': 'application/json; charset=UTF-8',
    };

    try {
      const response = await fetch(url, headersRequest);
      const data = await response.json();
      // console.log(data);
      if (!response.ok) {
        setLoading(false);
        setError(data);
        return;
      }
      setFetchData(data);
    } catch (error) {
      //Si hay un error ...
      console.error(error);
      setError(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    sendFetchData();
  }, [configFetch]);

  return { setConfigFetch, fetchData, loading, error };
};
