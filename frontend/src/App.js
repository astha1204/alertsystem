import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000/alerts"; // change later for deployment

function App() {

  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    country: "",
    city: "",
    visaType: ""
  });

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 5;


  const fetchAlerts = async () => {
  try {
    setLoading(true);
    setError("");

    const res = await axios.get(
      `${API}?page=${page}&limit=${limit}`
    );

    setAlerts(res.data.data);
    setTotal(res.data.total);

  } catch (err) {

    console.error(err);

    setError("Failed to load alerts. Please check server.");

  } finally {
    setLoading(false);
  }
  };



  useEffect(() => {
    fetchAlerts();
  }, [page]);


  const submit = async (e) => {
  e.preventDefault();

  try {
    setError("");

    await axios.post(API, form);

    setForm({
      country: "",
      city: "",
      visaType: ""
    });

    setPage(1);
    fetchAlerts();

  } catch (err) {

    console.error(err);

    setError("Failed to create alert.");

  }
  };


  const updateStatus = async (id) => {
  try {
    setError("");

    await axios.put(`${API}/${id}`, {
      status: "Booked"
    });

    fetchAlerts();

  } catch (err) {

    console.error(err);

    setError("Failed to update status.");

  }
  };



  const remove = async (id) => {
  try {
    setError("");

    await axios.delete(`${API}/${id}`);

    fetchAlerts();

  } catch (err) {

    console.error(err);

    setError("Failed to delete alert.");

  }
  };




  return (
    <div className="app-container">

      <h1 className="app-title">Visa Slot Alerts</h1>
      {/* Error Message */}
      {error && (
        <div className="error-box">
          {error}
        </div>
      )}



      {/* FORM */}
      <form onSubmit={submit} className="alert-form">

        <input
          placeholder="Country"
          value={form.country}
          onChange={(e) =>
            setForm({ ...form, country: e.target.value })
          }
        />

        <input
          placeholder="City"
          value={form.city}
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
        />

        <select
          value={form.visaType}
          onChange={(e) =>
            setForm({ ...form, visaType: e.target.value })
          }
        >
          <option value="">Visa Type</option>
          <option>Tourist</option>
          <option>Business</option>
          <option>Student</option>
        </select>

        <button>Add Alert</button>

      </form>


      {/* TABLE */}
      <table className="alert-table">

        <thead>
          <tr>
            <th>Country</th>
            <th>City</th>
            <th>Visa</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

        {loading && (
          <tr>
            <td colSpan="5" className="empty-row">
              Loading...
            </td>
          </tr>
        )}


          {alerts.map(a => (
            <tr key={a.id}>

              <td>{a.country}</td>
              <td>{a.city}</td>
              <td>{a.visaType}</td>

              <td>
                <span
                  className={`status-badge ${
                    a.status === "Booked"
                      ? "status-booked"
                      : a.status === "Expired"
                      ? "status-expired"
                      : "status-active"
                  }`}
                >
                  {a.status}
                </span>
              </td>

              <td>

                <button
                  className="btn-book"
                  onClick={() => updateStatus(a.id)}
                >
                  Booked
                </button>

                <button
                  className="btn-delete"
                  onClick={() => remove(a.id)}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>


      {/* PAGINATION */}
      <div className="pagination">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} of {Math.ceil(total / limit) || 1}
        </span>

        <button
          disabled={page >= Math.ceil(total / limit)}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default App;
