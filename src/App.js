import React, { useState } from "react";
import "./App.css";

function App() {
  const [requests, setRequests] = useState([]);
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = { id: Date.now(), name, reason, status: "Pending" };
    setRequests([...requests, newRequest]);
    setName("");
    setReason("");
  };

  const updateStatus = (id, status) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status } : req
      )
    );
  };

  return (
    <div className="container">
      <h1>HOD Approval System</h1>

      {/* Leave Form */}
      <form onSubmit={handleSubmit} className="leave-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Reason for Leave"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit Leave Request</button>
      </form>

      {/* Display Leave Requests */}
      <h2>Leave Requests</h2>
      <ul>
        {requests.map((req) => (
          <li key={req.id} className={`request ${req.status.toLowerCase()}`}>
            <p><strong>{req.name}</strong> - {req.reason}</p>
            <p>Status: <strong>{req.status}</strong></p>
            {req.status === "Pending" && (
              <div>
                <button onClick={() => updateStatus(req.id, "Approved")}>Approve</button>
                <button onClick={() => updateStatus(req.id, "Rejected")}>Reject</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
