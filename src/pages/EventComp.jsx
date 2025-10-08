import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

function EventComp() {
  const [currentWeek, setCurrentWeek] = useState(new Date()); // 오늘 날짜로 초기 설정
  const [eventsData, setEventsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

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

  // 주간 데이터 로드
  const loadWeekEvents = useCallback(async (weekDates) => {
    setLoading(true);
    setError(null);

    // API에서 일정 데이터 가져오기
    const fetchEventsForDate = async (date) => {
      const dateStr = date.toISOString().split("T")[0].replace(/-/g, "");

      // 환경에 따른 API URL 설정
      const isProduction = import.meta.env.PROD;
      let apiUrl;

      if (isProduction) {
        // 프로덕션: Netlify Functions 사용
        apiUrl = `/.netlify/functions/event-search?strDate=${dateStr}`;
      } else {
        // 개발: Vite 프록시 사용
        apiUrl = `/api/kangseo_library/get_sche?strDate=${dateStr}`;
      }

      console.log(`Fetching events for date: ${dateStr}, URL: ${apiUrl}`);
      console.log("현재 환경:", isProduction ? "프로덕션" : "개발");

      try {
        const response = await axios.get(apiUrl);
        console.log(`Raw response for ${dateStr}:`, response.data);

        // axios는 자동으로 JSON 파싱을 수행하지만,
        // API가 JSON 문자열을 반환하므로 다시 파싱이 필요할 수 있음
        let data;
        if (typeof response.data === "string") {
          try {
            data = JSON.parse(response.data);
          } catch (parseError) {
            console.error(`Error parsing JSON for ${dateStr}:`, parseError);
            return [];
          }
        } else {
          data = response.data;
        }

        console.log(`Parsed data for ${dateStr}:`, data);
        return data;
      } catch (error) {
        console.error(`Error fetching events for ${dateStr}:`, error);
        return [];
      }
    };

    try {
      const promises = weekDates.map(async (date) => {
        const events = await fetchEventsForDate(date);
        return { date: date.toISOString().split("T")[0], events };
      });

      const results = await Promise.all(promises);
      const eventsMap = {};

      console.log("All API results:", results);

      results.forEach(({ date, events }) => {
        console.log(`Processing events for ${date}:`, events);
        eventsMap[date] = events.map((event) => ({
          title: event.title,
          type:
            event.type === "e"
              ? "event"
              : event.type === "m"
              ? "movie"
              : event.type === "r"
              ? "holiday"
              : "other",
          url: event.url, // API에서 시간 정보가 없으므로 기본값 설정
        }));
      });

      console.log("Final events map:", eventsMap);
      setEventsData(eventsMap);
    } catch (error) {
      setError("일정 데이터를 불러오는 중 오류가 발생했습니다.");
      console.error("Error loading week events:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEventDetail = async (rawUrl, rawType) => {
    // 1) type 매핑 (이미 e/m/r가 들어오면 그대로 사용)
    const typeMap = { event: "e", movie: "m", holiday: "r" };
    const type = typeMap[rawType] ?? rawType; // 'e' | 'm' | 'r' | 그 외 그대로

    try {
      // 환경에 따른 API URL 설정
      const isProduction = import.meta.env.PROD;
      let apiUrl;

      if (isProduction) {
        // 프로덕션: Netlify Functions 사용
        apiUrl = `/.netlify/functions/event-detail?url=${encodeURIComponent(
          rawUrl
        )}&type=${type}`;
      } else {
        // 개발: Vite 프록시 사용
        apiUrl = `/api/kangseo_library/get_sche_detail_info?url=${encodeURIComponent(
          rawUrl
        )}&type=${type}`;
      }

      const response = await axios.get(apiUrl, {
        // (선택) 네트워크 안전장치
        timeout: 10000,
        validateStatus: (status) => status >= 200 && status < 500,
      });

      console.log("Detail response:", response.data);

      // 3) 서버가 JSON을 문자열로 보내는 경우 대비
      let data = response.data;
      if (typeof data === "string") {
        // BOM, XSSI prefix 제거 (선택)
        const cleaned = data
          .replace(/^\uFEFF/, "")
          .replace(/^\)\]\}',?\s*/, "");
        try {
          data = JSON.parse(cleaned);
        } catch (parseError) {
          console.error("Error parsing detail JSON:", parseError);
          return null;
        }
      }

      console.log("Parsed detail data:", data);

      // 4) 데이터가 비어있거나 null인 경우 기본 데이터 생성
      if (
        !data ||
        !data.content ||
        Object.values(data.content).every((val) => val === null || val === "")
      ) {
        console.log("No detailed data available, creating fallback data");
        return {
          type: type,
          content: {
            title: "상세 정보 없음",
            period: null,
            time: null,
            day: null,
            place: null,
            target: null,
            teacher: null,
            apply: null,
            genre: null,
            runtimeMin: null,
            material: null,
            image: null,
            descHtml: null,
          },
        };
      }

      return data;
    } catch (error) {
      console.error("Error fetching event detail:", error);
      // 에러 발생 시에도 기본 데이터 반환
      return {
        type: type,
        content: {
          title: "정보를 불러올 수 없습니다",
          period: null,
          time: null,
          day: null,
          place: null,
          target: null,
          teacher: null,
          apply: null,
          genre: null,
          runtimeMin: null,
          material: null,
          image: null,
          descHtml: null,
        },
      };
    }
  };

  // 모달 열기
  const openModal = async (event) => {
    console.log("Opening modal for event:", event);
    if (!event.url) {
      console.log("No URL provided for event");
      return;
    }

    // 기본 데이터로 즉시 모달 열기
    const initialData = {
      type: event.type,
      content: {
        title: event.title,
      },
      originalUrl: event.url,
    };

    setModalData(initialData);
    setModalOpen(true);

    // 백그라운드에서 상세 정보 로드
    console.log("Fetching detail for:", event.url, event.type);
    const detailData = await fetchEventDetail(event.url, event.type);
    console.log("Detail data received:", detailData);

    // 상세 데이터가 있으면 업데이트
    if (detailData) {
      detailData.originalUrl = event.url;
      setModalData(detailData);
    }
    console.log("Modal data set:", detailData);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
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

  // 주간이 변경될 때마다 데이터 로드
  useEffect(() => {
    const weekDates = getWeekDates(currentWeek);
    loadWeekEvents(weekDates);
  }, [currentWeek, loadWeekEvents]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && modalOpen) {
        closeModal();
      }
    };

    if (modalOpen) {
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden"; // 스크롤 방지
    } else {
      document.body.style.overflow = "unset"; // 스크롤 복원
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [modalOpen]);

  return (
    <div className="container m-auto px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[56px] font-bold mb-5">도서관 주간일정</h1>
        <div className="">
          <div className="flex items-center gap-2 justify-end">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-300 rounded"></div>
              <span>교육/강좌</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-300 rounded"></div>
              <span>영화/시청각</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-300 rounded"></div>
              <span>휴관일</span>
            </div>
          </div>
          <div className="text-gray-500">
            * 일정을 클릭하면 상세 정보를 확인할 수 있습니다.
          </div>
        </div>
      </div>

      {/* 로딩 상태 */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <p className="mt-2 text-gray-600">일정을 불러오는 중...</p>
        </div>
      )}

      {/* 에러 상태 */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* 주간 네비게이션 */}
      <div className="mb-3 flex items-center justify-between  text-2xl">
        <button
          onClick={goToPreviousWeek}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          ← 이전 주
        </button>

        <div className="text-center flex items-center gap-5">
          <h2 className="text-3xl font-semibold">
            {(() => {
              const weekDates = getWeekDates(currentWeek);
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
            {(() => {
              const weekDates = getWeekDates(currentWeek);
              return `${formatDate(weekDates[0])} - ${formatDate(
                weekDates[6]
              )}`;
            })()}
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
      {!loading && (
        <div className="grid grid-cols-7 gap-4 mb-8 ">
          {getWeekDates(currentWeek).map((date, index) => {
            const dateKey = date.toISOString().split("T")[0];
            const events = eventsData[dateKey] || [];

            return (
              <div
                key={index}
                className={`bg-white border-3 rounded-lg p-4 min-h-[550px] ${
                  isToday(date)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                {/* 날짜 헤더 */}
                <div className="text-center mb-4  text-2xl">
                  <div
                    className={` font-medium ${
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
                            : event.type === "movie"
                            ? "bg-red-100 text-red-800"
                            : event.type === "holiday"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                        onClick={() => openModal(event)}
                      >
                        {/* <div className="font-medium">{event.time}</div> */}
                        <div className="text-lg">
                          {event.type == "movie" ? "[영화] " : ""}
                          {event.title}
                        </div>
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
      )}

      {/* 상세보기 모달 */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black flex items-center justify-center z-50 p-6"
          onClick={closeModal}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full h-[700px] overflow-hidden p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="text-3xl font-bold">일정 상세 정보</h3>
                <span
                  className={`inline-flex px-6 py-2 rounded-full text-xl font-medium ${
                    modalData.type === "e"
                      ? "bg-green-100 text-green-800"
                      : modalData.type === "m"
                      ? "bg-red-100 text-red-800"
                      : modalData.type === "r"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {modalData.type === "e"
                    ? "교육/강좌"
                    : modalData.type === "m"
                    ? "영화/시청각"
                    : modalData.type === "r"
                    ? "휴관일"
                    : "기타"}
                </span>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* 모달 내용 */}
            <div className="p-4 overflow-y-auto  h-full ">
              {modalData && modalData.content ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 ">
                  {/* 프로그램 상태 */}
                  <div className="lg:col-span-2 ">
                    <div className="bg-gray-50 rounded-lg">
                      <div>
                        <img
                          src={modalData.content.image}
                          alt=""
                          className=" object-cover rounded-lg"
                          style={{ height: "500px" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 프로그램 정보 */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* 기본 정보 */}

                    <div className="bg-gray-50 rounded-lg">
                      <div className="space-y-2">
                        <div>
                          <label className="block text-sm text-gray-600">
                            프로그램명
                          </label>
                          <p className="text-2xl font-bold text-gray-900 bg-white p-3 rounded-lg">
                            {modalData.content?.title || "정보 없음"}
                          </p>
                        </div>
                        {modalData.content?.period &&
                          modalData.content.period !== null &&
                          typeof modalData.content.period === "string" && (
                            <div>
                              <label className="block text-sm text-gray-600">
                                기간
                              </label>
                              <p className="text-gray-900 bg-white p-3 rounded-lg">
                                {modalData.content.period}
                              </p>
                            </div>
                          )}
                        {modalData.content?.time &&
                          modalData.content.time !== null &&
                          typeof modalData.content.time === "string" && (
                            <div>
                              <label className="block text-sm text-gray-600">
                                시간
                              </label>
                              <p className="text-gray-900 bg-white p-3 rounded-lg">
                                {modalData.content.time}
                              </p>
                            </div>
                          )}
                        {modalData.content?.place &&
                          modalData.content.place !== null &&
                          typeof modalData.content.place === "string" && (
                            <div>
                              <label className="block text-sm text-gray-600">
                                장소
                              </label>
                              <p className="text-gray-900 bg-white p-3 rounded-lg">
                                {modalData.content.place}
                              </p>
                            </div>
                          )}
                        {modalData.content?.target &&
                          modalData.content.target !== null &&
                          typeof modalData.content.target === "string" && (
                            <div>
                              <label className="block text-sm text-gray-600">
                                대상
                              </label>
                              <p className="text-gray-900 bg-white p-3 rounded-lg">
                                {modalData.content.target}
                              </p>
                            </div>
                          )}
                        {/* {modalData.originalUrl && (
                          <div>
                            <label className="block text-sm text-gray-600">
                              자세한 정보
                            </label>
                            <pre className="bg-gray-100 rounded-lg p-3 text-sm overflow-x-auto whitespace-pre-wrap">
                              {JSON.stringify(modalData.content, null, 2)}
                            </pre>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-yellow-50 rounded-lg p-6">
                    <svg
                      className="w-12 h-12 text-yellow-500 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      상세 정보 없음
                    </h3>
                    <p className="text-gray-600 mb-4">
                      이 프로그램의 상세 정보를 불러올 수 없습니다.
                    </p>
                    <p className="text-sm text-gray-500">
                      원본 사이트에서 더 자세한 정보를 확인해보세요.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 모달 푸터 */}
            <div className="flex justify-end items-center">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventComp;
