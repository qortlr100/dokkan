# Dokkan Battle Backend

Dokkan Battle 게임의 백엔드 서버입니다.

## 기술 스택

- Node.js
- Express
- TypeScript
- SQLite
- Docker

## 프로젝트 구조

```
dokkan/
├── backend/           # 백엔드 서버 코드
│   ├── src/          # 소스 코드
│   ├── Dockerfile    # Docker 설정
│   └── package.json  # 의존성 관리
├── data/             # 데이터베이스 파일
└── docker-compose.yml # Docker Compose 설정
```

## 실행 방법

1. Docker 설치
   - [Docker Desktop](https://www.docker.com/products/docker-desktop/) 설치

2. 프로젝트 클론
   ```bash
   git clone [repository-url]
   cd dokkan
   ```

3. Docker 컨테이너 실행
   ```bash
   docker-compose up -d
   ```

4. 서버 접속
   - http://localhost:3000

## API 엔드포인트

### 카드 정보 조회
- GET `/api/cards`
- 쿼리 파라미터:
  - `page`: 페이지 번호 (기본값: 1)
  - `limit`: 페이지당 항목 수 (기본값: 20)
  - `sortBy`: 정렬 기준 (기본값: open_at)
  - `sortOrder`: 정렬 순서 (ASC/DESC, 기본값: DESC)
  - `rarity`: 희귀도 필터
  - `type`: 타입 필터
  - `search`: 이름 검색

## 개발 환경 설정

1. 의존성 설치
   ```bash
   cd backend
   npm install
   ```

2. 개발 서버 실행
   ```bash
   npm run dev
   ```

## 데이터베이스

SQLite 데이터베이스는 `data/database.db`에 위치합니다.