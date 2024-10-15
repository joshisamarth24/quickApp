import React from 'react';

export default function Header({ title, count = 1, avatarInitials, iconType }) {
  const initials = avatarInitials || title.split(' ').map(word => word[0]).join('').toUpperCase();

  const renderIcon = () => {
    switch (iconType) {
      case 'user':
        return <img src="/user-icon.svg" alt="User" className="icon" />;
      case 'status':
        return <img src="/status-icon.svg" alt="Status" className="icon" />;
      case 'priority':
        return <img src="/priority-icon.svg" alt="Priority" className="icon" />;
      default:
        return null;
    }
  };

  return (
    <div className="header">
      <div className="icon-wrapper">{renderIcon()}</div>
      <div className="title">
        {title} <span className="count">{count}</span>
      </div>
      <div className="actions">
        <button className="action-button">
            <img className='icon-img' src='/add.svg'></img>
        </button>
        <button className="action-button">
        <img className='icon-img' src='/3 dot menu.svg'></img>
        </button>
      </div>

      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          justify-content:space-between;
          padding: 8px;
          background-color: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }
        .icon-wrapper {
          /* margin-right: 2px; */
          display: flex;
          align-items: center;
        }
        .icon {
          width: 12px;
          height: 12px;
        }
        .title {
          font-size: 14px;
          font-weight: 500;
          flex-grow: 1;
          color: #111827;
        }
        .count {
          margin-left: 4px;
          color: #6b7280;
        }
        .actions {
          display: flex;
          /* gap: 3px; */
        }
        .action-button {
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
          font-size: 12px;
          
        }
        .icon-img{
            width: 12px;
            height: 12px;
        }
      `}</style>
    </div>
  );
}
