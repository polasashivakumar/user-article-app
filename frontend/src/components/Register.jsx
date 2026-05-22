import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../services/api";
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

function Register() {
  const [user, setUser] = useState({ firstName: "", email: "", password: "", role: "USER" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const url = user.role === "USER" ? "/user-api/users" : "/author-api/users";
      await axios.post(`${API_BASE_URL}${url}`, user);
      alert("Registered Successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={pageBackground}>
      <div className={`${pageWrapper} flex min-h-[calc(100vh-5rem)] items-center justify-center`}>
        <div className={formCard}>
          <div className="mb-8 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Create account</p>
            <h2 className={formTitle}>Register</h2>
            <p className={`${bodyText} mt-3`}>Set up your profile to read, write, and manage articles.</p>
          </div>
          {error && <div className={`${errorClass} mb-4`}>{error}</div>}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className={labelClass}>First Name</label>
              <input
                type="text"
                className={inputClass}
                value={user.firstName}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                className={inputClass}
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                className={inputClass}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Role</label>
              <select
                className={inputClass}
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="USER">User</option>
                <option value="AUTHOR">Author</option>
              </select>
            </div>
            <button className={submitBtn}>Register</button>
          </form>
          <div className="mt-6 flex items-center justify-between gap-3 text-sm">
            <span className="text-slate-500">Already have an account?</span>
            <Link to="/login" className={secondaryBtn}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;