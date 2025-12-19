// src/pages/PoliceDashboard.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PoliceDashboard.css";

function PoliceDashboard() {
  const navigate = useNavigate();
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token || role !== "police") {
      alert("Access denied");
      navigate("/login");
      return;
    }

    fetchCrimes();
  }, [navigate]);

  const fetchCrimes = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/crimes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to fetch crimes");
        return;
      }

      setCrimes(data);
    } catch (error) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/crimes/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to update status");
        return;
      }

      fetchCrimes(); // refresh list
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="police-dashboard">
      <h2>Police Dashboard</h2>

      {loading ? (
        <p>Loading...</p>
      ) : crimes.length === 0 ? (
        <p>No crime reports found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Citizen</th>
              <th>Crime</th>
              <th>Description</th>
              <th>Location</th>
              <th>Date</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {crimes.map((crime) => (
              <tr key={crime._id}>
                <td>
                  {crime.user?.name} <br />
                  <small>{crime.user?.email}</small>
                </td>
                <td>{crime.crimeType}</td>
                <td>{crime.description}</td>
                <td>{crime.location}</td>
                <td>{crime.date.slice(0, 10)}</td>
                <td>{crime.status}</td>
                <td>
                  <select
                    value={crime.status}
                    onChange={(e) =>
                      updateStatus(crime._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PoliceDashboard;
