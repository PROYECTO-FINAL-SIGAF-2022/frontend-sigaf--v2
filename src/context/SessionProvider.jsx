import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionContext = createContext(null);

const SessionProvider = ({ children }) => {
  const navigate = useNavigate();

  const [session, setSession] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      setSession(token);
      navigate('/');
    } else {
      setSession(null);
      navigate('/auth');
    }
  }, []);

  const setNewSession = (token) => {
    setSession(token);
    window.localStorage.setItem('token', token);
  };

  return (
    <SessionContext.Provider value={[session, setNewSession]}>
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => useContext(SessionContext)[0];
const useSetSession = () => useContext(SessionContext)[1];

export { useSession, useSetSession };
export default SessionProvider;
