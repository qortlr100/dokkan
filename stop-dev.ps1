# 개발 환경 중지 스크립트

Write-Host "? Dokkan 개발 환경을 중지합니다..." -ForegroundColor Yellow

# 컨테이너 중지 및 제거
Write-Host "? 컨테이너 정리 중..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml down

Write-Host "`n? 개발 환경이 중지되었습니다!" -ForegroundColor Green 