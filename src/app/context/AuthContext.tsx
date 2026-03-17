import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  signup: (email: string, username: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  getUser: () => void;
  getQuestions: () => Promise<{ id: number; question: string; options: string[]; correct_answer: number; explanation?: string; category: string }[]>;
  token: string | null;
  username: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const storedToken = localStorage.getItem("token");
  const storedUsername = localStorage.getItem("username");

  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  const [token, setToken] = useState<string | null>(storedToken);
  const [username, setUsername] = useState<string | null>(storedUsername);

  const signup = (email: string, username: string, password: string) => {
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User created") {
          console.log("Signup successful. Please log in.");
          // User needs to use the login modal
        }
      })
      .catch((error) => console.error("Signup error:", error));
  };

  const login = (email: string, password: string) => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Login successful" && data.token) {
          setToken(data.token);
          setUsername(data.username ?? null);
          setIsLoggedIn(true);

          localStorage.setItem("token", data.token);
          if (data.username) localStorage.setItem("username", data.username);
        }
      })
      .catch((error) => console.error("Login error:", error));
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  const getUser = () => {
    fetch("http://localhost:3000/protected", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user.username && data.user.email) {
          setUsername(data.user.username);
          console.log("User data retrieved successfully");
        }
      })
      .catch((error) => console.error("Get user error:", error));
  };

  const getQuestions = async (): Promise<{ id: number; question: string; options: string[]; correct_answer: number; explanation?: string; category: string }[]> => {
    try {
      const response = await fetch("http://localhost:3000/protected/questions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.message === "Questions retrieved successfully") {
        console.log("Questions:", data.questions);
        return data.questions;
      }
      return [];
    } catch (error) {
      console.error("Get questions error:", error);
      return [];
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, signup, login, logout, token, username, getUser, getQuestions }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}