exports.handler = async (event, context) => {
  // CORS 헤더 설정
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  // OPTIONS 요청 처리 (preflight)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    const { strDate } = event.queryStringParameters || {};

    if (!strDate) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "strDate parameter is required" }),
      };
    }

    // 원본 API 호출
    const apiUrl = `http://101.55.20.4:8000/api/kangseo_library/get_sche?strDate=${strDate}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.text();

    return {
      statusCode: 200,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: data,
    };
  } catch (error) {
    console.error("Error:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
