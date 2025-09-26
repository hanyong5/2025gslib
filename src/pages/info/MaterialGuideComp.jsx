import React from "react";

function MaterialGuideComp() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">자료이용안내</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                자료 종류
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 mb-2">도서</h3>
                  <p className="text-purple-600 text-sm">
                    일반도서, 참고도서, 아동도서
                  </p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-800 mb-2">
                    전자자료
                  </h3>
                  <p className="text-orange-600 text-sm">
                    e-book, 온라인 데이터베이스
                  </p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <h3 className="font-semibold text-teal-800 mb-2">
                    시청각자료
                  </h3>
                  <p className="text-teal-600 text-sm">DVD, CD, 비디오테이프</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                대출 규정
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2">
                        자료 종류
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        대출 권수
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        대출 기간
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        연장 가능
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        일반도서
                      </td>
                      <td className="border border-gray-300 px-4 py-2">10권</td>
                      <td className="border border-gray-300 px-4 py-2">14일</td>
                      <td className="border border-gray-300 px-4 py-2">2회</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        아동도서
                      </td>
                      <td className="border border-gray-300 px-4 py-2">5권</td>
                      <td className="border border-gray-300 px-4 py-2">7일</td>
                      <td className="border border-gray-300 px-4 py-2">1회</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        시청각자료
                      </td>
                      <td className="border border-gray-300 px-4 py-2">3개</td>
                      <td className="border border-gray-300 px-4 py-2">7일</td>
                      <td className="border border-gray-300 px-4 py-2">1회</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaterialGuideComp;
