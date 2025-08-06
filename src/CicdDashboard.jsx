import React, { useState, useEffect } from "react"; // <-- Added useEffect
import { Link, useLocation } from 'react-router-dom';


const pipelinesData = [
  { id: 1, name: "Build & Deploy API", status: "Success" },
  { id: 2, name: "Deploy Frontend", status: "Running" },
  { id: 3, name: "Run Tests", status: "Failed" },
];

const statusLabels = {
  Success: "Success",
  Running: "In Progress",
  Failed: "Needs Attention",
};

const statusColors = {
  Success: "#28a745",
  Running: "#2196F3",
  Failed: "#dc3545",
};

// Function to format duration (e.g., "5m 30s")
const formatDuration = (ms) => {
  if (ms < 0) return "N/A"; // Handle cases where end time is before start time
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${seconds}s`;
};

export default function CicdDashboard() {
  const [pipelines] = useState(pipelinesData);
  const location = useLocation();

  // New state for dynamic recent activities
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, description: "Build & Deploy API succeeded", status: "Success", startTime: new Date(Date.now() - 3600 * 1000), endTime: new Date(Date.now() - 3590 * 1000) }, // 10s duration, 1 hour ago
    { id: 2, description: "Deploy Frontend started", status: "Running", startTime: new Date(Date.now() - 60 * 1000), endTime: null }, // 1 minute ago, still running
    { id: 3, description: "Run Tests failed", status: "Failed", startTime: new Date(Date.now() - 120 * 1000), endTime: new Date(Date.now() - 110 * 1000) }, // 10s duration, 2 minutes ago
  ]);

  // Simulate updates to recent activities (e.g., a "running" activity finishing)
  useEffect(() => {
    const interval = setInterval(() => {
      setRecentActivities(prevActivities => {
        const updated = prevActivities.map(activity => {
          if (activity.id === 2 && activity.status === "Running") {
            const now = new Date();
            const duration = now.getTime() - activity.startTime.getTime();
            if (duration > 10 * 1000) { // If running for more than 10 seconds (simulated)
              return {
                ...activity,
                description: "Deploy Frontend completed",
                status: "Success",
                endTime: now,
              };
            }
          }
          return activity;
        });
        // Add a new simulated activity after a while
        if (!prevActivities.some(a => a.id === 4) && Math.random() > 0.8) { // Add new one randomly
          updated.unshift({
            id: 4,
            description: "Database Migration started",
            status: "Running",
            startTime: new Date(),
            endTime: null
          });
        }
        return updated;
      });
    }, 5000); // Check and update every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);


  const handleDeploy = (id) => {
    alert(`Deploy triggered for pipeline #${id}`);
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "#f9fafb",
      overflow: 'hidden'
    }}>
      <nav style={{
        width: 220,
        background: "#1f2937",
        color: "#f9fafb",
        padding: "24px 16px",
        boxSizing: "border-box",
        flexShrink: 0
      }}>
        <h2 style={{
          fontWeight: 700,
          fontSize: 24,
          marginBottom: 40,
          textAlign: "center",
          color: '#66bb6a'
        }}>
          YB CI/CD Kit
        </h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 16 }}>
          {[{ name: "Dashboard", path: "/dashboard" },
            { name: "Pipelines", path: "/pipelines" },
            { name: "Environments", path: "/environments" },
            { name: "Settings", path: "/settings" }
          ].map(item => {
            const isActive = location.pathname === item.path;

            return (
              <li
                key={item.name}
                style={{
                  marginBottom: 12,
                  borderRadius: 6,
                  userSelect: "none",
                  backgroundColor: isActive ? "#374151" : "transparent",
                  transition: 'background-color 0.2s ease',
                  fontWeight: isActive ? 600 : 400,
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = isActive ? "#374151" : "#2d3748"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = isActive ? "#374151" : "transparent"}
              >
                <Link
                  to={item.path}
                  style={{
                    display: 'block',
                    padding: "12px 20px",
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {location.pathname === "/dashboard" && (
        <main style={{ flex: 1, padding: 32, boxSizing: "border-box", overflowY: 'auto', background: "#f9fafb" }}>
          <header style={{ marginBottom: 24 }}>
            <h1 style={{ fontWeight: 700, fontSize: 28, margin: 0, color: '#333' }}>Dashboard</h1>
          </header>

          <table style={{
            width: "100%", borderCollapse: "collapse", background: "#fff",
            borderRadius: 8, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.1)", marginBottom: 40
          }}>
            <thead style={{ background: "#374151", color: "#f9fafb" }}>
              <tr>
                <th style={{ padding: "14px 24px", textAlign: "left", fontWeight: 600 }}>Pipeline</th>
                <th style={{ padding: "14px 24px", textAlign: "left", fontWeight: 600 }}>Status</th>
                <th style={{ padding: "14px 24px", textAlign: "center", fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pipelines.map(({ id, name, status }) => (
                <tr key={id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={{ padding: "14px 24px", color: '#444' }}>{name}</td>
                  <td style={{ padding: "14px 24px" }}>
                    <span style={{
                      backgroundColor: statusColors[status], color: "#fff", padding: "6px 16px",
                      borderRadius: 9999, fontWeight: 600, fontSize: 14, display: "inline-block",
                      textAlign: "center", minWidth: 100, boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                      {statusLabels[status]}
                    </span>
                  </td>
                  <td style={{ padding: "14px 24px", textAlign: "center" }}>
                    <button
                      onClick={() => handleDeploy(id)}
                      style={{
                        backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "8px 20px",
                        borderRadius: 6, cursor: "pointer", fontWeight: 600, fontSize: 14,
                        transition: "background-color 0.2s ease-in-out", boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
                    >
                      Deploy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <section style={{
            background: "#fff", borderRadius: 8, padding: 24,
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}>
            <h2 style={{ margin: 0, marginBottom: 12, fontWeight: 700, fontSize: 20, color: '#333' }}>
              Recent Activity
            </h2>
            <ul style={{
              listStyle: "none", paddingLeft: 0, color: "#6b7280",
              fontSize: 14, lineHeight: 1.8
            }}>
              {recentActivities.map(activity => (
                <li key={activity.id}>
                  <span style={{ color: activity.status === 'Success' ? '#28a745' : (activity.status === 'Failed' ? '#dc3545' : '#ffc107'), marginRight: 5 }}>
                    {activity.status === 'Success' ? '✔' : (activity.status === 'Failed' ? '✖' : '⏳')}
                  </span>
                  {activity.description} at {activity.startTime.toLocaleString()}
                  {activity.endTime && ` (completed in ${formatDuration(activity.endTime.getTime() - activity.startTime.getTime())})`}
                  {!activity.endTime && activity.status === 'Running' && ` (running for ${formatDuration(Date.now() - activity.startTime.getTime())})`}
                </li>
              ))}
            </ul>
          </section>
        </main>
      )}
    </div>
  );
}