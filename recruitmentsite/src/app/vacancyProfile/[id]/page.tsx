'use client';

import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_VACANCY_PROFILE, CHECK_APPLIED_JOBS, CREATE_APPLIED_JOBS } from '../../../../libs/graphql/graphql.queries';
import { APPLICANT_ID } from '../../../../libs/graphql/constants';
import { format } from 'date-fns';
import { Vacancy } from '../../../../models/Vacancy';
import { useParams } from 'next/navigation';
import NavBar from '../../../../components/nav/NavBar';
import { DialogProvider } from '../../../../context/DialogProvider';

export default function page() {
  const params = useParams();
  const id = params?.id as string;
  const vacancyId = Number(id);

  const [jobAlreadyApplied, setJobAlreadyApplied] = useState(false);
  const [jobAppliedSuccessful, setJobAppliedSuccessful] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [vacancy, setVacancy] = useState<Vacancy>();
  const [applicantID, setApplicantID] = useState<string>('0');

  useEffect(() => {
    const id = localStorage.getItem(APPLICANT_ID);
    if (id) setApplicantID(id);
  }, []);

  const { data: profileData } = useQuery(GET_VACANCY_PROFILE, {
    variables: { vacancyId },
    skip: !vacancyId,
  });

  const { data: appliedCheckData } = useQuery(CHECK_APPLIED_JOBS, {
    variables: { vacancyId, applicantId: Number(applicantID) },
    skip: !vacancyId || applicantID === '0',
  });

  const [createAppliedJob] = useMutation(CREATE_APPLIED_JOBS);

  useEffect(() => {
    if (profileData?.vacancy) {
      setVacancy(profileData.vacancy);
    }

    if (appliedCheckData) {
      const applied = appliedCheckData.verifyAlreadyAppliedJob;
      setJobAlreadyApplied(applied);
      setDisableButton(applied || applicantID === '0');
    }
  }, [profileData, appliedCheckData, applicantID]);

  const handleApply = async () => {
    if (applicantID !== '0') {
      const { data } = await createAppliedJob({
        variables: {
          applicantId: Number(applicantID),
          vacancyId,
        },
      });
      const success = data?.createAppliedJobs;
      setJobAppliedSuccessful(success);
      setDisableButton(success);
    } else {
      // Redirect or open a login modal
      alert('Please log in to apply.');
    }
  };

  if (!vacancy) return <p>Loading...</p>;

  return (
    <div>
      <DialogProvider>
        <NavBar />
      </DialogProvider>
      <div className="vacancy-profile max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8 space-y-8">
        <div className="titleVacancyProfile space-y-4 border-b pb-6">
          <h1 className="text-3xl font-bold text-gray-900">{vacancy.title}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-gray-700 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-xl">💰</span>
              <span>{vacancy.salary}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl">🏙️</span>
              <span>{vacancy.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl">⏰</span>
              <span>{vacancy.contract}</span>
            </div>
            <div className="flex items-center space-x-2 col-span-2 sm:col-span-1">
              <span className="text-xl">📅</span>
              <span>Posted: {format(new Date(vacancy.created), 'd MMMM, yyyy')}</span>
            </div>
          </div>

          <div className="mt-4">
            <a href="/vacancies" className="inline-flex items-center text-sm text-blue-600 hover:underline">
              🔁 Go Back
            </a>
          </div>
        </div>

        <div className="info space-y-4">
          <div className="jobDescription">
            <h2 className="text-2xl font-semibold text-gray-800">Job Description</h2>
          </div>
          <p className="text-gray-600 font-medium">Roles & Responsibilities:</p>
          <p className="description text-gray-700 leading-relaxed">{vacancy.description}</p>

          {jobAlreadyApplied && (
            <div id="jobAlreadyApplied" className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
              <h3>(You have already applied for this job!)</h3>
            </div>
          )}

          {jobAppliedSuccessful && (
            <div id="jobAppliedSucessful" className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md">
              <h3>(Thank you for submitting your CV, we will contact you if you have been successful!)</h3>
            </div>
          )}

          <button
            disabled={disableButton}
            onClick={handleApply}
            className={`mt-6 w-full sm:w-auto px-6 py-2 rounded-lg transition-colors font-medium ${
              disableButton ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Send CV
          </button>
        </div>
      </div>
    </div>
  );
}
