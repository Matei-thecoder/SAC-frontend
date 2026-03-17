import { useEffect } from "react";
import { Header } from "../components/Header";
import { ProblemsList } from "../components/ProblemsList";
import { useAuth } from "../context/AuthContext";

export function Dashboard() {
  const { isLoggedIn, logout, username, getUser, token } = useAuth();
  
  useEffect(() => {
    if (isLoggedIn && token) {
      getUser();
    }
  }, [isLoggedIn, token, getUser]);
  
  return (
    <div className="min-h-screen bg-white">
      <Header 
        isLoggedIn={isLoggedIn}
        onLogout={logout}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {username || "User"}
          </h1>
          <p className="text-gray-600">Select a problem to start practicing for your AC exams</p>
        </div>
        
        <ProblemsList />
      </div>
    </div>
  );
}