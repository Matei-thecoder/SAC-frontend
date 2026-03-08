import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ProblemsList } from "../components/ProblemsList";
import { useAuth } from "../context/AuthContext";

export function Home() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Header 
        isLoggedIn={isLoggedIn}
        onLogout={logout}
      />
      <Hero />
      <ProblemsList />
    </div>
  );
}