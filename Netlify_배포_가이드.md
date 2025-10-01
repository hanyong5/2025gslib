# Netlify 배포 가이드

## 🚀 배포 방법

### 방법 1: GitHub 연동 (권장)

1. **GitHub에 코드 푸시**

   ```bash
   git add .
   git commit -m "SPA 라우팅 문제 해결"
   git push origin main
   ```

2. **Netlify에서 GitHub 저장소 연결**
   - Netlify 대시보드 > "New site from Git"
   - GitHub 선택 후 저장소 연결
   - 빌드 설정:
     - Build command: `npm run build`
     - Publish directory: `dist`

### 방법 2: 수동 배포

1. **빌드 생성**

   ```bash
   npm run build
   ```

2. **Netlify에 업로드**
   - Netlify 대시보드 > "Deploy manually"
   - `dist` 폴더 드래그 앤 드롭

## 🔧 설정 파일 설명

### netlify.toml

```toml
# SPA 라우팅을 위한 catch-all 리다이렉트
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### public/\_redirects

```
# 모든 경로를 index.html로 리다이렉트
/* /index.html 200
```

## ✅ 해결된 문제

- ✅ **페이지 새로고침 시 404 에러 해결**
- ✅ **모든 라우트에서 정상 작동**
- ✅ **브라우저 뒤로가기/앞으로가기 정상 작동**
- ✅ **직접 URL 접근 가능**

## 🧪 테스트 방법

배포 후 다음 URL들을 테스트:

1. **홈페이지**: `https://your-site.netlify.app/`
2. **검색 페이지**: `https://your-site.netlify.app/search`
3. **교육일정 페이지**: `https://your-site.netlify.app/education`
4. **정보 페이지**: `https://your-site.netlify.app/info`
5. **이벤트 페이지**: `https://your-site.netlify.app/event`

각 페이지에서 새로고침(F5)을 눌러도 404 에러가 발생하지 않아야 합니다.

## 🔍 문제 해결

### 만약 여전히 404 에러가 발생한다면:

1. **빌드 확인**

   ```bash
   npm run build
   ls dist/
   ```

2. **리다이렉트 규칙 확인**

   - Netlify 대시보드 > Site settings > Redirects and rewrites
   - `/* /index.html 200` 규칙이 있는지 확인

3. **브라우저 캐시 클리어**

   - `Ctrl + Shift + R` (하드 리프레시)

4. **Netlify Functions 확인**
   - Functions 탭에서 `book-search` 함수가 배포되었는지 확인

## 📱 모바일 테스트

모바일에서도 동일하게 테스트:

- URL 직접 입력
- 새로고침
- 뒤로가기/앞으로가기
