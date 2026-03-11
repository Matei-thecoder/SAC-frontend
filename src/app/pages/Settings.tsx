import { useState } from "react";
import { Header } from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Lock, Bell, Palette } from "lucide-react";

export function Settings() {
  const { isLoggedIn, logout } = useAuth();
  const [profile, setProfile] = useState({
    username: "student_ac",
    email: "student@student.tuiasi.ro",
    fullName: "Ion Popescu",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    problemUpdates: true,
    newQuestions: false,
  });

  const [theme, setTheme] = useState("light");

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profil actualizat cu succes!");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Parolă schimbată cu succes!");
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        isLoggedIn={isLoggedIn}
        onLogout={logout}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Gestionează-ți contul și preferințele</p>
        </div>

        {/* Profile Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Profil</h2>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nume complet
              </label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Salvează Modificările
            </button>
          </form>
        </div>

        {/* Password Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Schimbă Parola</h2>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parola curentă
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Introdu parola curentă"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parola nouă
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Introdu parola nouă"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmă parola nouă
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Confirmă parola nouă"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Schimbă Parola
            </button>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Notificări</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">Notificări pe email</span>
              <input
                type="checkbox"
                checked={notifications.emailNotifications}
                onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">Actualizări probleme</span>
              <input
                type="checkbox"
                checked={notifications.problemUpdates}
                onChange={(e) => setNotifications({ ...notifications, problemUpdates: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700">Întrebări noi</span>
              <input
                type="checkbox"
                checked={notifications.newQuestions}
                onChange={(e) => setNotifications({ ...notifications, newQuestions: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
              />
            </label>
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Aspect</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer p-3 border-2 border-gray-200 rounded-lg hover:border-blue-400 transition-colors">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === "light"}
                onChange={(e) => setTheme(e.target.value)}
                className="w-5 h-5 text-blue-600"
              />
              <span className="text-gray-700">Tema Deschisă</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-3 border-2 border-gray-200 rounded-lg hover:border-blue-400 transition-colors">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === "dark"}
                onChange={(e) => setTheme(e.target.value)}
                className="w-5 h-5 text-blue-600"
              />
              <span className="text-gray-700">Tema Întunecată</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
