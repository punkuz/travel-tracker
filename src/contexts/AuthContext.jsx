import { createContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = {
  name: "punkuz",
  email: "punkuz@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    case "error":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}
function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    if(email !== FAKE_USER.email || password !== FAKE_USER.password) {
      dispatch({ type: "error", payload: "Invalid email or password" });
      return;
    }
    dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };