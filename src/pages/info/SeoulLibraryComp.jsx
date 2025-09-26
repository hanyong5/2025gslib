import React from "react";

function SeoulLibraryComp() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          서울특별시교육청전자도서관
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                서비스 개요
              </h2>
              <p className="text-blue-700 mb-4">
                서울특별시교육청전자도서관은 디지털 시대에 맞는 다양한
                전자자료와 온라인 서비스를 제공하는 통합 전자도서관입니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">
                    주요 서비스
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                    <li>전자책 대출 서비스</li>
                    <li>온라인 데이터베이스 이용</li>
                    <li>원문정보 서비스</li>
                    <li>학술논문 검색</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">
                    이용 대상
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                    <li>서울시민</li>
                    <li>서울 소재 교육기관 구성원</li>
                    <li>서울 소재 직장인</li>
                    <li>서울 소재 학생</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                접속 방법
              </h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-600 mb-2">
                  웹사이트:{" "}
                  <span className="font-mono text-blue-600">
                    https://elib.sen.go.kr
                  </span>
                </p>
                <p className="text-gray-600 mb-2">
                  모바일 앱: 서울특별시교육청전자도서관
                </p>
                <p className="text-gray-600">회원가입 후 이용 가능</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                제공 자료
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">전자책</h3>
                  <p className="text-green-600 text-sm">약 50만 권</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 mb-2">
                    학술논문
                  </h3>
                  <p className="text-purple-600 text-sm">약 200만 건</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-800 mb-2">
                    멀티미디어
                  </h3>
                  <p className="text-orange-600 text-sm">약 10만 건</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeoulLibraryComp;
