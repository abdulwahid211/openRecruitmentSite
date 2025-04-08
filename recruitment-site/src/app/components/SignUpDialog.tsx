'use client';

import { useEffect, useState } from 'react';
import { Description, Dialog, DialogPanel, DialogTitle, Input, Transition } from '@headlessui/react';
import { useDialog } from '../context/DialogContext';
import { redirect } from 'next/navigation';

export default function SignUpDialog() {
  let { dialogOpen, setDialogOpen } = useDialog();

  return (
    <Transition show={dialogOpen}>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogPanel className="fixed inset-0 bg-[#efedeb] transition duration-300 ease-in-out rounded-lg shadow-lg xl:ml-60 xl:mr-60 mt-20 mb-40 mx-auto py-6">
          <div className="flex flex-col  items-center space-y-4 p-6">
            <DialogTitle className="text-3xl font-bold">Your Account</DialogTitle>
            <Input name="username" placeholder="Email" type="text" className="w-full bg-white lg:w-100 border border-gray-300 text-[#004d90] rounded-lg p-2"></Input>
            <Input name="password" placeholder="Password" type="password" className="w-full bg-white lg:w-100 border border-gray-300 rounded-lg p-2"></Input>

            <button
              onClick={() => setDialogOpen(false)}
              className="bg-[#e0bc91] shadow-md text-white text-lg font-bold py-3 px-11 rounded-lg hover:bg-[#bda88f] hover:text-[#004d90]"
            >
              Login
            </button>
            <p className="hover:hover:text-[#d7e1b3] font-bold text-[#5e8bb2] p-1 rounded-lg">
              <a className="hover:text-red">Forgotten your password</a>
            </p>

            <p> Don't have an account with us</p>
            <button
              onClick={() => {
                redirect(`/register`); // Navigate to the new post page
              }}
              className="bg-[#e0bc91] shadow-md text-white text-lg font-bold py-3 px-11 rounded-lg hover:bg-[#bda88f] hover:text-[#004d90]"
            >
              Register
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </Transition>
  );
}
