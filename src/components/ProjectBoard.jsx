import React, { useEffect, useRef, useState } from 'react';
import TaskCard from './TaskCard';  // Assuming you have the TaskCard component ready
import ColumnHeader from './ColumnHeader';

export default function ProjectBoard() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupOption') || 'status');  // Group by default status
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortOption') || 'priority');  // Sort by priority by default
  const [loading, setLoading] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

//   const toggleDropdown = () => {
//     setDropdownVisible(!dropdownVisible);
//   };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownVisible]);

  
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');  // Modify as per the API
      const data = await response.json();
      setTasks(data.tickets);  // Assuming the API returns a list of tasks
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown';
  };

  const getPriorityLabel = (priorityValue) => {
    switch (priorityValue) {
      case 4:
        return 'Urgent';
      case 3:
        return 'High';
      case 2:
        return 'Medium';
      case 1:
        return 'Low';
      case 0:
      default:
        return 'No priority';
    }
  };

  const groupTasks = () => {
    return tasks.reduce((groups, task) => {
      let groupKey;
      if (groupBy === 'user') {
        groupKey = getUserName(task.userId);  // Map userId to user name
      } else if (groupBy === 'priority') {
        groupKey = getPriorityLabel(task.priority);  // Use priority label
      } else {
        groupKey = task[groupBy] || 'Unassigned';
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(task);
      return groups;
    }, {});
  };

  const sortTasks = (tasks) => {
    if (sortBy === 'priority') {
      return tasks.sort((a, b) => b.priority - a.priority);  // Sort by priority (descending)
    } else if (sortBy === 'title') {
      return tasks.sort((a, b) => a.title.localeCompare(b.title));  // Sort by title (ascending)
    }
    return tasks;
  };

  const handleGroupByChange = (event) => {
    setGroupBy(event.target.value);
    localStorage.setItem('groupOption',event.target.value)
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
    localStorage.setItem('sortOption',event.target.value)
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const groupedTasks = groupTasks();

  return (
    <div className="project-board">
      {/* <header className="board-header">
        <div className="dropdown">
          <span>Group by: </span>
          <select value={groupBy} onChange={handleGroupByChange}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <div className="dropdown">
          <span>Sort by: </span>
          <select value={sortBy} onChange={handleSortByChange}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </header> */}
      <header className="board-header">
      <button className="dropdown-button" onClick={toggleDropdown}>
        Display Options
      </button>
      {dropdownVisible && (
        <div className="dropdown-menu" ref={dropdownRef}>
          <div className="dropdown">
            <span>Group by: </span>
            <select value={groupBy} onChange={handleGroupByChange}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="dropdown">
            <span>Sort by: </span>
            <select value={sortBy} onChange={handleSortByChange}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}

      <style jsx>{`
        .dropdown-button {
          padding: 8px 16px;
          font-size: 16px;
          background-color: #2563eb;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .dropdown-menu {
          margin-top: 80px;
          border: 1px solid #ccc;
          padding: 15px;
          background-color: #f9fafb;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          position: absolute;
          z-index: 10;
          min-width: 200px;
          /* padding-bottom:20px; */
        }

        .dropdown {
          margin-bottom: 15px;
        }

        .dropdown select {
          padding: 5px;
          font-size: 14px;
          border-radius: 4px;
          border: 1px solid #ddd;
        }

        .dropdown span {
          font-weight: bold;
          margin-right: 10px;
        }
      `}</style>
    </header>

      <div className="board-columns">
        {Object.entries(groupedTasks).map(([group, groupTasks]) => (
          <div key={group} className="board-column">
            <div className="board">
            <ColumnHeader title={group} count={tasks.length}/> 
              {/* <h2>{group} <span className="task-count">({groupTasks.length})</span></h2> */}
              <div className="task-list">
                {sortTasks(groupTasks).map((task) => (
                  <TaskCard key={task.id} {...task} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
    .project-board {
      font-family: Arial, sans-serif;
      background-color: #f3f4f6;
      padding: 20px;
      min-height: 100vh;
      /* width: 100%; */
    }
    .board-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .header-left,
    .header-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .dropdown {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .dropdown-toggle {
      background-color: white;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      padding: 5px 10px;
      cursor: pointer;
    }
    .board-columns {
      display: flex;
      gap: 40px;
      overflow-x: hidden;
      padding-bottom: 20px;
    }
    .board-column {
      background-color: #f9fafb;
      border-radius: 8px;
      /* min-width: 400px; */
     
    }
    .board{
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items:center;
    }
    .column-header {
      padding: 10px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .task-count {
      background-color: #e5e7eb;
      border-radius: 9999px;
      padding: 2px 8px;
      font-size: 12px;
    }
    .task-list {
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-right:30px;
      /* width: 100%; */
      /* margin-right:25px; */
    }
    button {
      background-color: #f87171;
      border: none;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #ef4444;
    }
    @media (max-width: 768px) {
      .board-columns {
        flex-direction: column;
        align-items: center;
      }
      .board-column {
        width: 100%;
        max-width: none;
      }
    }
  `}</style>
    </div>
  );
}



