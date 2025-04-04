import React from 'react';
import logo from '../../../public/assets/logo.png';

export default function MenuBar() {
  return (
    <nav className="flex flex-row place-content-between bg-[#fff9f1] p-4 shadow-md">
      <img src={logo.src} alt="Logo" className="h-auto w-60" />
      <ul className="flex space-x-6 list-none pt-5 pr-7">
        <li>
          <a href="/" className="text-gray-700 hover:text-black">
            Home
          </a>
        </li>
        <li>
          <a href="#" className="text-gray-700 hover:text-black">
            Login/Register
          </a>
        </li>
        <li>
          <a href="/vacancies" className="text-gray-700 hover:text-black">
            Vacancies
          </a>
        </li>
        <li>
          <a href="/contact" className="text-gray-700 hover:text-black">
            Contact Us
          </a>
        </li>
      </ul>
    </nav>
  );
}
