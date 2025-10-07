exports.handler = async (event, context) => {
  // CORS 헤더 설정
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // OPTIONS 요청 처리 (CORS preflight)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    // 쿼리 파라미터 추출
    const { url, type } = event.queryStringParameters || {};

    if (!url || !type) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "url과 type 파라미터가 필요합니다." }),
      };
    }

    // 외부 API 호출
    const apiUrl = `http://101.55.20.4:8000/api/kangseo_library/get_sche_detail_info?url=${encodeURIComponent(
      url
    )}&type=${type}`;

    console.log(`Fetching event detail for URL: ${url}, Type: ${type}`);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.text();

    return {
      statusCode: 200,
      headers,
      body: data,
    };
  } catch (error) {
    console.error("에러:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "서버 오류가 발생했습니다.",
        details: error.message,
      }),
    };
  }
};
