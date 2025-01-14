import React, { useState } from "react";

const Header = () => {

  return (
    <>
      <nav className="bg-green-800 pl-4 py-2">
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="text-white hover:text-gray-400">
              Home
            </a>
          </li>
          <li>
            <a href="/ladder" className="text-white hover:text-gray-400">
              Ladder
            </a>
          </li>
          <li>
            <a href="/analysis" className="text-white hover:text-gray-400">
              Analysis
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
