import express from 'express';
import { getCards, CardQueryParams } from './database';

const app = express();
const port = 3000;

app.use(express.json());

// CORS 설정
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// 카드 정보를 반환하는 엔드포인트
app.get('/api/cards', async (req, res) => {
    try {
        const queryParams: CardQueryParams = {
            page: req.query.page ? parseInt(req.query.page as string) : undefined,
            limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
            sortBy: req.query.sortBy as string,
            sortOrder: req.query.sortOrder as 'ASC' | 'DESC',
            rarity: req.query.rarity as string,
            type: req.query.type as string,
            search: req.query.search as string
        };

        const result = await getCards(queryParams);
        res.json(result);
    } catch (error) {
        console.error('카드 정보 조회 오류:', error);
        res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
}); 