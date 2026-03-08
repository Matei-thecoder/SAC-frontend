import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "login" | "signup";
  onModeChange: (mode: "login" | "signup") => void;
  onSuccess?: () => void;
}

export function AuthModal({ open, onOpenChange, mode, onModeChange, onSuccess }: AuthModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    console.log(mode === "login" ? "Logging in..." : "Signing up...", formData);
    if (onSuccess) {
      onSuccess();
    }
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md z-50">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-2xl font-bold text-gray-900">
              {mode === "login" ? "Log In" : "Sign Up"}
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </Dialog.Close>
          </div>

          <Dialog.Description className="sr-only">
            {mode === "login" 
              ? "Log in to your account to access coding problems" 
              : "Create a new account to start practicing coding problems"}
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Enter your username"
                  required={mode === "signup"}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {mode === "login" ? "Log In" : "Sign Up"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => onModeChange("signup")}
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => onModeChange("login")}
                  className="text-blue-600 hover:underline"
                >
                  Log in
                </button>
              </>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}