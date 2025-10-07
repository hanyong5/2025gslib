import React from "react";
import { Link } from "react-router-dom";

function InfoComp() {
  return (
    <div className="container m-auto px-6">
      <h1 className="text-[56px] font-bold mb-8">도서관 안내</h1>
      <div className="container grid grid-cols-4 gap-5">
        <Link
          to="/info/seat"
          className="bg-white p-4 rounded-lg shadow-xl"
        >
          <div className="text-center flex flex-col items-center justify-center gap-5 p-5">
            <img
              src="./images/info01_01.png"
              style={{ height: "145px" }}
            />
            <h2 className="text-2xl">열람실 좌석 정보</h2>
          </div>
        </Link>
        <Link
          to="/info/hours"
          className="bg-white p-4 rounded-lg shadow-xl"
        >
          <div className="text-center flex flex-col items-center justify-center gap-5 p-5">
            <img
              src="./images/info01_02.png"
              style={{ height: "145px" }}
            />
            <h2 className="text-2xl">이용시간 및 휴관일</h2>
          </div>
        </Link>
        <Link
          to="/info/member"
          className="bg-white p-4 rounded-lg shadow-xl"
        >
          <div className="text-center flex flex-col items-center justify-center gap-5 p-5">
            <img
              src="./images/info01_03.png"
              style={{ height: "145px" }}
            />
            <h2 className="text-2xl">회원가입안내</h2>
          </div>
        </Link>
        <Link
          to="/info/material"
          className="bg-white p-4 rounded-lg shadow-xl"
        >
          <div className="text-center flex flex-col items-center justify-center gap-5 p-5">
            <img
              src="./images/info01_04.png"
              style={{ height: "145px" }}
            />
            <h2 className="text-2xl">자료이용안내</h2>
          </div>
        </Link>

        <Link
          to="/info/seoul-library"
          className="bg-white p-4 rounded-lg shadow-xl"
        >
          <div className="text-center flex flex-col items-center justify-center gap-5 p-5">
            <img
              src="./images/info01_05.png"
              style={{ height: "145px" }}
            />
            <h2 className="text-2xl">
              서울특별시교육청
              <br />
              전자도서관
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default InfoComp;
