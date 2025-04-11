'use client';

import { use, useEffect, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Input, Transition } from '@headlessui/react';
import { useDialog } from '../context/DialogContext';
import { redirect } from 'next/navigation';
import { APPLICANT_LOGIN } from '../libs/graphql/graphql.queries';
import { useLazyQuery } from '@apollo/client';
import { ADMIN_ID, APPLICANT_ID, APPLICANT_LOGIN_ENABLED, AUTH_TOKEN } from '../libs/graphql/constants';
import { useRouter } from 'next/navigation';

export default function SignUpDialog() {
  let { dialogOpen, setDialogOpen } = useDialog();
  const router = useRouter(); // Initialize useRouter
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginApplicant, { data, loading, error }] = useLazyQuery(APPLICANT_LOGIN);

  const handleLoginSubmit = async () => {
    try {
      console.log(email, password);
      var result = await loginApplicant({
        variables: { email, password },
      });
      console.log(result);
      console.log(data);
      if (result?.data?.applicantLogin.token !== 'Not Found') {
        const loginData = result.data.applicantLogin;
        localStorage.setItem(AUTH_TOKEN, loginData.token);
        localStorage.setItem(APPLICANT_ID, loginData.id);
        localStorage.setItem(APPLICANT_LOGIN_ENABLED, 'true');
        setDialogOpen(false);
        window.location.reload();
      } else {
        console.log('Incorrect login credentials');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  useEffect(() => {
    console.log(dialogOpen);
  }, [dialogOpen]);

  return (
    <Transition show={dialogOpen}>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogPanel className="fixed inset-0 bg-[#efedeb] bg-opacity-50 z-11 transition duration-300 ease-in-out rounded-lg shadow-lg xl:ml-60 xl:mr-60 mt-20 mb-40 mx-auto py-6">
          <div className="flex flex-col  items-center space-y-4 p-6">
            <DialogTitle className="text-3xl font-bold">Your Account</DialogTitle>
            <Input
              name="username"
              placeholder="Email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white lg:w-100 border border-gray-300 text-[#004d90] rounded-lg p-2"
            ></Input>
            <Input
              name="password"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white lg:w-100 border border-gray-300 rounded-lg p-2"
            ></Input>

            <button
              onClick={() => handleLoginSubmit()}
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
                redirect(`/register`);
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
