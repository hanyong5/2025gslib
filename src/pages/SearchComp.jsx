import React, { useState, useRef } from "react";

function SearchComp() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
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
      const response = await fetch(
        `/api/keyword_book_search?keyword=${encodeURIComponent(
          keyword
        )}&pageNum=${pageNum}`
      );

      if (!response.ok) {
        throw new Error("검색 요청에 실패했습니다.");
      }

      // 응답이 JSON인지 확인
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("서버에서 JSON 형식이 아닌 응답을 받았습니다.");
      }

      const data = await response.json();

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

      if (err instanceof SyntaxError && err.message.includes("JSON")) {
        errorMessage =
          "서버 응답 형식이 올바르지 않습니다. 잠시 후 다시 시도해주세요.";
      } else if (err.message) {
        errorMessage = err.message;
      }

      console.error("검색 에러:", err);
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

  return (
    <div className="container m-auto px-6 relative">
      <h1 className="text-[56px] font-bold mb-8">도서 검색</h1>

      {/* 검색 입력 필드 */}
      <div className="mb-8">
        <div className="flex gap-4 max-w-2xl">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="검색할 도서명 또는 키워드를 입력하세요"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "검색중..." : "도서검색"}
          </button>
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
        <div ref={resultsRef} className="space-y-3">
          {/* 검색 정보 */}
          <div className="bg-gray-50 p-4 rounded-lg absolute top-10 right-0">
            <p className="text-lg font-semibold">
              "{searchResults.keyword}" 검색 결과 총 {searchResults.totalItems}
              권의 도서가 발견되었습니다. (페이지 {
                searchResults.currentPage
              } / {searchResults.totalPages})
            </p>
          </div>

          {/* 도서 목록 */}
          <div className="grid gap-6  lg:grid-cols-5">
            {searchResults.books.slice(0, 5).map((book, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  {/* 도서 이미지 */}
                  <div className="mb-3">
                    <img
                      src={book.bImg}
                      alt={book.bookname}
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/200x300?text=No+Image";
                      }}
                    />
                  </div>

                  {/* 도서 정보 */}
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg line-clamp-2 leading-tight">
                      {book.bookname}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">저자:</span> {book.author}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">출판사:</span>{" "}
                      {book.publisher} ({book.year})
                    </p>
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">위치:</span> {book.loc} -{" "}
                      {book.studyRoom}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">청구기호:</span> {book.code}
                    </p>

                    {/* 대출 상태 */}
                    <div className="mt-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          book.state === "대출가능"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {book.state}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
              <nav className="flex items-center space-x-2">
                {/* 이전 페이지 버튼 */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isLoading}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
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
                        className={`px-3 py-2 text-sm font-medium border rounded-md ${
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
                        <span key="end-ellipsis" className="px-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    pages.push(
                      <button
                        key={totalPages}
                        onClick={() => handlePageChange(totalPages)}
                        className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
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
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  다음
                </button>
              </nav>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchComp;
