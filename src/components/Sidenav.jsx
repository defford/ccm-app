import React from 'react';
import { Link } from 'react-router-dom';

const Sidenav = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-gray-800 text-white w-44 p-4`}>
      <nav>
        <ul>
          <li className="mb-2">
            <Link to="/" className="text-white">Home</Link>
          </li>
          <li className="mb-2">
            <Link to="/ladder" className="text-white">Ladder</Link>
          </li>
          <li className="mb-2">
            <Link to="/analysis" className="text-white">Analysis</Link>
          </li>
        </ul>
      </nav>
      <button onClick={toggleSidebar}>X</button>
    </div>
  );
};

export default Sidenav;