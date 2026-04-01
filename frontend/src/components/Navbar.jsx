import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={() => navigate("/dashboard")}>
        Dashboard
      </button>

      <button onClick={() => navigate("/admin")}>
        Admin
      </button>

      <button onClick={logout} style={{ marginLeft: "10px" }}>
        Logout
      </button>
    </div>
  );
}