'use client';
import { CREATE_APPLICANT_PROFILE, UPLOAD_CV } from '../../../libs/graphql/graphql.queries';
import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { DialogProvider } from '../../../context/DialogProvider';
import NavBar from '../../../components/nav/NavBar';
import convertFileToBase64 from '../../../libs/utils/uploadFile';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

export default function page() {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [city, setCity] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [validation, setValidation] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [formSuccessful, setFormSuccessful] = useState(false);
  const [createdNow, setCreatedNow] = useState(new Date());

  const [createApplicant, { loading, error }] = useMutation(CREATE_APPLICANT_PROFILE);
  const [uploadCV, { loading: loadingCV, error: errorCV }] = useMutation(UPLOAD_CV);
  // const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => setCreatedNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const onClickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!lastName || !firstName || !email || !password || !telephone || !city || !cvFile) {
      setValidation(true);
      return;
    }

    setValidation(false);
    setRegisterError(false);

    try {
      const formData = new FormData();
      formData.append('lastName', lastName);
      formData.append('firstName', firstName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('telephone', telephone);
      formData.append('city', city);
      formData.append('cv', cvFile);

      await createApplicant({
        variables: {
          lastName,
          firstName,
          email,
          password,
          telephone,
          city,
        },
      });

      console.log(cvFile);

      var base64 = await convertFileToBase64(cvFile);
      console.log(base64);

      await uploadCV({
        variables: {
          file: base64,
          email: email,
          filename: cvFile.name,
          uploaded: format(createdNow, 'MMMM d, yyyy'),
          type: cvFile.type,
          size: cvFile.size,
        },
      });

      setFormSuccessful(true);
      // router.push('/');
    } catch (err) {
      setRegisterError(true);
    }
  };

  return (
    <div>
      <DialogProvider>
        <NavBar />
      </DialogProvider>
      <h2 className="text-3xl font-semibold flex items-baseline justify-center p-4">Register as an Applicant</h2>
      <div className="registerApplicantTitle text-center py-8 flex sm:flex-row-reverse m-4 items-center justify-center flex-col">
        <div className="text-wrap w-2xl p-3">
          <h2 className="font bold text-2xl">Data Protection and GDPR Compliance</h2>
          <p>
            At Landsea Staffing, your data privacy is our top priority. We adhere to the strictest data protection standards, including the General Data Protection Regulation
            (GDPR), to ensure that your personal information is handled with the utmost care and security.
          </p>
          <p>
            By registering with Landsea Staffing, you acknowledge our commitment to data protection and GDPR compliance. Your trust is essential to us, and we're here to ensure
            your data is handled responsibly and securely.
          </p>
          <p>
            If you have any questions or concerns regarding your data, please don't hesitate to contact us at{' '}
            <a className="font bold underline text-blue-500" href="mailto:info@landseastaffing.com">
              info@landseastaffing.com
            </a>
            . Thank you for choosing Landsea Staffing for your recruitment needs. Feel free to use this message on your registration page to communicate your company's commitment
            to data protection and GDPR compliance to your users.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mt-6">
          <form onSubmit={onClickSubmit} className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg" encType="multipart/form-data">
            {validation && <p className="text-red-500 text-center mb-4">All fields including CV must be filled</p>}
            {registerError && <p className="text-red-500 text-center mb-4">Submission failed. Please try again.</p>}
            {formSuccessful && <p className="text-green-500 text-center mb-4">Applicant successfully registered!</p>}

            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCvFile(e.target.files?.[0] || null)}
              required
              className="w-full mb-6 bg-amber-100 p-3 border border-gray-300 rounded-lg shadow-2xs"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg shadow-2xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
