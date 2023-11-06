import { createContext, useReducer, useEffect, ReactNode } from "react";
import Profile from "../pages/Profile";

type Author = {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
};

type AuthContextType = {
  author: Author | null;
  login: (author: Author) => void;
  logout: () => void;
};

type Action = { type: "LOGIN"; payload: Author } | { type: "LOGOUT" };

type State = {
  author: Author | null;
};

const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return { author: action.payload || { id: "", name: "", email: "", token: "" } };
    case "LOGOUT":
      return { author: null };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    author: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user: Author = JSON.parse(storedUser);
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  const login = (author: Author) => {
    localStorage.setItem("user", JSON.stringify(author));
    dispatch({ type: "LOGIN", payload: author });
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ author: {...state.author}, login, logout}}>
      <Profile/>
    </AuthContext.Provider>
  );
};