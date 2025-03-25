import React, { useState } from "react";
import "./App.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "hod@example.com" && password === "admin") {
      onLogin("hod");
    } else {
      onLogin("student");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const LeaveRequest = ({ onSubmit }) => {
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reason);
    setReason("");
    setSubmitted(true);
  };

  return (
    <div className="container">
      <h2>Request Leave</h2>
      {submitted ? (
        <p>Your leave request has been submitted!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Enter reason for leave"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

const HODDashboard = ({ requests, onApprove, onReject }) => {
  return (
    <div className="container">
      <h2>HOD Dashboard</h2>
      {requests.length === 0 ? (
        <p>No leave requests.</p>
      ) : (
        requests.map((req, index) => (
          <div key={index} className="leave-item">
            <p>{req.reason}</p>
            <p>Status: {req.status}</p>
            {req.status === "Pending" && (
              <>
                <button onClick={() => onApprove(index)}>Approve</button>
                <button onClick={() => onReject(index)}>Reject</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);

  const handleLogin = (role) => {
    setUser(role);
  };

  const handleLeaveSubmit = (reason) => {
    setRequests([...requests, { reason, status: "Pending" }]);
  };

  const handleApprove = (index) => {
    const newRequests = [...requests];
    newRequests[index].status = "Approved ✅";
    setRequests(newRequests);
  };

  const handleReject = (index) => {
    const newRequests = [...requests];
    newRequests[index].status = "Rejected ❌";
    setRequests(newRequests);
  };

  return (
    <div>
      <h1>HOD Approval System</h1>
      {!user && <Login onLogin={handleLogin} />}
      {user === "student" && <LeaveRequest onSubmit={handleLeaveSubmit} />}
      {user === "hod" && (
        <HODDashboard requests={requests} onApprove={handleApprove} onReject={handleReject} />
      )}
    </div>
  );
};

export default App;
