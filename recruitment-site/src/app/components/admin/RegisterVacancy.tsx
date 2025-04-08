'use client';
import React, { useState } from 'react';

const RegisterVacancy = () => {
  const [employerId, setEmployerId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState<number | null>(null);
  const [location, setLocation] = useState('');
  const [contract, setContract] = useState('');
  const [validation, setValidation] = useState(false);
  const [postError, setPostError] = useState(false);
  const [formSuccessful, setFormSuccessful] = useState(false);

  const onClickSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!employerId || !title || !description || salary === null || !location || !contract) {
      setValidation(true);
      return;
    }

    // Add logic for form submission, e.g., API call to post the vacancy
    // If submission is successful:
    setFormSuccessful(true);
    setValidation(false);
    setPostError(false);

    // If error occurs:
    // setPostError(true);
  };

  return (
    <div className="postVacancyTitle text-center py-8">
      <h2 className="text-4xl font-semibold">Post a New Vacancy</h2>
      <div className="flex flex-col items-center justify-center mt-6">
        <form onSubmit={onClickSubmit} className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
          {validation && <p className="text-red-500 text-center mb-4">All details must be filled</p>}
          {postError && <p className="text-red-500 text-center mb-4">Unsuccessful Submission, please try again!</p>}
          {formSuccessful && <p className="text-green-500 text-center mb-4">Vacancy has been successfully posted!</p>}

          <input
            type="text"
            id="employerId"
            name="employerId"
            placeholder="Employer ID"
            value={employerId}
            onChange={(e) => setEmployerId(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            id="description"
            name="description"
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <input
            type="number"
            id="salary"
            name="salary"
            placeholder="Salary"
            value={salary || ''}
            onChange={(e) => {
              const value = e.target.value;
              const parsedValue = value === '' ? null : parseInt(value, 10);
              setSalary(parsedValue);
            }}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            id="contract"
            name="contract"
            placeholder="Contract Type (e.g., Full-time, Part-time)"
            value={contract}
            onChange={(e) => setContract(e.target.value)}
            required
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Post Vacancy
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterVacancy;
