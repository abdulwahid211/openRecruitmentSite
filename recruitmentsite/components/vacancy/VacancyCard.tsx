'use client';
import { Vacancy } from '../../models/Vacancy';
import React from 'react';
import { RiMoneyPoundCircleFill } from 'react-icons/ri';
import { FaLocationDot } from 'react-icons/fa6';
import { MdDateRange } from 'react-icons/md';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function VacancyCard({ vacancy }: { vacancy: Vacancy }) {
  const iconSrc = `/assets/icons/${vacancy.sector.replace(/\s/g, '')}.png`;
  const router = useRouter();

  const goToVacancyProfile = () => {
    var url = `/vacancyProfile/${vacancy.vacancyID}`;
    router.push(url);
  };

  return (
    <div className="rounded-xl p-7 xl:p-5 m-2 shadow-lg bg-[#fff9f1] transition-transform duration-500 hover:scale-110">
      <div>
        <div className="flex flex-row pl-4">
          <img src={iconSrc} alt={`${vacancy.sector} icon`} className="h-auto w-20 object-contain pr-4" />
          <div>
            <h2 className="text-xl font-bold">{vacancy.title}</h2>
            <p className="text-gray-600">{vacancy.sector}</p>
          </div>
        </div>

        <ul className="flex flex-col list-none p-3 text-black">
          <li className="p-2 flex flex-rows p-1 text-20">
            <RiMoneyPoundCircleFill size={30} />
            <span className="pl-2 pt-0.5 font-bold"> {vacancy.salary}</span>
          </li>
          <li className="p-2 flex flex-rows p-1 text-20">
            <FaLocationDot size={30} />
            <span className="pl-2 pt-0.5 font-bold"> {vacancy.location}</span>
          </li>
          <li className="p-2 flex flex-rows p-1 text-20">
            <MdDateRange size={30} />
            <span className="pl-2 pt-0.5 font-bold"> {format(vacancy.created, 'd MMMM, yyyy')}</span>
          </li>
        </ul>

        <div className="flex justify-center">
          <button onClick={goToVacancyProfile}>
            <div className="bg-[#ffbb6d] hover:bg-[#a86f2e] text-white font-bold py-2 px-20 rounded-full text-lg  text-center">Details</div>
          </button>
        </div>
      </div>
    </div>
  );
}
