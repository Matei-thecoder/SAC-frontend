import { Code2 } from "lucide-react";
import { Link, useNavigate } from "react-router";

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export function Header({ isLoggedIn, onLogout }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Code2 className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-semibold">SAC</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#problems" className="text-gray-700 hover:text-blue-600 transition-colors">
            Problems
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
            Discuss
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
            Contest
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              Log Out
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}