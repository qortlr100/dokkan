# 개발 환경 로그 확인 스크립트

Write-Host "? Dokkan 개발 환경 로그를 확인합니다..." -ForegroundColor Cyan

# 실시간 로그 확인
docker-compose -f docker-compose.dev.yml logs -f 