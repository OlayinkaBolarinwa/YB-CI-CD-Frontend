import React, { useState } from 'react';

export default function SettingsPage() {
  const [receiveNotifications, setReceiveNotifications] = useState(true);

  const [adoOrgName, setAdoOrgName] = useState('');
  const [adoProjectName, setAdoProjectName] = useState('');
  const [adoPat, setAdoPat] = useState('');

  const handleSaveAccountSettings = (e) => {
    e.preventDefault();
    console.log("Saving Account Settings:", { receiveNotifications });
    alert("Account settings saved! (Simulated)");
  };

  const handleSaveAdoIntegration = async (e) => {
    e.preventDefault();
    const payload = { adoOrgName, adoProjectName, adoPat };
    try {
      const response = await fetch('http://localhost:5000/api/settings/integrations/ado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Backend response:', data);
        alert('Azure DevOps settings saved successfully!');
      } else {
        throw new Error(data.message || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: 32, background: "#f9fafb", minHeight: '100vh', boxSizing: 'border-box' }}>
      <h1 style={{ fontWeight: 700, fontSize: 28, margin: 0, marginBottom: 30, color: '#333' }}>
        Settings
      </h1>

      <section style={{
        background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: 20, marginBottom: 30
      }}>
        <h2 style={{ margin: '0 0 20px', color: '#2563eb', fontSize: 22 }}>Account Preferences</h2>
        <form onSubmit={handleSaveAccountSettings}>
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#555' }}>
              <input
                type="checkbox"
                checked={receiveNotifications}
                onChange={(e) => setReceiveNotifications(e.target.checked)}
                style={{ marginRight: 8 }}
              />
              Receive email notifications
            </label>
          </div>
          <button
            type="submit"
            style={{
              padding: '10px 20px', borderRadius: 5, border: 'none',
              backgroundColor: '#28a745', color: '#fff', fontSize: 16,
              fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#218838'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#28a745'}
          >
            Save Account Settings
          </button>
        </form>
      </section>

      <section style={{
        background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: 20, marginBottom: 30
      }}>
        <h2 style={{ margin: '0 0 20px', color: '#2563eb', fontSize: 22 }}>Integrations</h2>

        <div style={{ marginBottom: 30, border: '1px solid #e0e0e0', borderRadius: 8, padding: 20 }}>
          <h3 style={{ margin: '0 0 15px', color: '#333', fontSize: 18 }}>Azure DevOps</h3>
          <form onSubmit={handleSaveAdoIntegration}>
            <div style={{ marginBottom: 15 }}>
              <label htmlFor="adoOrg" style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#555' }}>
                Organization Name:
              </label>
              <input
                type="text"
                id="adoOrg"
                value={adoOrgName}
                onChange={(e) => setAdoOrgName(e.target.value)}
                placeholder="e.g., mydevopsorg"
                required
                style={{
                  width: '100%', padding: '10px 12px', border: '1px solid #ccc',
                  borderRadius: 5, fontSize: 16, boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: 15 }}>
              <label htmlFor="adoProject" style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#555' }}>
                Project Name:
              </label>
              <input
                type="text"
                id="adoProject"
                value={adoProjectName}
                onChange={(e) => setAdoProjectName(e.target.value)}
                placeholder="e.g., MyProject"
                required
                style={{
                  width: '100%', padding: '10px 12px', border: '1px solid #ccc',
                  borderRadius: 5, fontSize: 16, boxSizing: 'border-box'
                }}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="adoPat" style={{ display: 'block', marginBottom: 8, fontWeight: 500, color: '#555' }}>
                Personal Access Token (PAT):
              </label>
              <input
                type="password"
                id="adoPat"
                value={adoPat}
                onChange={(e) => setAdoPat(e.target.value)}
                placeholder="Paste your PAT here (e.g., d54djkfiofdj23d...)"
                required
                style={{
                  width: '100%', padding: '10px 12px', border: '1px solid #ccc',
                  borderRadius: 5, fontSize: 16, boxSizing: 'border-box'
                }}
              />
              <p style={{ fontSize: 12, color: '#888', marginTop: 5 }}>
                
              </p>
            </div>
            <button
              type="submit"
              style={{
                padding: '10px 20px', borderRadius: 5, border: 'none',
                backgroundColor: '#2563eb', color: '#fff', fontSize: 16,
                fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#2563eb'}
            >
              Save Azure DevOps Settings
            </button>
          </form>
        </div>

        <div style={{ border: '1px dashed #e0e0e0', borderRadius: 8, padding: 20, textAlign: 'center', color: '#777' }}>
          <p>More integrations coming soon! (e.g., GitHub, Slack, additional cloud providers)</p>
        </div>

      </section>
    </div>
  );
}