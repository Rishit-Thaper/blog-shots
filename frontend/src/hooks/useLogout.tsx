import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    logout();
  };

  return { handleLogout };
};