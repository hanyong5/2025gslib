# 로컬 개발 환경 CORS 문제 해결 방법

## 1. 브라우저 확장 프로그램 사용 (권장)

### Chrome 확장 프로그램 설치:

- "CORS Unblock" 또는 "Disable CORS" 확장 프로그램 설치
- 개발 시에만 활성화하여 CORS 제한 우회

## 2. Chrome 브라우저 플래그 사용

Chrome을 다음 명령어로 실행:

```bash
chrome --disable-web-security --disable-features=VizDisplayCompositor --user-data-dir=/tmp/chrome_dev_test
```

## 3. 개발 서버 재시작

```bash
# 현재 서버 종료 후
npm run dev
```

## 4. 네트워크 탭에서 확인

개발자 도구 > Network 탭에서:

- API 요청이 올바르게 전송되는지 확인
- 응답 상태 코드 확인
- CORS 에러 메시지 확인

## 5. 대안: 로컬 프록시 서버

```bash
# npx를 사용하여 간단한 프록시 서버 실행
npx cors-anywhere
```

## 6. 최종 해결책

현재 코드는 환경에 따라 자동으로 분기됩니다:

- **개발 환경**: 직접 API 호출
- **프로덕션 환경**: Netlify Functions 사용

프로덕션 배포 시에는 CORS 문제가 자동으로 해결됩니다.
