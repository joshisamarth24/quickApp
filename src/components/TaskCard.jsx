import React from "react";

export default function TaskCard({
  id = "CAM-11",
  title = "Conduct Security Vulnerability Assessment",
  isPriority = true,
  type = "Feature Request",
  avatarSrc = "/placeholder.svg?height=32&width=32",
  avatarFallback = "U",
}) {
  return (
    <div className="task-card">
      <div className="task-card-header">
        <span className="task-id">{id}</span>
        <div className="avatar">
          {avatarSrc ? (
            <img src={avatarSrc} alt="User avatar" />
          ) : (
            <span className="avatar-fallback">{avatarFallback}</span>
          )}
        </div>
      </div>
      <div className="task-card-content">
        <h3 className="task-title">{title}</h3>
        <div className="task-tags">
          {isPriority && (
            <span className="tag priority-tag">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="alert-icon"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </span>
          )}
          <span className="tag type-tag">{type}</span>
        </div>
      </div>
      <style jsx>{`
        .task-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 16px;
          max-width: 400px;
          width: 100%;
        }
        .task-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .task-id {
          color: #6b7280;
          font-size: 14px;
        }
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .avatar-fallback {
          color: #4b5563;
          font-weight: 500;
        }
        .task-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 12px 0;
          color: #111827;
        }
        .task-tags {
          display: flex;
          gap: 8px;
        }
        .tag {
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
          background-color: #e5e7eb;
          color: #4b5563;
        }
        .priority-tag {
          padding: 2px;
        }
        .alert-icon {
          width: 16px;
          height: 16px;
        }
        .type-tag {
          background-color: #e5e7eb;
        }
      `}</style>
    </div>
  );
}