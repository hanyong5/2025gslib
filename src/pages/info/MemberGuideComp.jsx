import React from "react";
import InfoHomeImage from "../../components/InfoHomeImage";

function MemberGuideComp() {
  return (
    <div className="container m-auto px-6">
      <h1 className="text-[45px] font-bold mb-8">회원가입안내</h1>
      <div className="container bg-white rounded-3xl p-20 shadow-2xl overflow-y-auto max-h-[550px]">
        <div
          className="txt-box head_box text-2xl "
          style={{ lineHeight: "2" }}
        >
          <h3 className="text-3xl font-bold mb-6">가입절차</h3>

          <ul className="con2">
            <li className="mb-3">
              회원가입 전용 PC(자료실 비치) or 홈페이지(온라인대출회원신청)에서
              본인의 개인정보 입력 후(준회원) &nbsp;
              <br />
              →&nbsp;자료실 직원에게 준비물(회원가입시 필요한 서류) 제시&nbsp;
              <br />
              →&nbsp;대출회원증이 발급(정회원)되며 대출가능 <br />※ 홈페이지
              회원 가입 후 방문이 어려운 경우 비대면자격확인인증을 통해
              대출회원(정회원) 전환 가능
            </li>
            <li className="mb-3">
              대출회원증 재발급(분실 및 훼손) : 신분증 확인 후 재발급
              <br />
              (회원증 재발급 수수료(RF형 카드) : 성인 2,000원 / 중고생 1,500원 /
              초등학생 이하 1,000원)
            </li>
            <li className="mb-3">
              대출회원증을 분실 또는 훼손하여 재발급을 신청하는 경우
              "서울특별시립도서관 및 평생학습관 사용료징수 조례"에서 규정하는
              재발급 수수료를 이용자가 부담
            </li>

            <li>
              <h3 className="text-3xl font-bold mb-6 mt-6">발급장소</h3>
              <ul className="con2">
                <li>
                  일반성인, 중·고등학생 : 인문사회자연과학실(2층),
                  어문학·간행물실(3층)
                </li>
                <li>어린이 : 어린이자료실(1층)</li>
              </ul>
            </li>

            <li>
              <h3 className="text-3xl font-bold mb-6 mt-6">문의</h3>
              <ul className="con2">
                <li>인문사회자연과학실 ☎3219-7031</li>
                <li>어문학·간행물실 ☎3219-7041</li>
                <li>어린이자료실 ☎3219-7051</li>
              </ul>
            </li>

            <li>
              <h3 className="text-3xl font-bold mb-6 mt-6">회원종류</h3>
              <ul className="con2">
                <li>
                  준회원
                  <br />
                  * 자료실에 비치된 회원가입 전용 PC or 홈페이지상
                  온라인대출회원신청 이용자
                  <br />* 이용서비스 : 홈페이지, 디지털자료실 좌석예약시스템,
                  자율학습실, 노트북전용실 이용 및 각종 참여 신청 등 가능
                </li>
                <li>
                  정회원
                  <br />
                  * 관외대출회원
                  <br />
                  * 이용서비스 : 준회원이용서비스 뿐만 아니라 도서대출,
                  상호대차신청, 도서예약, 희망도서신청,
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;전자책,
                  웹 콘텐츠 등 멀티미디어 자료 이용가능
                </li>
              </ul>
            </li>

            <li>
              <h3 className="text-xl font-bold mt-6 mb-3">회원 유의사항</h3>
              <ul className="con2">
                <li>
                  회원증은 타인에게 대여하거나 양도할 수 없으며 대출한 자료는
                  본인이 책임을 집니다.
                </li>
                <li>
                  회원은 연락처의 변경, 이사 등으로 개인정보 변동이 있을
                  경우에는 반드시 도서관에 연락하여 그 내용을 수정 요구해야
                  반납독촉, 희망도서, 예약도서 도착알림 등의 문자 및 이메일
                  서비스를 정상적으로 받으실 수 있습니다.
                </li>
                <li>
                  대출증 분실 : 도서관 방문이나 전화로 분실신고를 하셔야
                  합니다.(신고하지 않은 대출증 분실에 따른 모든 책임은 회원
                  본인에게 있습니다.)
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      {/* InfoHomeImage 컴포넌트를 사용하여 이미지와 링크를 분리된 컴포넌트로 관리합니다. */}
      <InfoHomeImage />
    </div>
  );
}

export default MemberGuideComp;
