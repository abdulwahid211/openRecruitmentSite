'use client';
import React, { useEffect, useState } from 'react';
import MenuBar from '../components/MenuBar';
import { DialogProvider } from '../context/DialogProvider';
import { useQuery } from '@apollo/client';
import { GET_ALL_APPLICANTS, GET_VACANCIES } from '../graphql/graphql.queries';
import { Vacancy } from '../models/Vacancy';
import VacancyCard from '../components/vacancy/VacancyCard';

export default function page() {
  const { loading, error, data } = useQuery(GET_VACANCIES);

  const [vacancies, setVacancies] = useState<Vacancy[]>();

  useEffect(() => {
    if (!loading && data?.vacancies) {
      setVacancies(data.vacancies);
    }
  }, [loading, data]);

  return (
    <div>
      <DialogProvider>
        <MenuBar />
      </DialogProvider>
      <ul className="flex flex-col xl:flex-row">
        {loading ? (
          <div>Loading...</div>
        ) : (
          vacancies?.map((vacancy) => (
            <li key={vacancy.vacancyID}>
              <VacancyCard vacancy={vacancy} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
