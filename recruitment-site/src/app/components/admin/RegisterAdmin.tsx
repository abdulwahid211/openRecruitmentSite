'use client';
import { CREATE_ADMIN_PROFILE } from '../../graphql/graphql.queries';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { redirect } from 'next/navigation';

const RegisterAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [validation, setValidation] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [formSuccessful, setFormSuccessful] = useState(false);

  const [createAdmin, { loading, error, data }] = useMutation(CREATE_ADMIN_PROFILE);

  const onClickSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email || !password || !firstname || !lastname) {
      setValidation(true);
      return;
    }

    await createAdmin({ variables: { email: email, password: password, firstName: firstname, lastName: lastname } });

    setFormSuccessful(true);
    setValidation(false);
    setRegisterError(false);
    if (!loading) {
      redirect(`/`); // Navigate to the new post page
    }
    if (error) {
      setRegisterError(true);
    }
  };

  return (
    <div className="registerAdminTitle text-center py-8">
      <h2 className="text-4xl font-semibold">Register an Admin</h2>
      <div className="flex flex-col items-center justify-center mt-6">
        <form onSubmit={onClickSubmit} className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          {validation && <p className="text-red-500 text-center mb-4">All details must be filled</p>}
          {registerError && <p className="text-red-500 text-center mb-4">Unsuccessful Submission, please try again!</p>}
          {formSuccessful && <p className="text-green-500 text-center mb-4">New Admin has been successfully added!</p>}

          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email/Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="FirstName"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="LastName"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterAdmin;
