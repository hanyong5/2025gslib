import React from "react";
import { Link } from "react-router-dom";
import InfoHomeImage from "../../components/InfoHomeImage";

function SeatInfoComp() {
  return (
    <div className="container m-auto px-6">
      <h1 className="text-[56px] font-bold mb-8">열람실 실시간 좌석 정보</h1>
      <div className="container bg-white rounded-3xl p-6 shadow-2xl">
        {/* 
          아래 코드는 iframe을 화면 전체(부모 컨테이너 기준)로 꽉 차게 표시합니다.
          width, height를 100%로 지정하고, border를 없앱니다.
          부모 컨테이너가 충분한 높이를 가지도록 min-h-screen을 추가하는 것도 고려할 수 있습니다.
        */}
        <div style={{ width: "100%", height: "500px" }}>
          <iframe
            src="http://gslib-seat.sen.go.kr/domian5.php"
            style={{ width: "100%", height: "500px", border: "none" }}
            title="열람실 실시간 좌석 정보"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* InfoHomeImage 컴포넌트를 사용하여 이미지와 링크를 분리된 컴포넌트로 관리합니다. */}
      <InfoHomeImage />
    </div>
  );
}

export default SeatInfoComp;
