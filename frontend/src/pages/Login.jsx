import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post("/auth/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });

      const token = response.data.access_token;
      localStorage.setItem("token", token);

      const userResponse = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const user = userResponse.data;
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role_name === "Admin") navigate("/admin");
      else if (user.role_name === "Student") navigate("/student");
      else if (user.role_name === "Teacher") navigate("/teacher");
      else if (user.role_name === "Staff") navigate("/staff");
      else setError("Invalid role");
    } catch (err) {
      setError("Incorrect email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 py-8">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">
        
        {/* LEFT PANEL */}
        <div className="hidden md:flex bg-slate-900 text-white p-12 pb-6 flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-2xl">🛡️</div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">RBAC Portal</h1>
                <p className="text-sm text-slate-400 mt-1">Role Based Access Management</p>
              </div>
            </div>
            <div className="h-px bg-white/10 mb-8"></div>
            <p className="text-slate-300 leading-relaxed text-lg max-w-md">
              A secure access management platform designed to simplify authentication, permissions and role-based workflows.
            </p>
            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">✓</div>
                <div>
                  <p className="font-medium">Secure Authentication</p>
                  <p className="text-sm text-slate-400">Protected user access</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">✓</div>
                <div>
                  <p className="font-medium">Role Based Permissions</p>
                  <p className="text-sm text-slate-400">Controlled system access</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">✓</div>
                <div>
                  <p className="font-medium">Centralized Management</p>
                  <p className="text-sm text-slate-400">Manage users and roles</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-8 sm:p-10 md:p-14">
          {/* MOBILE HEADER */}
          <div className="md:hidden mb-8 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xl">🛡️</div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">RBAC Portal</h1>
              <p className="text-xs text-gray-500">Access Management System</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-500">Sign in to continue to your dashboard</p>
          </div>

          {error && <div className="mb-5 rounded-lg bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm">{error}</div>}

          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="mt-2 mb-6 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />

          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative mt-2 mb-8 w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full rounded-lg border border-gray-300 pl-4 pr-12 py-3 text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 outline-none"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-lg bg-slate-900 py-3 text-white font-medium transition hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-sm text-gray-400 mt-8">© 2026 RBAC Management System</p>
        </div>

      </div>
    </div>
  );
}

export default Login;