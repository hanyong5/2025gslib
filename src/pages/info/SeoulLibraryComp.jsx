import React from "react";
import InfoHomeImage from "../../components/InfoHomeImage";

function SeoulLibraryComp() {
  return (
    <div className="container m-auto px-6">
      <h1 className="text-[45px] font-bold mb-8">
        서울특별시교육청 전자도서관
      </h1>
      <div className="container bg-white rounded-3xl p-6 shadow-2xl">
        <div
          style={{
            width: "100%",
            height: "500px",
            padding: "30px",
          }}
        >
          <iframe
            src="https://e-lib.sen.go.kr/main"
            style={{ width: "100%", height: "450px", border: "none" }}
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {/* InfoHomeImage 컴포넌트를 사용하여 이미지와 링크를 분리된 컴포넌트로 관리합니다. */}
      <InfoHomeImage />
    </div>
  );
}

export default SeoulLibraryComp;
