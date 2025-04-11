'use client';
import React, { useEffect, useState } from 'react';
import logo from '../public/assets/logo.png';
import SignUpDialog from './SignUpDialog';
import { useDialog } from '../context/DialogContext';
import { ADMIN_ID, ADMIN_LOGIN_ENABLED, APPLICANT_ID, APPLICANT_LOGIN_ENABLED, AUTH_TOKEN } from '../libs/graphql/constants';
import { useRouter } from 'next/navigation';

export default function MenuBar() {
  let { dialogOpen, setDialogOpen } = useDialog();
  const [adminsLogin, setAdminsLogin] = useState(false);
  const [applicantLogin, setApplicantLogin] = useState(false);
  const router = useRouter(); // Initialize useRouter
  const handleDialogOpen = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any anchor navigation
    setDialogOpen(!dialogOpen);
    console.log('clicked');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem(ADMIN_LOGIN_ENABLED);
    localStorage.removeItem(ADMIN_ID);
    localStorage.removeItem(AUTH_TOKEN);
    setAdminsLogin(false);
    router.push('/'); // Redirect to the dashboard after successful login
    window.location.reload();
  };

  const handleApplicantLogout = () => {
    localStorage.removeItem(APPLICANT_LOGIN_ENABLED);
    localStorage.removeItem(APPLICANT_ID);
    localStorage.removeItem(AUTH_TOKEN);
    setAdminsLogin(false);
    router.push('/'); // Redirect to the dashboard after successful login
    window.location.reload();
  };

  useEffect(() => {
    const adminLoginEnabled = localStorage.getItem(ADMIN_LOGIN_ENABLED);
    const adminId = localStorage.getItem(ADMIN_ID);

    const applicantLoginEnabled = localStorage.getItem(APPLICANT_LOGIN_ENABLED);
    const applicantId = localStorage.getItem(APPLICANT_ID);

    if (applicantLoginEnabled === 'true' && applicantId) {
      setApplicantLogin(true);
    }

    if (adminLoginEnabled === 'true' && adminId) {
      setAdminsLogin(true);
    }
  }, []);
  return (
    <>
      <SignUpDialog />
      <nav className="flex flex-row place-content-between bg-[#fff9f1] p-4 shadow-md font-bold text-l ">
        <a href="/">
          <img src={logo.src} alt="Logo" className="h-auto w-60" />
        </a>
        <ul className="flex space-x-6 list-none pt-5 pr-7">
          {!adminsLogin && (
            <>
              <li>
                <a href="/" className="text-[#004d90] hover:text-emerald-500">
                  Home
                </a>
              </li>
              {!applicantLogin && (
                <li>
                  <a href="#" className="text-[#004d90] hover:text-amber-300" onClick={handleDialogOpen}>
                    Login/Register
                  </a>
                </li>
              )}
              <li>
                <a href="/vacancies" className="text-[#004d90] hover:text-emerald-500">
                  Vacancies
                </a>
              </li>
              <li>
                <a href="/contact" className="text-[#004d90] hover:text-emerald-500">
                  Contact Us
                </a>
              </li>
              {applicantLogin && (
                <li>
                  <a className="text-fuchsia-400 hover:text-green-900" onClick={handleApplicantLogout}>
                    Logout
                  </a>
                </li>
              )}
            </>
          )}
          {adminsLogin && (
            <>
              <li>
                <a href="/allApplicants" className="text-[#004d90] hover:text-emerald-500">
                  All Applicants
                </a>
              </li>
              <li>
                <a href="/allEmployers" className="text-[#004d90] hover:text-emerald-500">
                  All Employers
                </a>
              </li>
              <li>
                <a href="/allAdmins" className="text-[#004d90] hover:text-emerald-500">
                  All Admins
                </a>
              </li>
              <li>
                <a href="/registerEmployer" className="text-[#004d90] hover:text-emerald-500">
                  Register an Employer
                </a>
              </li>
              <li>
                <a href="/postVacancy" className="text-[#004d90] hover:text-emerald-500">
                  Post Vacancy
                </a>
              </li>
              <li>
                <a href="/registerAdmin" className="text-[#004d90] hover:text-emerald-500">
                  Register an Admin
                </a>
              </li>
              <li className="logout-admin">
                <a id="admin-logout" className="text-green-700 hover:text-green-900" onClick={handleAdminLogout}>
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
