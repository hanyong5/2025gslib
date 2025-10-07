import React from "react";
import InfoHomeImage from "../../components/InfoHomeImage";

function OperatingHoursComp() {
  const LIBRARIES = [
    {
      name: "강남도서관",
      phone: "3448-4741~5",
      closed: "1.3 수",
      url: "http://gnlib.sen.go.kr/gnlib/index.do",
    },
    {
      name: "강동도서관",
      phone: "483-0178, 0728",
      closed: "1.3 목",
      url: "http://gdlib.sen.go.kr/gdlib/index.do",
    },
    {
      name: "강서도서관",
      phone: "3219-7000",
      closed: "1.3 금",
      url: "http://gslib.sen.go.kr/gslib/index.do",
    },
    {
      name: "개포도서관",
      phone: "3462-1986~9",
      closed: "2.4 목",
      url: "http://gplib.sen.go.kr/gplib/index.do",
    },
    {
      name: "고척도서관",
      phone: "2615-0526~8",
      closed: "2.4 수",
      url: "http://gclib.sen.go.kr/gclib/index.do",
    },
    {
      name: "구로도서관",
      phone: "861-6491~5",
      closed: "1.3 수",
      url: "http://grlib.sen.go.kr/grlib/index.do",
    },
    {
      name: "남산도서관",
      phone: "754-7338",
      closed: "1.3 월",
      url: "http://nslib.sen.go.kr/nslib/index.do",
    },
    {
      name: "도봉도서관",
      phone: "906-2666~8",
      closed: "2.4 수",
      url: "http://dblib.sen.go.kr/dblib/index.do",
    },
    {
      name: "동대문도서관",
      phone: "2254-1844~7",
      closed: "2.4 수",
      url: "http://ddmlib.sen.go.kr/ddmlib/index.do",
    },
    {
      name: "동작도서관",
      phone: "823-6417~9",
      closed: "2.4 금",
      url: "http://djlib.sen.go.kr/djlib/index.do",
    },
    {
      name: "서대문도서관",
      phone: "396-3157~9",
      closed: "1.3 화",
      url: "http://sdmlib.sen.go.kr/sdmlib/index.do",
    },
    {
      name: "송파도서관",
      phone: "404-7914~7",
      closed: "2.4 화",
      url: "http://splib.sen.go.kr/splib/index.do",
    },
    {
      name: "양천도서관",
      phone: "2643-3806~7",
      closed: "1.3 목",
      url: "http://yclib.sen.go.kr/yclib/index.do",
    },
    {
      name: "어린이도서관",
      phone: "736-8912~3",
      closed: "1.3 월",
      url: "http://childlib.sen.go.kr/childlib/index.do",
    },
    {
      name: "용산도서관",
      phone: "754-3439",
      closed: "2.4 화",
      url: "http://yslib.sen.go.kr/yslib/index.do",
    },
    {
      name: "정독도서관",
      phone: "2011-5799",
      closed: "1.3 수",
      url: "http://jdlib.sen.go.kr/jdlib/index.do",
    },
    {
      name: "종로도서관",
      phone: "737-1703~5",
      closed: "2.4 월",
      url: "http://jnlib.sen.go.kr/jnlib/index.do",
    },
    {
      name: "고덕평생학습관",
      phone: "426-2063",
      closed: "2.4 월",
      url: "http://gdllc.sen.go.kr/gdllc/index.do",
    },
    {
      name: "마포평생학습관(본관)",
      phone: "2137-0000",
      closed: "2.4 월",
      url: "http://mpllc.sen.go.kr/mpllc/index.do",
    },
    {
      name: "마포평생학습관(분관)",
      phone: "362-8786",
      closed: "2.4 월",
      url: "http://ahyon.sen.go.kr/ahyon/index.do",
    },
    {
      name: "영등포평생학습관",
      phone: "2676-8884~6",
      closed: "2.4 월",
      url: "http://ydpllc.sen.go.kr/ydpllc/index.do",
    },
    {
      name: "노원평생학습관",
      phone: "979-1742~5",
      closed: "2.4 월",
      url: "http://nwllc.sen.go.kr/nwllc/index.do",
    },
  ];
  return (
    <div className="container m-auto px-6">
      <h1 className="text-[45px] font-bold mb-8">이용시간 및 휴관일</h1>
      {/* 
        자식 컨텐츠(이용시간, 휴관일 등)에 스크롤이 생기도록 
        overflow-y-auto와 max-h-screen(또는 원하는 높이) 스타일을 추가합니다.
        이렇게 하면 컨테이너 높이를 초과하는 자식 컨텐츠에 세로 스크롤이 표시됩니다.
      */}
      <div className="container bg-white rounded-3xl p-20 shadow-2xl overflow-y-auto max-h-[550px]">
        <h3 className="text-2xl font-bold mb-6">이용시간</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 font-semibold">
                  구분
                </th>
                <th className="border border-gray-300 px-4 py-3 font-semibold">
                  평일
                </th>
                <th className="border border-gray-300 px-4 py-3 font-semibold">
                  토,일요일
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-3 text-left">
                  인문사회자연과학실
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  09:00 - 20:00
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  09:00 - 17:00
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 text-left">
                  어린이자료실
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  09:00 - 20:00
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  09:00 - 17:00
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 text-left">
                  어문학·간행물실
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  09:00 - 18:00
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  09:00 - 17:00
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 text-left">
                  디지털자료실
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  09:00 - 18:00
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  09:00 - 17:00
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 text-left">
                  디지털자료실
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  <div>07:00 - 22:00 (하절기 3월 ~ 10월)</div>
                  <div>08:00 - 22:00 (동절기 11월 ~ 2월)</div>
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  <div>07:00 - 22:00 (하절기 3월 ~ 10월)</div>
                  <div>08:00 - 22:00 (동절기 11월 ~ 2월)</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-2xl font-bold mb-6 mt-8">휴관일</h3>
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-semibold text-blue-800 mr-2">•</span>
              <span>
                <strong>정기휴관일:</strong> 매월 첫째, 셋째 금요일
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-blue-800 mr-2">•</span>
              <span>
                <strong>법정 공휴일:</strong> 일요일을 제외한 법정 공휴일
                (일요일과 겹칠 경우 휴관)
              </span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold text-blue-800 mr-2">•</span>
              <span>
                <strong>임시휴관일:</strong> 도서정리, 보수공사, 장서점검 등의
                사유로 휴관이 필요하다고 관장이 지정하는 날
              </span>
            </li>
          </ul>
        </div>
        <h3 className="text-2xl font-bold mb-6">도서관별 휴관일</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 font-semibold">
                  도서관명
                </th>
                <th className="border border-gray-300 px-4 py-3 font-semibold">
                  전화
                </th>
                <th className="border border-gray-300 px-4 py-3 font-semibold">
                  휴관일
                </th>
                <th className="border border-gray-300 px-4 py-3 font-semibold">
                  홈페이지 주소
                </th>
              </tr>
            </thead>
            <tbody>
              {LIBRARIES.map((lib, idx) => (
                <tr
                  key={lib.name}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="border border-gray-300 px-4 py-3 text-left font-medium">
                    {lib.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    {lib.phone}
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    {lib.closed}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-left">
                    <a
                      href={lib.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="새창으로 열립니다."
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {lib.url}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* InfoHomeImage 컴포넌트를 사용하여 이미지와 링크를 분리된 컴포넌트로 관리합니다. */}
      <InfoHomeImage />
    </div>
  );
}

export default OperatingHoursComp;
