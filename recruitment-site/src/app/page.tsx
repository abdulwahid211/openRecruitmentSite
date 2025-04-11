'use client';
import { StaticImageData } from 'next/image';
import NavBar from '../../components/nav/NavBar';
import { DialogProvider } from '../../context/DialogProvider';
import { useEffect, useState } from 'react';

export default function Home() {
  const backgrounds: string[] = [
    '/assets/slides/nurse.jpg',
    '/assets/slides/office.jpg',
    '/assets/slides/planning.jpg',
    '/assets/slides/builders.jpg',
    '/assets/slides/cooking.jpg',
  ];

  const [currentBackground, setCurrentBackground] = useState<string>(backgrounds[0]);

  useEffect(() => {
    let current = 0;
    setCurrentBackground(backgrounds[current]);
    var interval = setInterval(() => {
      current = (current + 1) % backgrounds.length;
      setCurrentBackground(backgrounds[current]);
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col">
      <DialogProvider>
        <NavBar />
      </DialogProvider>
      <div className="w-full">
        <div
          className="relative flex flex-col justify-center items-center w-full h-screen bg-cover bg-center animate-fadeIn transition-all duration-1000"
          style={{ backgroundImage: `url(${currentBackground})` }}
        >
          <div className="absolute inset-0 bg-black/50 z-0"></div> {/* Optional: dark overlay for contrast */}
          <div className="relative z-0 flex flex-col items-center">
            <img src="/assets/logobannerwhite.png" alt="Logo" className="w-1/3 md:w-1/2 sm:w-3/4 mb-10" />
            <h2 className="text-white text-[3.5vw] sm:text-[6vw] font-bold text-center leading-tight">• Inspire • Grow • Lead</h2>
          </div>
        </div>
      </div>

      <div className="bg-[#fff9f1] flex flex-col items-center text-center px-6 md:px-16 py-16">
        <h2 className="text-[#004d90] font-bold text-4xl md:text-5xl mb-8">About Us</h2>
        <p className="text-[#004d90] font-semibold text-lg md:text-xl leading-loose mb-8">
          LandSea Staffing is a recruitment agency, providing locum and permanent staff to clients nationwide. We aim to give our candidates and clients a personable, professional,
          and focused customer experience and always endeavor to meet your needs. We are confident in our ability to supply only the highest caliber of medical professionals in the
          industry. With access to our continuously growing database of fully vetted candidates, and as a preferred supplier to both NHS and private care organisations, our team of
          experienced consultants can assist in all areas. When you use our services, you can be fully assured that you will be receiving a highly cost-effective solution to your
          staffing requirements.
        </p>
        <a href="/register">
          <button className="bg-[#ffbb6d] hover:bg-[#a86f2e] text-[#004d90] hover:text-white font-extrabold py-4 px-10 text-xl rounded-xl transition-colors duration-300">
            Join Us
          </button>
        </a>
      </div>

      <footer className="text-center py-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()}{' '}
        <a href="https://abdulwahid.uk" className="hover:underline hover:text-white transition">
          abdulwahid.uk
        </a>
        . All rights reserved.
      </footer>
    </div>
  );
}
