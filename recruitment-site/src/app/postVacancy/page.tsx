'use client';
import React, { useEffect, useState } from 'react'; // Ensure React is imported for JSX
import { DialogProvider } from '../../../context/DialogProvider';
import NavBar from '../../../components/nav/NavBar';
import { ADMIN_LOGIN_ENABLED } from '../../../libs/graphql/constants';
import { useRouter } from 'next/navigation';
import { CREATE_VACANCY_PROFILE } from '../../../libs/graphql/graphql.queries';
import { useMutation } from '@apollo/client';
import DropDownSectors from '../../../components/dropdown/DropDownSectors';

export default function page() {
  const router = useRouter(); // Initialize useRouter
  const [employerId, setEmployerId] = useState<number>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState<string>('');
  const [location, setLocation] = useState('');
  const [selectedSector, setSelectedSector] = useState('Select Sector');
  const [contract, setContract] = useState('');
  const [validation, setValidation] = useState(false);
  const [postError, setPostError] = useState(false);
  const [formSuccessful, setFormSuccessful] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  const [createVacancy, { loading, error, data }] = useMutation(CREATE_VACANCY_PROFILE);

  const onClickSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (employerId === null || !title || !description || salary === null || !location || !contract) {
      setValidation(true);
      return;
    }

    // Call the mutation to create a vacancy
    await createVacancy({
      variables: {
        employerId: employerId,
        title: title,
        description: description,
        salary: salary,
        location: location,
        contract: contract,
        sector: selectedSector,
        created: dateTime.getUTCDate() + '/' + (dateTime.getUTCMonth() + 1) + '/' + dateTime.getUTCFullYear(),
      },
    });

    // Add logic for form submission, e.g., API call to post the vacancy
    // If submission is successful:
    setFormSuccessful(true);
    setValidation(false);
    setPostError(false);

    if (error) {
      setPostError(true);
    }

    // If error occurs:
    // setPostError(true);
  };

  useEffect(() => {
    const adminLoginEnabled = localStorage.getItem(ADMIN_LOGIN_ENABLED);

    if (adminLoginEnabled !== 'true') {
      router.push('/'); // Redict back
    }
  }, [router]);

  return (
    <div>
      <DialogProvider>
        <NavBar />
      </DialogProvider>
      <div className="postVacancyTitle text-center py-8">
        <h2 className="text-4xl font-semibold">Post a New Vacancy</h2>
        <div className="flex flex-col items-center justify-center mt-6">
          <form onSubmit={onClickSubmit} className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
            {validation && <p className="text-red-500 text-center mb-4">All details must be filled</p>}
            {postError && <p className="text-red-500 text-center mb-4">Unsuccessful Submission, please try again!</p>}
            {formSuccessful && <p className="text-green-500 text-center mb-4">Vacancy has been successfully posted!</p>}

            <input
              type="number"
              id="employerId"
              name="employerId"
              placeholder="Employer ID"
              value={employerId}
              onChange={(e) => setEmployerId(parseInt(e.target.value))}
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
            <DropDownSectors selected={selectedSector} setSelected={setSelectedSector} />
            <input
              type="text"
              id="salary"
              name="salary"
              placeholder="Salary"
              value={salary || ''}
              onChange={(e) => setSalary(e.target.value)}
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
    </div>
  );
}
