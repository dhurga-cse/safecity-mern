// File: src/pages/MyReports.js
import "../styles/MyReports.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyReports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyReports = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:8000/api/crimes/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Failed to fetch reports");
          return;
        }

        setReports(data);
      } catch (error) {
        alert("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchMyReports();
  }, [navigate]);

  const handleEdit = (id) => {
    navigate(`/report/${id}`);
  };

  return (
    <div className="my-reports">
      <h2>My Reports</h2>

      {loading ? (
        <p>Loading...</p>
      ) : reports.length === 0 ? (
        <p>No reports submitted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Crime Type</th>
              <th>Description</th>
              <th>Location</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>{report.crimeType}</td>
                <td>{report.description}</td>
                <td>{report.location}</td>
                <td>{report.date.slice(0, 10)}</td>
                <td>{report.status}</td>
                <td>
                  <button onClick={() => handleEdit(report._id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyReports;
