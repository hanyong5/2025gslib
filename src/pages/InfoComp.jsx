import React from "react";

function InfoComp() {
  return (
    <div className="container m-auto px-6">
      <h1 className="text-[56px] font-bold mb-8">정보</h1>
      <div className="container">
        <a href="/info/seat">
          <div className="bg-amber-200 p-4 rounded-lg">
            <h2 className="text-2xl font-bold">열람실 실시간 좌석 정보</h2>
          </div>
        </a>
        <a href="/info/hours">
          <div className="bg-amber-200 p-4 rounded-lg">
            <h2 className="text-2xl font-bold">이용시간 및 휴관일</h2>
          </div>
        </a>
      </div>
      
     
    </div>
  );
}

export default InfoComp;
