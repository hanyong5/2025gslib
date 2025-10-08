import React, { useState } from "react";
import InfoHomeImage from "../../components/InfoHomeImage";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MaterialGuideComp() {
  const [activeTab, setActiveTab] = useState("자료대출");

  const tabs = [
    { id: "자료대출", label: "자료대출" },
    { id: "택배대출", label: "택배대출" },
    { id: "복사 및 출력", label: "복사 및 출력" },
    { id: "스마트도서관", label: "스마트도서관" },
  ];

  const tabContents = {
    자료대출: (
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">자료대출 안내</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {/* 도서대출 */}
          <h3 className="text-2xl font-bold text-gray-800">
            {" "}
            <FontAwesomeIcon
              icon={faBook}
              className="mr-2"
            />
            도서대출
          </h3>
          <ul
            title="도서대출"
            className="list-disc ml-10 space-y-3 text-xl text-gray-700 mb-10"
          >
            <li>대출권수 : 도서 10권, 간행물 5권, 비도서 5점</li>
            <li>대출기간 : 14일</li>
            <li>
              대출방법 : 대출 시 반드시 통합대출회원카드 제시, 본인만 대출가능
              <br />
              (대출카드를 제시하지 않으면 반납은 가능하나 대출은 불가능)
            </li>
            <li>
              재대출 : 반납과 동시에 재대출 가능(단, 예약된 도서는 재대출 불가)
            </li>
            <li>
              대출제한도서 : 귀중자료(고서, 희귀본 등), 참고자료(서지류, 사전류,
              도감류 등), 기타 대출제한이 필요하다고
              <br />
              인정되는 자료, 도서검색 시 소장된 자료실이 '순회문고'로 구분된
              자료
            </li>
            <li>
              서고도서 : 도서검색 시 소장된 자료실이 '~서고'로 구분되어 있는
              도서는 직원에게 문의하여 이용
            </li>
            <li>
              대출자료연체 : 연체자료에 대해 연체료납부와 대출정지를 선택
              <br />
              ※서울특별시립도서관 및 평생학습 사용료 징수 등 에 관한 조례
              <br />- 대출자료의 반납을 연체하였을 때에는 1책당 1일 100원의
              연체료를 부과하되,
              <br />
              부과금액이 해당자료의 시가를 초과할 수 없다.
              <br />
              예) 10권 2일 연체 시 → 10권×2일×100원=2000원 연체료부과
              <br />- 연체료를 납부하지 않을 경우에는 사유가 발생한 날부터 1책당
              연체일 수만큼 대출을 일시 정지하되, 대출정지기간은
              <br />
              1년 이내로 한다.
              <br />
              예) 10권 2일 연체 시 → 10권×2일=20일 정지
            </li>
            <li>
              분실도서 변상 : 분실 및 훼손도서는 동일 도서로 변상함을 원칙으로
              하며, 동일도서를 구할 수 없을 경우 도서의
              <br />현 시가로 변상
            </li>
            <li>
              문 &nbsp;&nbsp;&nbsp;&nbsp; 의 : 인문사회자연과학실 ☎3219-7031
              &nbsp; 어문학·간행물실 ☎3219-7041 &nbsp; 어린이자료실 ☎3219-7051
              &nbsp; 디지털자료실 ☎3219-7061
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-800">
            {" "}
            <FontAwesomeIcon
              icon={faBook}
              className="mr-2"
            />
            전자책(E-book)대출
          </h3>
          <ul
            title="전자책(E-book)대출"
            className="list-disc ml-10 space-y-3 text-xl text-gray-700 mb-10"
          >
            <li>
              이용대상 : 서울특별시교육청 도서관/평생학습관 관외대출회원(정회원)
              <br />
            </li>
            <li>대출권수 : 1인당 5권</li>
            <li>대출기간 : 7일(1회에 한하여 7일 연장)</li>
            <li>반 &nbsp;&nbsp; 납 : 7일 후 자동반납(대출 후 바로 반납가능)</li>
            <li>비 &nbsp;&nbsp; 용 : 무료</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-800">
            {" "}
            <FontAwesomeIcon
              icon={faBook}
              className="mr-2"
            />
            반납
          </h3>
          <ul className="list-disc ml-10 space-y-3 text-xl text-gray-700 mb-10">
            <li>반납예정일까지 대출한 자료실에 반납</li>
            <li>
              휴관일 및 자료실 이용시간 이후에는 현관입구에 있는 무인반납시스템
              이용
            </li>
            <li>
              무인반납시스템 운영시간 : 평일 20:00 이후, 주말 17:00 이후(반납된
              도서는 소급하여 처리)
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-800">
            {" "}
            <FontAwesomeIcon
              icon={faBook}
              className="mr-2"
            />
            대출연기
          </h3>
          <ul className="list-disc ml-10 space-y-3 text-xl text-gray-700 mb-10">
            <li>
              도서, 비도서 연기는 반납일 전에 대출 정지 상태가 아닌 경우에만
              가능
            </li>
            <li>
              방문 또는 전화, 홈페이지로 1회에 한하여 7일간 대출 기한을 연장할
              수 있음
            </li>
            <li>예약자료도 반납연기 가능함</li>
            <li>
              연기불가 : 연체 중인 자료가 있을 때는 다른 자료들도 연기불가
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-800">
            {" "}
            <FontAwesomeIcon
              icon={faBook}
              className="mr-2"
            />
            대출예약
          </h3>
          <ul className="list-disc ml-10 space-y-3 text-xl text-gray-700 mb-10">
            <li>
              예약방법 : 방문 또는 전화, 홈페이지에서 가능("관외대출 중"인
              도서만 가능)
            </li>
            <li>예약가능권수 : 1인당 3권</li>
            <li>예약가능인원 : 1책당 3명</li>
            <li>예약유효일수 : 3일</li>
            <li>
              예약정지 : 1개월간 예약신청자료를 3건 이상 취소(미대출)한 경우
              1개월간의 예약신청자격을 정지
            </li>
            <li>
              도서검색 시 비치자료는 자료 선택항목이 비활성화 됨(예약불가)
            </li>
            <li>대출연체로 인한 대출정지 시에는 예약도서의 대출이 불가능</li>
            <li>예약한 도서가 반납(도착)시 SMS 안내문자 발송</li>
            <li>
              해당 날짜(연락 받은 후 3일 이내)까지 예약도서를 대출하지 않을 시
              자동으로 예약 취소 됨
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-800">
            {" "}
            <FontAwesomeIcon
              icon={faBook}
              className="mr-2"
            />
            야간대출예약
          </h3>
          <ul className="list-disc ml-10 space-y-3 text-xl text-gray-700 mb-10">
            <li>
              자료실 운영시간 이후에도 도서관을 방문하여 도서를 이용하고자 하는
              분들을 위한 서비스 입니다.
            </li>
            <li>
              대상자료 : 인문사회자연과학실, 어문학간행실, 어린이자료실 소장
              도서(간행물 제외)
            </li>
            <li>
              예약방법 : 홈페이지&gt;자료검색&gt;신청희망 도서
              선택&gt;상세페이지 내 소장위치 하단 야간대출예약 버튼 클릭하여
              예약
            </li>
            <li>
              예약가능권수 : 1인당 10권 이내(기존 대출권수와 야간 예약건수를
              합하여 최대 대출 권수&lt;일반회원 10권&gt;를 초과하지 않아야 함)
            </li>
            <li>신청시간 : 평일 13:00~16:00(주말, 휴관일 제외)</li>
            <li>수령시간 : 신청당일 18:00~익일 09:00까지</li>
            <li>
              수령장소 : 현관1층 무인반납시스템 부스 내[야간대출예약도서 무인함]
            </li>
            <li>※대출연체로 인한 대출정지 시에는 예약불가</li>
            <li>
              ※신청 당일 예약도서는 대출처리되며, 신청 당일 예약도서를 대출하지
              않을 시 다음날 반납처리 됨
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-800">
            {" "}
            <FontAwesomeIcon
              icon={faBook}
              className="mr-2"
            />
            희망도서신청
          </h3>
          <ul className="list-disc ml-10 space-y-3 text-xl text-gray-700 mb-10">
            <li>
              우리도서관에서 소장하고 있지 않은 자료를 신청할 수 있는
              서비스입니다.
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-800">
            {" "}
            <FontAwesomeIcon
              icon={faBook}
              className="mr-2"
            />
            도서관 상호대차(책바다)
          </h3>
          <ul className="list-disc ml-10 space-y-3 text-xl text-gray-700 mb-10">
            <li>대상지역 : 전국</li>
            <li>대출기간 : 14일(1회 7일 연장 가능)</li>
            <li>대출권수 : 3권</li>
            <li>
              대출도서 : 일반도서(단, 귀중자료, 참고자료(서지류, 사전류, 도감류
              등), 기타 대출제한이 필요하다고 인정되는 자료,
              <br />
              도서검색시 소장된 자료실이 '순회문고'로 구분된 자료 등은 제외)
            </li>
            <li>
              왕복 택배비 결제하기
              <ul className="list-disc pl-6 mt-2">
                <li>
                  공공도서관 및 대학도서관 자료: 5,540원 중 1,700원 결제(서울시
                  지원금 3,840원)
                </li>
              </ul>
            </li>
            <li>신청소요기간 : 3~5일 (변동가능)</li>
            <li>
              이용방법 : 강서도서관 회원으로 국가표준상호대차서비스 홈페이지에
              회원가입 신청 후 이용
            </li>
            <li>
              (책바다 상호대차서비스 이용안내)
              <br />
              (국립중앙도서관 상호대차서비스) : 회원승인요청-&gt; 상호대차신청
              -&gt; 요금결제 -&gt; 대출·반납
              <br />※ 상호대차(책바다) 문의처 : 어문학.간행물실 ☎3219-7040~2
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-800">
            {" "}
            <FontAwesomeIcon
              icon={faBook}
              className="mr-2"
            />
            스마트도서관 안내
          </h3>
          <ul className="list-disc ml-10 space-y-3 text-xl text-gray-700 mb-10">
            <li>위 치 : 강서도서관 정문 옆</li>
            <li>
              이용대상 : 서울특별시교육청 도서관 · 평생학습관 대출회원(정회원)
            </li>
            <li>이용시간 : 24시간 (연중 무휴)</li>
            <li>대출권수 : 1인 6권 (자료실 대출권수 외 추가대출)</li>
            <li>대출기간 : 14일 (반납연기 1회 7일)</li>
            <li>
              도서반납 : 스마트도서관에서 대출한 도서만 반납 가능 (자료실에서
              대출한 도서, 비도서, 간행물 반납 불가)
            </li>
            <li>
              반납연체 : 연체일수만큼 대출정지 또는 자료실 방문 연체료 납부
            </li>
            <li>
              이용문의 : 어문학간행물실 02-3219-7042, 인문사회자연과학실
              02-3219-7032
            </li>
          </ul>

          {/* 자료 */}
          {/* <h3 className="text-2xl font-bold text-gray-800">
            {" "}
            <FontAwesomeIcon
              icon={faBook}
              className="mr-2"
            />
            대출연기
          </h3>
          <ul className="list-disc ml-10 space-y-3 text-xl text-gray-700 mb-10"></ul> */}
        </div>
      </div>
    ),
    택배대출: (
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">택배대출</h2>
        <div className="text-xl text-gray-700 mb-10 p-10 bg-gray-100 rounded-lg">
          도서관 직접 방문에 따른 시간적·공간적 제약을 해소하고자 택배대출
          서비스를 실시합니다. 자세한 이용사항은 홈 &gt; 자료신청.예약 &gt;
          택배대출 &gt; 서비스안내를 참고하시기 바랍니다.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {" "}
            <FontAwesomeIcon
              icon={faBook}
              className="mr-2"
            />
            장애인 택배대출 서비스 「책나래」 (무료)
          </h3>
          <ul className="list-disc ml-10 space-y-3 text-xl text-gray-700 mb-10">
            <li>
              도서관에 직접 방문하기 어려운 장애인을 위하여 무료 택배대출
              서비스를 운영하고 있습니다
            </li>
            <li>
              신청자격 : 서울시거주 보건복지부 등록장애인, 국가보훈부 등록
              국가유공상이자, 국민건강보험공단 인정 장기요양대상자인 대출회원
            </li>
            <li>
              이용방법 : 도서관 회원가입 – 책나래 홈페이지 회원가입 – 소속도서관
              승인 - 이용
            </li>
            <li>
              대출(반납)방법 :책나래홈페이지(
              <a
                href="https://cn.nld.go.kr/index.do"
                target="_blank"
                class="newWin"
                title="새창으로 열립니다."
              >
                https://cn.nld.go.kr/<i class="fa fa-external-link"></i>
              </a>
              )에서 신청
            </li>
            <li>대출기간 : 30일</li>
            <li>택배비용 : 무료</li>
            <li>
              <strong>※ 장애인택배문의처 :</strong> 인문사회자연과학실
              ☎3219-7033
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-800">
            {" "}
            <FontAwesomeIcon
              icon={faBook}
              className="mr-2"
            />
            일반인 택배대출 (유료)
          </h3>
          <ul className="list-disc ml-10 space-y-3 text-xl text-gray-700 mb-10">
            <li>신청자격 : 관외대출회원</li>
            <li>대출자료수 : 1인 도서 10권이내</li>
            <li>대출기간 : 14일(1회 7일 연장 가능)</li>
            <li>
              신청방법 : 도서관 홈페이지 로그인 → 강서도서관 소장자료 검색 →
              "대출 가능여부" 확인 → 서명 클릭 → "택배대출 신청" 버튼 클릭 →{" "}
              <br />
              택배비용 안내문 "확인" 버튼 클릭 → 배송지 확인 후 "신청" 버튼 클릭{" "}
            </li>
            <li>택배비용 : 이용자 부담 (1인 대출권수 범위 내 착불 4,500원)</li>
            <li>반납방법 : 자료실 방문 또는 택배 반납</li>
            - 택배로 반납할 경우 택배비 선불 지급 (※선택한 택배업체별로 요금이
            다를 수 있습니다.) <br />- 택배 도착일로 반납처리 되므로
            택배접수-배송 소요기간을 고려하여 '반납예정일'보다 먼저 '반납신청'을
            해야 함.
            <li>
              반납주소 : 우)07669 서울시 강서구 등촌로 51나길 29
              인문사회자연과학실{" "}
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-800">
            {" "}
            <FontAwesomeIcon
              icon={faBook}
              className="mr-2"
            />
            도서관 상호대차(책바다) (유료)
          </h3>
          <ul className="list-disc ml-10 space-y-3 text-xl text-gray-700 mb-10">
            <li>대상지역 : 전국</li>
            <li>대출기간 : 14일(1회 7일 연장 가능) </li>
            <li>대출권수 : 3권</li>
            <li>
              대출도서 : 일반도서(단, 귀중자료, 참고자료(서지류, 사전류, 도감류
              등), 기타 대출제한이 필요하다고 인정되는 자료,도서검색 시 소장된
              자료실이 '순회문고'로 구분된 자료 등은 제외){" "}
            </li>
            <li>
              왕복 택배비 결제하기
              <ul>
                <li>
                  공공도서관 및 대학도서관 자료: 5,540원 중 1,700원 결제(서울시
                  지원금 3,840원)
                </li>
              </ul>
            </li>
            <li>신청소요기간 : 3~5일 (변동가능)</li>
            <li>
              이용방법 : 강서도서관 회원으로 국가표준상호대차서비스 홈페이지에
              회원가입 신청 후 이용
            </li>
            <li>
              책바다 상호대차서비스 이용안내
              <br />
              <a
                href="https://books.nl.go.kr"
                target="_blank"
                alt="책바다 서비스바로가기"
                class="newWin"
                title="새창으로 열립니다."
              >
                https://books.nl.go.kr<i class="fa fa-external-link"></i>
              </a>
              (국립중앙도서관 상호대차서비스) :
              회원승인요청-&gt;상호대차신청-&gt;요금결제-&gt;대출·반납
            </li>
            <li>※ 상호대차(책바다) 문의처 : 어문학·간행물실 ☎3219-7040~2</li>
          </ul>
        </div>
      </div>
    ),
    "복사 및 출력": (
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">복사 및 출력</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {" "}
            <FontAwesomeIcon
              icon={faBook}
              className="mr-2"
            />
            도서대출
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-center text-xl">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 font-semibold">
                    설치 위치
                  </th>
                  <th className="border border-gray-300 px-4 py-3 font-semibold">
                    설치 기기
                  </th>
                  <th className="border border-gray-300 px-4 py-3 font-semibold">
                    이용 요금
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 text-left">
                    인문사회자연과학실 (2층)
                  </td>
                  <td
                    rowSpan={2}
                    className="border border-gray-300 px-4 py-3"
                  >
                    복사기 1대
                  </td>
                  <td
                    rowSpan={2}
                    className="border border-gray-300 px-4 py-3"
                  >
                    A4용지 : (흑백) 30원 <br />
                    B4용지 : (흑백) 50원
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-3 text-left">
                    어문학˙간행물실 (3층)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul className=" ml-10 space-y-3 text-xl text-gray-700 mb-10">
            <li>
              ※ 저작권법에 의해 도서관 소장자료 일부에 한해서만 복사 가능합니다.
            </li>
            <li>※ 복사기는 카드결제로만 이용 가능합니다.</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-800">
            {" "}
            <FontAwesomeIcon
              icon={faBook}
              className="mr-2"
            />
            프린터 이용 안내
          </h3>
          <ul className="list-disc ml-10 space-y-3 text-xl text-gray-700 mb-10">
            <li>
              이용방법 : 디지털자료실 예약PC에서 좌석 예약 후 이용
              <br />( 도서관 회원 아이디로 로그인 후 PC예약 ▷ PC에서 인쇄 실행 ▷
              일회용 개인 Pin 번호 자유롭게 입력 ▷ 설정한 Pin번호 입력 ▷ 인쇄
              ▷카드 결제 요청▷카드 단말기에 결제)
            </li>
            <li>
              시설안내
              <br />
              <table
                summary="프린터 설치 위치, 설치 기기, 이용요금 안내"
                className="table-auto border-collapse border border-gray-300 w-full text-sm text-left mt-6 text-xl"
              >
                <colgroup>
                  <col
                    width="33%"
                    span={3}
                    className="col2"
                  />
                </colgroup>
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 font-semibold">
                      설치 위치
                    </th>
                    <th className="border border-gray-300 px-4 py-2 font-semibold">
                      설치 기기
                    </th>
                    <th className="border border-gray-300 px-4 py-2 font-semibold">
                      이용 요금
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      rowSpan={2}
                      className="border border-gray-300 px-4 py-2 align-top"
                    >
                      디지털자료실 (3층)
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      프린터 1대
                    </td>
                    <td
                      rowSpan={2}
                      className="border border-gray-300 px-4 py-2"
                    >
                      <p>A4용지 : (흑백) 50원, (컬러) 700원</p>
                      <p>B4용지 : (흑백) 80원, (컬러) 1000원</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      원문DB 프린터 1대
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li>※ 양면 프린트, 컬러 프린트 가능합니다.</li>
            <li>※ 프린터는 카드결제로만 이용 가능합니다.</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-800">
            {" "}
            <FontAwesomeIcon
              icon={faBook}
              className="mr-2"
            />
            스캐너 이용 안내
          </h3>
          <ul className="list-disc ml-10 space-y-3 text-xl text-gray-700 mb-10">
            <li>
              이용방법 : 디지털자료실 데스크 문의 신청
              <br />
              <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse border border-gray-300 text-center">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 font-semibold">
                        설치 위치
                      </th>
                      <th className="border border-gray-300 px-4 py-3 font-semibold">
                        설치 기기
                      </th>
                      <th className="border border-gray-300 px-4 py-3 font-semibold">
                        이용 요금
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 text-left">
                        디지털자료실 (3층)
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        스캐너 1대
                      </td>
                      <td className="border border-gray-300 px-4 py-3">무료</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </div>
      </div>
    ),
    스마트도서관: (
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">스마트도서관</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {" "}
            <FontAwesomeIcon
              icon={faBook}
              className="mr-2"
            />
            스마트도서관 안내
          </h3>

          <ul className="list-disc ml-10 space-y-3 text-xl text-gray-700 mb-10">
            <li>
              위 치 : 강서도서관 정문 옆<br />
            </li>
            <li>
              이용대상 : 서울특별시교육청 도서관 · 평생학습관 대출회원(정회원)
            </li>
            <li>
              이용시간 : 24시간 (연중 무휴) <br />
            </li>
            <li>대출권수 : 1인 6권 (자료실 대출권수 외 추가대출)</li>
            <li>
              대출기간 : 14일 (반납연기 1회 7일)
              <br />
            </li>
            <li>
              도서반납 : 스마트도서관에서 대출한 도서만 반납 가능
              <br />
              (자료실에서 대출한 도서, 비도서, 간행물 반납 불가)
            </li>
            <li>
              반납연체 : 연체일수만큼 대출정지 또는 자료실 방문 연체료 납부
            </li>
            <li>
              이용문의 : 어문학간행물실 02-3219-7042, 인문사회자연과학실
              02-3219-7032
            </li>
          </ul>
        </div>
      </div>
    ),
  };

  return (
    <div className="container m-auto px-6">
      <div className="flex items-center mb-8 gap-20">
        <h1 className="text-[45px] font-bold">자료이용안내</h1>
        <div className="btn-box flex gap-8 text-2xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn rounded-lg p-2 px-6 font-bold transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-blue-400 text-white hover:bg-blue-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="container content bg-white rounded-3xl p-16 shadow-2xl overflow-y-auto max-h-[550px]">
        {tabContents[activeTab]}
      </div>
      {/* InfoHomeImage 컴포넌트를 사용하여 이미지와 링크를 분리된 컴포넌트로 관리합니다. */}
      <InfoHomeImage />
    </div>
  );
}

export default MaterialGuideComp;
