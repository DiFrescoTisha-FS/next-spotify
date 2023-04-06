import React from 'react';
import Link from 'next/link';
import { destroyCookie } from 'nookies';

const Nav2 = ({ user }) => {
  const handleLogout = () => {
    destroyCookie(null, 'accessToken');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-gray-800">
      <ul>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <button onClick={handleLogout}>Log out</button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav2;