'use client';
import React, { useState } from 'react';

const RegisterEmployer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [telephone, setTelephone] = useState('');
  const [validation, setValidation] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [formSuccessful, setFormSuccessful] = useState(false);

  const onClickSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !address || !city || !postcode || !telephone) {
      setValidation(true);
      return;
    }

    // Add logic for form submission, e.g., API call
    // If submission is successful:
    setFormSuccessful(true);
    setValidation(false);
    setRegisterError(false);

    // If error occurs:
    // setRegisterError(true);
  };

  return (
    <div className="registerEmployerTitle text-center py-8">
      <h2 className="text-4xl font-semibold">Register an Employer</h2>
      <div className="flex flex-col items-center justify-center mt-6">
        <form onSubmit={onClickSubmit} className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          {validation && <p className="text-red-500 text-center mb-4">All details must be filled</p>}
          {registerError && <p className="text-red-500 text-center mb-4">Unsuccessful Submission, please try again!</p>}
          {formSuccessful && <p className="text-green-500 text-center mb-4">New Employer has been successfully added!</p>}

          <input
            type="text"
            id="name"
            name="name"
            placeholder="Company Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            id="postcode"
            name="postcode"
            placeholder="Postcode"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            id="telephone"
            name="telephone"
            placeholder="Telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
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

export default RegisterEmployer;
