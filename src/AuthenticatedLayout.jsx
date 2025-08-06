import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

export default function AuthenticatedLayout({ handleLogout }) {
  const location = useLocation();

  const sidebarItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Pipelines", path: "/pipelines" },
    { name: "Environments", path: "/environments" },
    { name: "Settings", path: "/settings" }
  ];

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
          {sidebarItems.map(item => {
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

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </div>

      <button
        onClick={handleLogout}
        style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            padding: '8px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
            zIndex: 1000,
        }}
      >
        Logout
      </button>
    </div>
  );
}