# ���� ȯ�� ���� ��ũ��Ʈ

Write-Host "? Dokkan ���� ȯ���� �����մϴ�..." -ForegroundColor Green

# ���� �����̳� ����
Write-Host "? ���� �����̳� ���� ��..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml down

# �̹��� ����� �� �����̳� ����
Write-Host "??  �����̳� ���� �� ���� ��..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml up --build -d

# �����̳� ���� Ȯ��
Write-Host "`n? �����̳� ���� Ȯ�� ��..." -ForegroundColor Cyan
docker ps --filter "name=dokkan"

Write-Host "`n? ���� ȯ���� ���۵Ǿ����ϴ�!" -ForegroundColor Green
Write-Host "? ����Ʈ����: http://localhost:40080" -ForegroundColor Cyan
Write-Host "? �鿣��: http://localhost:43000" -ForegroundColor Cyan
Write-Host "`n? �α׸� ������ ���� ��ɾ �����ϼ���:" -ForegroundColor Yellow
Write-Host "docker-compose -f docker-compose.dev.yml logs -f" -ForegroundColor White 