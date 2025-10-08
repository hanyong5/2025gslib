import React, { useState, useRef } from "react";

function SearchComp() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const resultsRef = useRef(null);

  // 검색 결과 영역으로 부드럽게 스크롤하는 함수
  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // API 호출 함수
  const fetchBooks = async (keyword, pageNum = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      // 환경에 따른 API URL 설정
      const isProduction = import.meta.env.PROD;
      let apiUrl;

      if (isProduction) {
        // 프로덕션: Netlify Functions 사용
        apiUrl = `/.netlify/functions/book-search?keyword=${encodeURIComponent(
          keyword
        )}&pageNum=${pageNum}`;
      } else {
        // 개발: Vite 프록시 사용
        apiUrl = `/api/keyword_book_search?keyword=${encodeURIComponent(
          keyword
        )}&pageNum=${pageNum}`;
      }

      console.log("API 요청 URL:", apiUrl); // 디버깅용
      console.log("현재 환경:", isProduction ? "프로덕션" : "개발");

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("검색 요청에 실패했습니다.");
      }

      // 응답이 JSON인지 확인
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("서버에서 JSON 형식이 아닌 응답을 받았습니다.");
      }

      const data = await response.json();
      console.log("받은 데이터:", data);

      // 응답 데이터 유효성 검사
      if (!data || typeof data !== "object") {
        throw new Error("잘못된 데이터 형식입니다.");
      }

      if (!data.books || !Array.isArray(data.books)) {
        throw new Error("도서 데이터를 찾을 수 없습니다.");
      }

      setSearchResults(data);
      setCurrentPage(pageNum);

      // 검색 결과가 있을 때만 스크롤 (첫 검색 시에만)
      if (pageNum === 1 && data.books && data.books.length > 0) {
        // 약간의 지연을 두어 DOM 업데이트 후 스크롤 실행
        setTimeout(() => {
          scrollToResults();
        }, 100);
      }
    } catch (err) {
      let errorMessage = "검색 중 오류가 발생했습니다.";

      if (err.name === "TypeError" && err.message.includes("Failed to fetch")) {
        errorMessage =
          "네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인하고 다시 시도해주세요.";
      } else if (err instanceof SyntaxError && err.message.includes("JSON")) {
        errorMessage =
          "서버 응답 형식이 올바르지 않습니다. 잠시 후 다시 시도해주세요.";
      } else if (err.message) {
        errorMessage = err.message;
      }

      console.error("검색 에러:", err);
      console.error("에러 타입:", err.name);
      console.error("에러 메시지:", err.message);
      setError(errorMessage);
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 검색 실행 함수
  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      setError("검색어를 입력해주세요.");
      return;
    }

    await fetchBooks(searchKeyword, 1);
  };

  // 페이지 변경 함수
  const handlePageChange = async (pageNum) => {
    if (!searchKeyword.trim()) return;
    await fetchBooks(searchKeyword, pageNum);
  };

  // 엔터키 검색 처리
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // 모달 열기
  const openModal = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="container m-auto px-6 relative">
      <h1 className="text-[56px] font-bold mb-3">도서 검색</h1>

      {/* 검색 입력 필드 */}
      <div className="mb-4 flex justify-center flex-col items-center">
        <div>
          <div className="flex gap-4 max-w-4xl">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="검색할 도서명 입력하세요"
              className="flex-1 px-5 py-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white font-bold text-2xl w-2xl"
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-2xl"
            >
              {isLoading ? "검색중..." : "도서검색"}
            </button>
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>

      {/* 검색 결과 */}
      {searchResults && (
        <div
          ref={resultsRef}
          className="space-y-2"
        >
          {/* 검색 정보 */}
          <div className="p-4 rounded-lg absolute top-10 right-0">
            <p className="text-lg font-semibold">
              "{searchResults.keyword}" 검색 결과 총 {searchResults.totalItems}
              권의 도서가 발견되었습니다. (페이지 {
                searchResults.currentPage
              } / {searchResults.totalPages})
            </p>
          </div>

          {/* 도서 목록 */}
          <div className="hidden gap-4 justify-center text-xl">
            <button className="px-6 py-2 bg-pink-500 text-white rounded-lg ">
              도서
            </button>
            <button className="px-6 py-2 bg-gray-400 d text-white rounded-lg">
              비도서
            </button>
            <button className="px-6 py-2 bg-gray-400 d text-white rounded-lg">
              간행물
            </button>
            <button className="px-6 py-2 bg-gray-400 d text-white rounded-lg">
              전자도서관
            </button>
          </div>
          <div className="grid gap-6 lg:grid-cols-5 relative">
            {searchResults.books.slice(0, 5).map((book, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-md transition-shadow"
              >
                <div>
                  {/* 도서 이미지 */}
                  <div className="mb-3 h-[280px] overflow-hidden">
                    <img
                      src={book.bImg}
                      alt={book.bookname}
                      className="w-full h-[100px] object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/200x300?text=No+Image";
                      }}
                    />
                  </div>

                  {/* 도서 정보 */}
                  <div className="space-y-2 p-4 flex flex-col justify-between h-[200px]">
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-2 leading-tight mb-2">
                        {book.bookname}
                      </h3>
                      {/* <p className="text-gray-600 text-sm">
                      <span className="font-medium">저자:</span> {book.author}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">출판사:</span>{" "}
                      {book.publisher} ({book.year})
                    </p> */}
                      <p className="text-gray-600 text-xl ">{book.studyRoom}</p>
                      {/* <p className="text-gray-600 text-sm">
                      <span className="font-medium">청구기호:</span> {book.code}
                    </p> */}
                    </div>

                    {/* 대출 상태 */}
                    <div className="mt-3 items-end flex justify-between">
                      <span
                        className={`inline-block px-6 py-2 rounded-full text-lg font-medium ${
                          book.state === "대출가능"
                            ? "bg-green-100 text-green-900"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {book.state}
                      </span>
                      <button
                        onClick={() => openModal(book)}
                        className="px-6 py-2 rounded-full text-lg font-medium bg-blue-400 text-white hover:bg-blue-500 transition-colors"
                      >
                        상세보기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || isLoading}
              className="px-5 py-5  font-medium text-white bg-pink-500 border border-gray-300 rounded-full  disabled:opacity-50 disabled:cursor-not-allowed absolute top-[50%] left-[-20px] "
            >
              이전
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === searchResults.totalPages || isLoading}
              className="px-5 py-5  font-medium text-white bg-pink-500 border border-gray-300 rounded-full  disabled:opacity-50 disabled:cursor-not-allowed absolute top-[50%] right-[-20px]"
            >
              다음
            </button>
          </div>

          {/* 더 많은 결과 안내 */}
          {searchResults.books.length > 5 && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <p className="text-blue-700">
                현재 처음 5개의 도서만 표시됩니다. 전체{" "}
                {searchResults.books.length}개의 도서 중 일부입니다.
              </p>
            </div>
          )}

          {/* 페이지네이션 */}
          {searchResults.totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2 text-2xl">
                {/* 이전 페이지 버튼 */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isLoading}
                  className="px-3 py-2  font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  이전
                </button>

                {/* 페이지 번호들 */}
                {(() => {
                  const pages = [];
                  const totalPages = searchResults.totalPages;
                  const startPage = Math.max(1, currentPage - 2);
                  const endPage = Math.min(totalPages, currentPage + 2);

                  // 첫 페이지가 1이 아니면 ... 표시
                  if (startPage > 1) {
                    pages.push(
                      <button
                        key={1}
                        onClick={() => handlePageChange(1)}
                        className="px-3 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        1
                      </button>
                    );
                    if (startPage > 2) {
                      pages.push(
                        <span
                          key="start-ellipsis"
                          className="px-2 text-gray-500"
                        >
                          ...
                        </span>
                      );
                    }
                  }

                  // 현재 페이지 주변 페이지들
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-3 py-2  font-medium border rounded-md ${
                          i === currentPage
                            ? "text-blue-600 bg-blue-50 border-blue-500"
                            : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {i}
                      </button>
                    );
                  }

                  // 마지막 페이지가 마지막이 아니면 ... 표시
                  if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                      pages.push(
                        <span
                          key="end-ellipsis"
                          className="px-2 text-gray-500"
                        >
                          ...
                        </span>
                      );
                    }
                    pages.push(
                      <button
                        key={totalPages}
                        onClick={() => handlePageChange(totalPages)}
                        className="px-3 py-2  font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        {totalPages}
                      </button>
                    );
                  }

                  return pages;
                })()}

                {/* 다음 페이지 버튼 */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage === searchResults.totalPages || isLoading
                  }
                  className="px-3 py-2  font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  다음
                </button>
              </nav>
            </div>
          )}
        </div>
      )}

      {/* 도서 상세보기 모달 */}
      {modalOpen && selectedBook && (
        <div
          className="fixed inset-0 bg-black  flex items-center justify-center z-50 p-6"
          onClick={closeModal}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full h-[500px] overflow-hidden p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-3xl font-bold">도서 상세 정보</h3>
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
            <div className="p-6 overflow-y-auto h-full ">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 도서 이미지 */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-lg text-center">
                    <img
                      src={selectedBook.bImg}
                      alt={selectedBook.bookname}
                      className="w-full h-80 object-cover rounded-lg mx-auto shadow-xl mb-3 border-2 border-gray-300"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x400?text=No+Image";
                      }}
                    />
                    <span
                      className={`inline-flex px-6 py-2 rounded-full text-xl font-medium ${
                        selectedBook.state === "대출가능"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedBook.state}
                    </span>
                  </div>
                </div>

                {/* 도서 정보 */}
                <div className="lg:col-span-2 space-y-6">
                  {/* 기본 정보 */}
                  <div className="bg-gray-50 rounded-lg">
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm  text-gray-600">
                          도서명
                        </label>
                        <p className="text-2xl font-bold text-gray-900 bg-white p-3 rounded-lg">
                          {selectedBook.bookname}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm  text-gray-600 ">
                          저자
                        </label>
                        <p className="text-gray-900 bg-white p-3 rounded-lg">
                          {selectedBook.author}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm  text-gray-600 ">
                          출판사
                        </label>
                        <p className="text-gray-900 bg-white p-3 rounded-lg ">
                          {selectedBook.publisher} ({selectedBook.year})
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm  text-gray-600 ">
                          자료실
                        </label>
                        <p className="text-gray-900 bg-white p-3 rounded-lg ">
                          {selectedBook.studyRoom}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm  text-gray-600 ">
                          청구기호
                        </label>
                        <p className="text-gray-900 bg-white p-3 rounded-lg ">
                          {selectedBook.code}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 소장 정보 */}
                </div>
              </div>
            </div>

            {/* 모달 푸터 */}
            <div className="flex justify-end items-center ">
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

export default SearchComp;
