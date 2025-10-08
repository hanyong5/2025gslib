import React, { useState } from "react";

function EduComp() {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // 주간 달력 데이터 생성
  const getWeekDates = (date) => {
    const week = [];
    const currentDate = new Date(date);

    // 해당 주의 일요일을 찾기
    const dayOfWeek = currentDate.getDay();
    const sunday = new Date(currentDate);
    sunday.setDate(currentDate.getDate() - dayOfWeek);

    // 일요일부터 토요일까지 7일 생성
    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(sunday);
      weekDate.setDate(sunday.getDate() + i);
      week.push(weekDate);
    }

    return week;
  };

  // 날짜 포맷팅
  const formatDate = (date) => {
    return date.toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
    });
  };

  // 요일 포맷팅
  const formatDay = (date) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[date.getDay()];
  };

  // 오늘 날짜 확인
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // 샘플 일정 데이터
  const sampleEvents = {
    "2025-10-01": [
      { time: "09:00", title: "도서관 오픈", type: "open" },
      { time: "14:00", title: "독서모임", type: "event" },
      { time: "18:00", title: "문화강좌", type: "class" },
    ],
    "2024-12-17": [
      { time: "10:00", title: "어린이 프로그램", type: "kids" },
      { time: "15:00", title: "작가와의 만남", type: "event" },
    ],
    "2024-12-18": [
      { time: "11:00", title: "전시회", type: "exhibition" },
      { time: "19:00", title: "독서토론회", type: "discussion" },
    ],
    "2024-12-19": [
      { time: "13:00", title: "도서관 투어", type: "tour" },
      { time: "16:00", title: "IT 교육", type: "class" },
    ],
    "2024-12-20": [
      { time: "09:30", title: "새책 소개", type: "book" },
      { time: "14:30", title: "영화 상영", type: "movie" },
    ],
  };

  // 주간 이동 함수
  const goToPreviousWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(newWeek.getDate() - 7);
    setCurrentWeek(newWeek);
  };

  const goToNextWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(newWeek.getDate() + 7);
    setCurrentWeek(newWeek);
  };

  const goToCurrentWeek = () => {
    setCurrentWeek(new Date());
  };

  const weekDates = getWeekDates(currentWeek);

  return (
    <div className="container m-auto px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[56px] font-bold">교육일정안내</h1>
        {/* <div className="">
          <div className="flex items-center gap-2 justify-end">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-300 rounded"></div>
              <span>특별행사</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-300 rounded"></div>
              <span>교육강좌</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-300 rounded"></div>
              <span>어린이 프로그램</span>
            </div>
          </div>
          <div className="text-gray-500">
            * 일정을 클릭하면 상세 정보를 확인할 수 있습니다.
          </div>
        </div> */}
      </div>

      {/* 주간 네비게이션 */}
      <div className="mb-3 flex items-center justify-between text-2xl">
        <button
          onClick={goToPreviousWeek}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          ← 이전 주
        </button>

        <div className="text-center flex items-center gap-5">
          <h2 className="text-3xl font-semibold">
            {(() => {
              const startMonth = weekDates[0].getMonth();
              const endMonth = weekDates[6].getMonth();
              const startYear = weekDates[0].getFullYear();
              const endYear = weekDates[6].getFullYear();

              const startMonthName = weekDates[0].toLocaleDateString("ko-KR", {
                month: "long",
              });
              const endMonthName = weekDates[6].toLocaleDateString("ko-KR", {
                month: "long",
              });

              if (startYear === endYear) {
                // 같은 년도인 경우
                if (startMonth === endMonth) {
                  // 같은 월인 경우
                  return `${startYear}년 ${startMonthName}`;
                } else {
                  // 다른 월인 경우
                  return `${startYear}년 ${startMonthName} - ${endMonthName}`;
                }
              } else {
                // 다른 년도인 경우
                return `${startYear}년 ${startMonthName} - ${endYear}년 ${endMonthName}`;
              }
            })()}
          </h2>
          <p className="text-gray-600">
            {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
          </p>
        </div>

        <div className="flex gap-2 text-2xl">
          <button
            onClick={goToCurrentWeek}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            오늘
          </button>
          <button
            onClick={goToNextWeek}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            다음 주 →
          </button>
        </div>
      </div>

      {/* 주간 달력 */}
      <div className="grid grid-cols-7 gap-4 mb-8">
        {weekDates.map((date, index) => {
          const dateKey = date.toISOString().split("T")[0];
          const events = sampleEvents[dateKey] || [];

          return (
            <div
              key={index}
              className={`bg-white border-3 rounded-lg p-4 min-h-[500px] ${
                isToday(date) ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
            >
              {/* 날짜 헤더 */}
              <div className="text-center mb-4 text-2xl">
                <div
                  className={`font-medium ${
                    isToday(date) ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {formatDay(date)}
                </div>
                <div
                  className={`font-bold ${
                    isToday(date) ? "text-blue-800" : "text-gray-800"
                  }`}
                >
                  {date.getDate()}
                </div>
                {/* 날짜별 일정 요약 */}
                {events.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="text-xs text-gray-500">
                      {events.length}개 일정
                    </div>
                  </div>
                )}
              </div>

              {/* 일정 목록 */}
              <div className="space-y-2">
                {events.length > 0 ? (
                  events.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`p-2 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity ${
                        event.type === "event"
                          ? "bg-green-100 text-green-800"
                          : event.type === "class"
                          ? "bg-blue-100 text-blue-800"
                          : event.type === "kids"
                          ? "bg-yellow-100 text-yellow-800"
                          : event.type === "exhibition"
                          ? "bg-purple-100 text-purple-800"
                          : event.type === "discussion"
                          ? "bg-orange-100 text-orange-800"
                          : event.type === "tour"
                          ? "bg-pink-100 text-pink-800"
                          : event.type === "book"
                          ? "bg-indigo-100 text-indigo-800"
                          : event.type === "movie"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {/* <div className="font-medium">{event.time}</div> */}
                      <div className="text-lg">{event.title}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-400 text-xs text-center py-4">
                    일정 없음
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EduComp;
