import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();
  const { setLogUser, setToken } = useAuth();

  useEffect(() => {
    localStorage.removeItem("token");
    setLogUser(null);
    setToken(null);
    navigate("/");
  }, []);
};

export default LogOut;
