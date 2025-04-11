import React from 'react';
import NavBar from '../../../components/nav/NavBar';
import { DialogProvider } from '../../../context/DialogProvider';

export default function page() {
  return (
    <div>
      <DialogProvider>
        <NavBar />
      </DialogProvider>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Contact Us</h2>
        </div>

        <div className="space-y-10">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="mb-4">
              At <strong>LandSeaStaffing Recruitment</strong>, we value open communication with our clients and job seekers. Whether you have questions, need assistance, or want to
              explore opportunities with us, this is the place to start.
            </p>
            <p>Feel free to reach out to us through any of the following means:</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Contact Information:</h3>
            <ul className="space-y-2">
              <li>
                <strong>LandSeaStaffing Ltd</strong>
              </li>
              <li>
                <strong>Address:</strong> Chelsea House, Chelsea Street, New Basford, Nottingham, NG7 7HP
              </li>
              <li>
                <strong>City:</strong> Nottingham, UK
              </li>
              <li>
                <strong>Telephone:</strong>{' '}
                <a href="tel:(555)555-5555" className="text-blue-600 hover:underline">
                  (555) 555-5555
                </a>
              </li>
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:info@landseastaffing.com" className="text-blue-600 hover:underline">
                  info@landseastaffing.com
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Hours of Operation:</h3>
            <ul>
              <li>
                <strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM
              </li>
              <li>
                <strong>Saturday - Sunday:</strong> Closed
              </li>
            </ul>
          </div>
        </div>
        <footer className="text-center py-6 text-sm text-gray-500">
          &copy; {new Date().getFullYear()}{' '}
          <a href="https://abdulwahid.uk" className="hover:underline hover:text-white transition">
            abdulwahid.uk
          </a>
          . All rights reserved.
        </footer>
      </div>
    </div>
  );
}
