'use client';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ADMIN_LOGIN } from '../../../libs/graphql/graphql.queries';
import { ADMIN_ID, ADMIN_LOGIN_ENABLED, AUTH_TOKEN } from '../../../libs/graphql/constants';
import { redirect, useRouter } from 'next/navigation';

export default function page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { data, loading, error }] = useLazyQuery(ADMIN_LOGIN);
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await login({
        variables: { email, password },
      });
      if (data) {
        if (data.adminsLogin.token != 'Not Found') {
          console.log(data);
          localStorage.setItem(AUTH_TOKEN, data.adminsLogin.token);
          localStorage.setItem(ADMIN_ID, data.adminsLogin.id);
          localStorage.setItem(ADMIN_LOGIN_ENABLED, 'true');
          router.push('/'); // Redirect to the dashboard after successful login
        } else {
          console.log('Incorrects');
        }
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Login
        </button>
      </form>
    </div>
  );
}
