'use client';
import React, { useEffect } from 'react';
import { DialogProvider } from '../context/DialogProvider';
import MenuBar from '../components/MenuBar';
import RegisterAdmin from '../components/admin/RegisterAdmin';
import { ADMIN_LOGIN_ENABLED } from '../graphql/constants';
import { redirect, useRouter } from 'next/navigation';
import RegisterEmployer from '../components/admin/RegisterEmployer';

export default function page() {
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const adminLoginEnabled = localStorage.getItem(ADMIN_LOGIN_ENABLED);

    if (adminLoginEnabled !== 'true') {
      router.push('/'); // Redict back
    }
  }, [router]);

  return (
    <div>
      <DialogProvider>
        <MenuBar />
      </DialogProvider>
      <RegisterEmployer />
    </div>
  );
}
