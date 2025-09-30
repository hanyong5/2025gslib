import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import SearchCamp from './pages/SearchComp';
import EventComp from './pages/EventComp';
import InfoComp from './pages/InfoComp';
import EduComp from './pages/EduComp';
import HomeComp from './pages/HomeComp';
import SeatInfoComp from './pages/info/SeatInfoComp';
import OperatingHoursComp from './pages/info/OperatingHoursComp';
import MemberGuideComp from './pages/info/MemberGuideComp';
import MaterialGuideComp from './pages/info/MaterialGuideComp';
import SeoulLibraryComp from './pages/info/SeoulLibraryComp';

function App() {
  const [isInfoDropdownOpen, setIsInfoDropdownOpen] = useState(false);

  return (
    <>
      <div className="container-fluid  relative px-6 py-6">
        <nav className="absolute left-0 z-10 ">
          <ul className="flex justify-center items-center gap-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">room</Link>
            </li>
            <li>
              <Link to="/event">equip</Link>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setIsInfoDropdownOpen(true)}
              onMouseLeave={() => setIsInfoDropdownOpen(false)}
            >
              <Link to="/info" className="flex items-center">
                usage
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>
              {isInfoDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-20">
                  <Link
                    to="/info/seat"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsInfoDropdownOpen(false)}
                  >
                    열람실 실시간 좌석 정보
                  </Link>
                  <Link
                    to="/info/hours"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsInfoDropdownOpen(false)}
                  >
                    이용시간 및 휴관일
                  </Link>
                  <Link
                    to="/info/member"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsInfoDropdownOpen(false)}
                  >
                    회원가입안내
                  </Link>
                  <Link
                    to="/info/material"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsInfoDropdownOpen(false)}
                  >
                    자료이용안내
                  </Link>
                  <Link
                    to="/info/seoul-library"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsInfoDropdownOpen(false)}
                  >
                    서울특별시교육청전자도서관
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link to="/edu">edu</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomeComp />}></Route>
          <Route path="/search" element={<SearchCamp />}></Route>
          <Route path="/event" element={<EventComp />}></Route>
          <Route path="/info" element={<InfoComp />}></Route>
          <Route path="/info/seat" element={<SeatInfoComp />}></Route>
          <Route path="/info/hours" element={<OperatingHoursComp />}></Route>
          <Route path="/info/member" element={<MemberGuideComp />}></Route>
          <Route path="/info/material" element={<MaterialGuideComp />}></Route>
          <Route
            path="/info/seoul-library"
            element={<SeoulLibraryComp />}
          ></Route>
          <Route path="/edu" element={<EduComp />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
