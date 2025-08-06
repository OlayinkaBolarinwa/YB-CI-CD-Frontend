// src/EnvironmentsPage.jsx
import React, { useState } from 'react';

const initialEnvironments = [
  { id: 'dev', name: 'Development', status: 'Ready', lastDeployment: 'N/A' },
  { id: 'staging', name: 'Staging', status: 'Ready', lastDeployment: 'N/A' },
  { id: 'prod', name: 'Production', status: 'Ready', lastDeployment: 'N/A' },
];

export default function EnvironmentsPage() {
  const [environments, setEnvironments] = useState(initialEnvironments);

  const triggerTerraformDeployment = (envId) => {
    const now = new Date().toLocaleString();
    setEnvironments(prevEnvs =>
      prevEnvs.map(env =>
        env.id === envId
          ? { ...env, status: 'Deploying...', lastDeployment: `Initiated at ${now}` }
          : env
      )
    );

    // --- SIMULATED BACKEND/CI/CD CALL ---
    // In a real application, you would make an API call here to your backend.
    // The backend would then trigger an Azure DevOps Pipeline, GitHub Action, etc.,
    // which would execute your Terraform code.
    console.log(`Simulating Terraform deployment for ${envId} environment.`);

    setTimeout(() => {
      setEnvironments(prevEnvs =>
        prevEnvs.map(env =>
          env.id === envId
            ? { ...env, status: 'Deployed Successfully', lastDeployment: `Completed at ${now}` }
            : env
        )
      );
      alert(`Terraform deployment to ${envId} simulated successfully!`);
    }, 3000); // Simulate a 3-second deployment
  };

  return (
    <div style={{ padding: 32, background: "#f9fafb", minHeight: '100vh', boxSizing: 'border-box' }}>
      <h1 style={{ fontWeight: 700, fontSize: 28, margin: 0, marginBottom: 30, color: '#333' }}>
        Infrastructure Environments
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {environments.map(env => (
          <div
            key={env.id}
            style={{
              background: '#fff',
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <h3 style={{ margin: '0 0 15px', color: '#2563eb' }}>{env.name}</h3>
            <p style={{ margin: '5px 0', fontSize: 14, color: '#555' }}>
              **Status:** {' '}
              <span style={{
                fontWeight: 'bold',
                color: env.status.includes('Deploying') ? '#ffc107' : (env.status.includes('Successfully') ? '#28a745' : '#6c757d')
              }}>
                {env.status}
              </span>
            </p>
            <p style={{ margin: '5px 0', fontSize: 12, color: '#777' }}>
              Last Deployment: {env.lastDeployment}
            </p>
            <button
              onClick={() => triggerTerraformDeployment(env.id)}
              disabled={env.status.includes('Deploying')}
              style={{
                marginTop: 20,
                padding: '10px 15px',
                borderRadius: 5,
                border: 'none',
                backgroundColor: env.status.includes('Deploying') ? '#6c757d' : '#28a745',
                color: '#fff',
                fontSize: 14,
                fontWeight: '600',
                cursor: env.status.includes('Deploying') ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={e => !env.status.includes('Deploying') && (e.currentTarget.style.backgroundColor = '#218838')}
              onMouseLeave={e => !env.status.includes('Deploying') && (e.currentTarget.style.backgroundColor = '#28a745')}
            >
              {env.status.includes('Deploying') ? 'Deploying...' : 'Deploy Infrastructure'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}