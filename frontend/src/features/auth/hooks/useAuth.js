import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, signUp, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await signUp({ username, email, password });
      setUser(data.user);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logout();
      setUser(null);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getAndSetUser();
  }, []);

  return { user, loading, handleSignUp, handleLogin, handleLogout };
};
