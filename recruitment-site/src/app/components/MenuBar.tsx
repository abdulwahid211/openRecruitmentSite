'use client';
import React, { useEffect, useState } from 'react';
import logo from '../../../public/assets/logo.png';
import SignUpDialog from './SignUpDialog';
import { useDialog } from '../context/DialogContext';
import { ADMIN_ID, ADMIN_LOGIN_ENABLED, AUTH_TOKEN } from '../graphql/constants';
import { redirect, useRouter } from 'next/navigation';

export default function MenuBar() {
  let { dialogOpen, setDialogOpen } = useDialog();
  const [adminsLogin, setAdminsLogin] = useState(false);
  const router = useRouter(); // Initialize useRouter
  const handleDialogOpen = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any anchor navigation
    setDialogOpen(!dialogOpen);
    console.log('clicked');
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_LOGIN_ENABLED);
    localStorage.removeItem(ADMIN_ID);
    localStorage.removeItem(AUTH_TOKEN);
    setAdminsLogin(false);
    router.push('/'); // Redirect to the dashboard after successful login
  };

  useEffect(() => {
    const adminLoginEnabled = localStorage.getItem(ADMIN_LOGIN_ENABLED);
    const adminId = localStorage.getItem(ADMIN_ID);

    if (adminLoginEnabled === 'true' && adminId) {
      setAdminsLogin(true);
    } else {
      setAdminsLogin(false);
    }
  }, []);

  return (
    <>
      <SignUpDialog />
      <nav className="flex flex-row place-content-between bg-[#fff9f1] p-4 shadow-md">
        <img src={logo.src} alt="Logo" className="h-auto w-60" />
        <ul className="flex space-x-6 list-none pt-5 pr-7">
          {!adminsLogin && (
            <>
              <li>
                <a href="/" className="text-gray-700 hover:text-black">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-yellow" onClick={handleDialogOpen}>
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
            </>
          )}
          {adminsLogin && (
            <>
              <li>
                <a href="/allApplicants" className="text-gray-700 hover:text-black">
                  All Applicants
                </a>
              </li>
              <li>
                <a href="/allEmployers" className="text-gray-700 hover:text-black">
                  All Employers
                </a>
              </li>
              <li>
                <a href="/allAdmins" className="text-gray-700 hover:text-black">
                  All Admins
                </a>
              </li>
              <li>
                <a href="/registerEmployer" className="text-gray-700 hover:text-black">
                  Register an Employer
                </a>
              </li>
              <li>
                <a href="/postVacancy" className="text-gray-700 hover:text-black">
                  Post Vacancy
                </a>
              </li>
              <li>
                <a href="/registerAdmin" className="text-gray-700 hover:text-black">
                  Register an Admin
                </a>
              </li>
              <li className="logout">
                <a id="admin-logout" className="text-green-700 hover:text-green-900" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
