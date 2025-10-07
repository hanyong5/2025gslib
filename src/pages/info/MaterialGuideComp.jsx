import React, { useState } from "react";
import InfoHomeImage from "../../components/InfoHomeImage";

function MaterialGuideComp() {
  const [activeTab, setActiveTab] = useState("자료대출");

  const tabs = [
    { id: "자료대출", label: "자료대출" },
    { id: "택배대출", label: "택배대출" },
    { id: "복사 및 출력", label: "복사 및 출력" },
    { id: "스마트도서관", label: "스마트도서관" },
  ];

  const tabContents = {
    자료대출: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          📚 자료대출 안내
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">
              대출 가능 자료
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 일반도서 (소설, 에세이, 교양서 등)</li>
              <li>• 아동도서 (어린이, 청소년 도서)</li>
              <li>• 참고도서 (사전, 백과사전 등)</li>
              <li>• DVD, CD 등 멀티미디어 자료</li>
            </ul>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-800">
              대출 규정
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 대출 권수: 10권 (일반회원)</li>
              <li>• 대출 기간: 14일</li>
              <li>• 연장 가능: 1회 7일</li>
              <li>• 예약 가능: 3권까지</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    택배대출: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          📦 택배대출 안내
        </h2>
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-yellow-800">
            택배대출 서비스
          </h3>
          <p className="text-gray-700 mb-4">
            집에서 편리하게 도서를 대출하고 택배로 받아볼 수 있는 서비스입니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">이용 방법</h4>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>온라인에서 도서 검색 및 대출 신청</li>
                <li>택배비 결제 (선불)</li>
                <li>도서 배송 (1-2일 소요)</li>
                <li>반납 시 택배로 발송</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">이용 요금</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• 택배비: 3,000원 (편도)</li>
                <li>• 대출 기간: 14일</li>
                <li>• 연장 가능: 1회 7일</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
    "복사 및 출력": (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          🖨️ 복사 및 출력 안내
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              복사 서비스
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• A4 흑백: 100원/장</li>
              <li>• A4 컬러: 500원/장</li>
              <li>• A3 흑백: 200원/장</li>
              <li>• A3 컬러: 1,000원/장</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">
              출력 서비스
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• USB 파일 출력</li>
              <li>• 이메일 파일 출력</li>
              <li>• 스마트폰 무선 출력</li>
              <li>• 스캔 서비스 제공</li>
            </ul>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-800">
              이용 안내
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 운영시간: 09:00-18:00</li>
              <li>• 결제방법: 현금, 카드</li>
              <li>• 저작권 준수</li>
              <li>• 개인정보 보호</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    스마트도서관: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          📱 스마트도서관 안내
        </h2>
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-purple-800">
            24시간 무인 서비스
          </h3>
          <p className="text-gray-700 mb-4">
            언제든지 편리하게 도서를 대출하고 반납할 수 있는 무인 도서관
            서비스입니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">주요 기능</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• 무인 대출/반납</li>
                <li>• 도서 검색 및 예약</li>
                <li>• 전자책 대출</li>
                <li>• 독서실 좌석 예약</li>
                <li>• 프로그램 신청</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">이용 방법</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>스마트폰 앱 다운로드</li>
                <li>회원가입 및 로그인</li>
                <li>QR코드 스캔으로 대출</li>
                <li>무인 반납함 이용</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="container m-auto px-6">
      <div className="flex items-center mb-8 gap-20">
        <h1 className="text-[45px] font-bold">자료이용안내</h1>
        <div className="btn-box flex gap-8 text-2xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn rounded-lg p-2 px-6 font-bold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-blue-400 text-white hover:bg-blue-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="container content bg-white rounded-3xl p-20 shadow-2xl overflow-y-auto max-h-[550px]">
        {tabContents[activeTab]}
      </div>
      {/* InfoHomeImage 컴포넌트를 사용하여 이미지와 링크를 분리된 컴포넌트로 관리합니다. */}
      <InfoHomeImage />
    </div>
  );
}

export default MaterialGuideComp;
