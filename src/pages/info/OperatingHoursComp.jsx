import React from "react";

function OperatingHoursComp() {
  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          이용시간 및 휴관일
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                이용시간
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">평일</span>
                  <span className="text-gray-600">09:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">토요일</span>
                  <span className="text-gray-600">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">일요일</span>
                  <span className="text-gray-600">09:00 - 18:00</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                휴관일
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600">• 매주 월요일</p>
                <p className="text-gray-600">• 법정공휴일</p>
                <p className="text-gray-600">• 도서관 사정에 의한 임시휴관</p>
                <p className="text-gray-600">• 연말연시 (12/31, 1/1)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OperatingHoursComp;
