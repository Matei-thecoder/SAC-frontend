import { Code2, User } from "lucide-react";
import { Link, useLocation } from "react-router";

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export function Header({ isLoggedIn, onLogout }: HeaderProps) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Code2 className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-semibold">SAC</span>
        </Link>
        
        <nav className="flex items-center gap-8">
          <Link 
            to="/dashboard" 
            className={`text-lg font-medium transition-colors ${
              isActive('/dashboard') || location.pathname.startsWith('/problem')
                ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Problems
          </Link>
          <Link 
            to="/questions" 
            className={`text-lg font-medium transition-colors ${
              isActive('/questions') 
                ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            Grile
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isLoggedIn && (
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-2">
                  <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Settings
                  </Link>
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}