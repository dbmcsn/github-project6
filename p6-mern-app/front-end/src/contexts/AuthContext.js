import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [logUser, setLogUser] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      axios
        .post("http://localhost:8888/api/users/check-login", {
          token: token,
        })
        .then((res) => {
          console.log(res.data.success);
          if (!res.data.success) {
            setToken(null);
            setLogUser(null);
          } else {
            setLogUser(res.data.userInfo);
            console.log(res.data);
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const value = { logUser, setLogUser, token, setToken };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
