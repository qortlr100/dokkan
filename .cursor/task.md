# Dokkan Viewer 개발 진행 상황

## 1. 초기 프로젝트 설정 (2024-04-12)

### 1.1 백엔드 초기 설정
- Express.js + TypeScript 기반의 백엔드 서버 구축
- 기본 프로젝트 구조 설정
  - `package.json`: 프로젝트 의존성 관리
  - `tsconfig.json`: TypeScript 설정
  - `src/index.ts`: 기본 서버 설정
- 테스트용 ping/pong API 엔드포인트 구현
- nodemon을 통한 개발 환경 설정

### 1.2 프로젝트 구조화
- monorepo 구조 채택 (backend + frontend)
- 백엔드 관련 파일들을 `backend/` 디렉토리로 이동
- 프로젝트 데이터 관리
  - `data/`: 데이터베이스 파일 저장
  - `resources/`: 게임 리소스 파일 저장
- Git 버전 관리 설정
  - `.gitignore` 설정
  - 대용량 데이터/리소스 파일 제외 처리
  - 폴더 구조는 유지하면서 내용물 제외 처리

## 2. 백엔드 개발 (2024-04-17)

### 2.1 데이터베이스 연동
- SQLite3 데이터베이스 연결 설정
- `data/database.db` 파일 연동
- 데이터베이스 쿼리 함수 구현

### 2.2 카드 정보 API 개발
- 카드 목록 조회 API 구현 (`GET /api/cards`)
- 필터링 기능 구현
  - 레어리티(`rarity`) 필터링
  - 타입(`type`) 필터링
  - 이름 검색(`search`) 필터링
  - 날짜 기반 필터링 (`open_at` 필드)
- 정렬 기능 구현
  - 기본 정렬: `open_at` 내림차순 (최신순)
  - 사용자 지정 정렬 필드 및 순서 지원
- 페이지네이션 구현
  - 기본값: 페이지당 20개 항목
  - 페이지 번호 지정 가능
- CORS 설정 완료

### 2.3 API 응답 형식
```typescript
{
  cards: Card[],
  total: number  // 전체 카드 수
}
```

### 2.4 Docker 배포 설정 (2024-04-17)
- Docker 관련 파일 생성
  - `backend/Dockerfile`: Node.js 18 Alpine 기반 이미지 설정
  - `docker-compose.yml`: 서비스 구성 및 볼륨 마운트 설정
  - `backend/.dockerignore`: 불필요한 파일 제외 설정
- 데이터베이스 볼륨 마운트 설정
  - 호스트의 `./data` 디렉토리를 컨테이너의 `/data`에 마운트
  - 데이터베이스 파일 영구 저장 및 공유
- 프로젝트 문서화
  - `README.md`: 프로젝트 설명 및 실행 방법 문서화
  - `.gitignore`: Docker 및 데이터베이스 관련 파일 제외 설정

## 3. 프론트엔드 개발 (2024-04-17)

### 3.1 Next.js 프로젝트 설정
- [x] Next.js + TypeScript 프로젝트 생성
- [x] Tailwind CSS 설정
- [x] 개발 서버 포트 설정 (3001)
- [x] Next.js Image 컴포넌트 설정
  - 외부 이미지 도메인 허용
  - 이미지 최적화 설정

### 3.2 상태 관리 및 API 연동
- [x] Zustand를 사용한 상태 관리 구현
  - 카드 목록 상태 관리 (cardStore)
  - 인증 상태 관리 (authStore)
- [x] API 통신 설정
  - Axios 인스턴스 설정
  - API 엔드포인트 연동
  - 인터셉터를 통한 토큰 관리

### 3.3 컴포넌트 개발
- [x] 카드 그리드 컴포넌트 구현
  - 반응형 그리드 레이아웃
  - 이미지 처리 및 오류 대응
  - 카드 정보 표시
  - 속성별 색상 표시 구현
    - 민첩(0) = 파랑색
    - 기술(1) = 초록색
    - 지능(2) = 보라색
    - 근력(3) = 빨강색
    - 체력(4) = 노랑색
- [x] 검색 필터 컴포넌트 구현
  - 이름 검색
  - 레어리티 필터
  - 타입 필터
  - 정렬 기능
