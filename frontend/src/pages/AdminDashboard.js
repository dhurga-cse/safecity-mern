import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [citizens, setCitizens] = useState([]);
  const [police, setPolice] = useState([]);
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔐 PROTECT ADMIN DASHBOARD
  useEffect(() => {
    if (!token || role !== "admin") {
      alert("Access denied");
      navigate("/login");
      return;
    }

    fetchAll();
  }, []);

  // 🔄 FETCH EVERYTHING
  const fetchAll = async () => {
    try {
      await Promise.all([
        fetchCitizens(),
        fetchPolice(),
        fetchCrimes(),
      ]);
    } catch (err) {
      alert("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  const fetchCitizens = async () => {
    const res = await fetch("http://localhost:8000/api/admin/citizens", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCitizens(data);
  };

  const fetchPolice = async () => {
    const res = await fetch("http://localhost:8000/api/admin/police", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPolice(data);
  };

  const fetchCrimes = async () => {
    const res = await fetch("http://localhost:8000/api/admin/crimes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCrimes(data);
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading admin data...</p>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* CITIZENS */}
      <h3>Citizens</h3>
      {citizens.length === 0 ? (
        <p>No citizens found</p>
      ) : (
        <ul>
          {citizens.map((c) => (
            <li key={c._id}>
              {c.name} – {c.email}
            </li>
          ))}
        </ul>
      )}

      {/* POLICE */}
      <h3>Police</h3>
      {police.length === 0 ? (
        <p>No police found</p>
      ) : (
        <ul>
          {police.map((p) => (
            <li key={p._id}>
              {p.name} – {p.email}
            </li>
          ))}
        </ul>
      )}

      {/* CRIMES */}
      <h3>Crime Reports</h3>
      {crimes.length === 0 ? (
        <p>No crime reports</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Citizen</th>
              <th>Crime</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {crimes.map((crime) => (
              <tr key={crime._id}>
                <td>{crime.user?.name || "Unknown"}</td>
                <td>{crime.crimeType}</td>
                <td>{crime.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
