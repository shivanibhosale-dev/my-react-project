import { createContext, useState ,useContext} from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function signUp(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.email === email)) {
      return {
        success: false,
        error: "Email already exists",
      };
    }

    const newUser = {
      email,
      password,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    setUser(newUser);

    return {
      success: true,
      user: newUser,
    };
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    setUser(foundUser);

    return {
      success: true,
      user: foundUser,
    };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signUp, user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  const context=useContext(AuthContext);
  return context;
}
