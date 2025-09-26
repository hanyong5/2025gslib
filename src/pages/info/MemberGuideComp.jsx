import React from "react";

function MemberGuideComp() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">회원가입안내</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                가입 대상
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>서울특별시 거주자</li>
                <li>서울특별시 소재 직장인</li>
                <li>서울특별시 소재 학교 재학생</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                가입 방법
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    온라인 가입
                  </h3>
                  <p className="text-blue-600 text-sm">
                    홈페이지에서 온라인으로 신청
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">
                    방문 가입
                  </h3>
                  <p className="text-green-600 text-sm">
                    도서관에 직접 방문하여 신청
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                필요 서류
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>신분증 (주민등록증, 운전면허증 등)</li>
                <li>주소 증명서류 (거주지 확인용)</li>
                <li>사진 1매 (방문 가입 시)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberGuideComp;
