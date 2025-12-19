import { useState } from "react";
import "../styles/ReportCrime.css";

function ReportCrime() {
  const [formData, setFormData] = useState({
    crimeType: "",
    description: "",
    location: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  try {
    const res = await fetch("http://localhost:8000/api/crimes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        crimeType: formData.crimeType,
        description: formData.description,
        location: formData.location,
        date: formData.date,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to report crime");
      return;
    }

    alert("Crime reported successfully ✅");

    setFormData({
      crimeType: "",
      description: "",
      location: "",
      date: "",
    });
  } catch (error) {
    alert("Server error");
  }
};

  return (
    <div className="report-crime">
      <h2>Report a Crime</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="crimeType"
          placeholder="Crime Type"
          value={formData.crimeType}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
}

export default ReportCrime;
