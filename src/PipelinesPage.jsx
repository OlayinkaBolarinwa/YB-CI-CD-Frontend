// src/PipelinesPage.jsx
import React from 'react';

export default function PipelinesPage() {
  return (
    <div style={{ padding: 32, background: "#f9fafb", minHeight: '100vh', boxSizing: 'border-box' }}>
      <h1 style={{ fontWeight: 700, fontSize: 28, margin: 0, marginBottom: 30, color: '#333' }}>
        Pipelines Overview
      </h1>
      <p style={{ fontSize: 18, color: '#555' }}>
        This page will show detailed information about your CI/CD pipelines.
        You can expand on this to show historical runs, logs, and more.
      </p>
    </div>
  );
}