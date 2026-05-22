import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuthStore } from "../services/authService";
import {
  pageBackground,
  pageWrapper,
  formCard,
  formTitle,
  labelClass,
  inputClass,
  submitBtn,
  bodyText,
  secondaryBtn,
  errorClass,
} from "../styles/common";

function Login() {
  const [cred, setCred] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await login(cred);
      
      // Navigate based on role
      if (user.role === "AUTHOR") navigate("/author-dashboard");
      else navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={pageBackground}>
      <div className={`${pageWrapper} flex min-h-[calc(100vh-5rem)] items-center justify-center`}>
        <div className={formCard}>
          <div className="mb-8 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Welcome back</p>
            <h2 className={formTitle}>Login</h2>
            <p className={`${bodyText} mt-3`}>Sign in to continue reading and publishing.</p>
          </div>
          {error && <div className={`${errorClass} mb-4`}>{error}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                className={inputClass}
                onChange={(e) => setCred({ ...cred, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                className={inputClass}
                onChange={(e) => setCred({ ...cred, password: e.target.value })}
                required
              />
            </div>
            <button className={submitBtn}>Login</button>
          </form>
          <div className="mt-6 flex items-center justify-between gap-3 text-sm">
            <span className="text-slate-500">New here?</span>
            <Link to="/register" className={secondaryBtn}>
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;