- [x] 레이아웃 컴포넌트 구현
  - 네비게이션 바
  - 반응형 디자인
- [x] 썸네일 컴포넌트 개선
  - Canvas 기반 썸네일 생성 구현
  - 게임 스타일 레이아웃 적용
    - 배경 이미지: (29, 43) 위치에 204x204 크기
    - 캐릭터 이미지: (6, 12) 위치에 원본 크기 유지
    - 타입 아이콘: (173, 13) 위치에 96x96 크기
    - 레어리티 아이콘: (0, 159) 위치에 원본 크기의 2배
  - 이미지 로드 실패 시 대체 이미지 표시 개선
  - 중앙 정렬 및 반응형 크기 조정 적용

### 3.4 카드 필터링 개선 (2024-04-18)
- [x] ID 기반 필터링 구현
  - 첫 자리수가 1인 카드만 표시
  - 마지막 자리가 0인 카드만 표시
- [x] 날짜 기반 필터링
  - 내년 12월 31일 이전의 카드만 표시

## 4. 다음 진행 예정 작업

### 4.1 프론트엔드 추가 개발
- [ ] 카드 상세 페이지 구현
- [ ] 카테고리 페이지 구현
- [ ] 관리자 페이지 구현
- [ ] 페이지네이션 개선
- [ ] 로딩 및 에러 상태 UI 개선

### 4.2 백엔드 추가 개발
- [ ] 캐릭터 상세 정보 조회 API
- [ ] 관리자 인증 시스템 구현
- [ ] API 문서화 (Swagger/OpenAPI)

## 5. 참고사항
- 개발 서버 포트
  - 백엔드: 43000 (외부) -> 3000 (내부)
  - 프론트엔드: 40080 (외부) -> 3000 (내부)
- 데이터베이스: SQLite3
- API 문서화 필요
- Docker 배포 환경 구성 완료

# 작업 내용 정리

## 완료된 작업
- [x] Docker 환경 구성
  - [x] 프론트엔드 Dockerfile 작성
  - [x] 백엔드 Dockerfile 작성
  - [x] docker-compose.yml 구성
- [x] 개발 환경 자동화 스크립트 작성
  - [x] start-dev.ps1: 개발 환경 시작
  - [x] stop-dev.ps1: 개발 환경 중지
  - [x] logs-dev.ps1: 로그 확인
- [x] Docker 관련 설정 파일 추가
  - [x] frontend/.dockerignore 작성
  - [x] 한글 인코딩 문제 해결
- [x] 포트 설정 최적화
  - [x] 백엔드 포트: 43000 (외부) -> 3000 (내부)
  - [x] 프론트엔드 포트: 40080 (외부) -> 3000 (내부)
- [x] API 연동 설정
  - [x] API 기본 URL 환경 설정
  - [x] CORS 설정 확인
  - [x] API 엔드포인트 연결 확인
- [x] 카드 표시 개선
  - [x] 속성별 색상 표시 구현
  - [x] ID 기반 필터링 구현
  - [x] 날짜 기반 필터링 구현

## 현재 상태
- 프론트엔드와 백엔드가 Docker 환경에서 정상적으로 실행 중
- API 통신이 정상적으로 작동
- 카드 정보가 정상적으로 표시됨
- 기본적인 검색 및 필터링 기능 구현 완료
- 속성별 색상 표시 및 ID 기반 필터링 구현 완료

## 다음 작업 예정
- [ ] 환경 변수 설정 파일 (.env) 구성
- [ ] 로깅 시스템 구축
- [ ] 에러 핸들링 개선
- [ ] 성능 모니터링 도구 설정
- [ ] 백업 시스템 구축
- [ ] 카드 상세 페이지 구현
- [ ] 관리자 인증 시스템 구현

## 참고 사항
- Docker 컨테이너 실행: `.\start-dev.ps1`
- Docker 컨테이너 중지: `.\stop-dev.ps1`
- Docker 로그 확인: `.\logs-dev.ps1`
- 프론트엔드 접속: `http://localhost:40080`
- 백엔드 API: `http://localhost:43000/api`
