import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 기본 ping/pong 라우트
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
}); 