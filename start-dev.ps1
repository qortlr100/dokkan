# 개발 환경 시작 스크립트

Write-Host "? Dokkan 개발 환경을 시작합니다..." -ForegroundColor Green

# 이전 컨테이너 정리
Write-Host "? 이전 컨테이너 정리 중..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml down

# 이미지 재빌드 및 컨테이너 시작
Write-Host "??  컨테이너 빌드 및 시작 중..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml up --build -d

# 컨테이너 상태 확인
Write-Host "`n? 컨테이너 상태 확인 중..." -ForegroundColor Cyan
docker ps --filter "name=dokkan"

Write-Host "`n? 개발 환경이 시작되었습니다!" -ForegroundColor Green
Write-Host "? 프론트엔드: http://localhost:40080" -ForegroundColor Cyan
Write-Host "? 백엔드: http://localhost:43000" -ForegroundColor Cyan
Write-Host "`n? 로그를 보려면 다음 명령어를 실행하세요:" -ForegroundColor Yellow
Write-Host "docker-compose -f docker-compose.dev.yml logs -f" -ForegroundColor White 