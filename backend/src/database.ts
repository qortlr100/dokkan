import sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';
import path from 'path';

// Docker 컨테이너 내부의 /data 디렉토리를 사용
const dbPath = '/data/database.db';

const db = new sqlite3.Database(dbPath, (err) => {
    console.log('데이터베이스 경로:', dbPath);
    if (err) {
        console.error('데이터베이스 연결 오류:', err);
    } else {
        console.log('데이터베이스에 성공적으로 연결되었습니다.');
    }
});

export interface Card {
    id: number;
    name: string;
    rarity: string;
    type: string;
    open_at: string;
    // 필요한 다른 필드들을 추가할 수 있습니다
}

export interface CardQueryParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
    rarity?: string;
    type?: string;
    search?: string;
}

export function getCards(params: CardQueryParams = {}): Promise<{ cards: Card[], total: number }> {
    const {
        page = 1,
        limit = 20,
        sortBy = 'open_at',
        sortOrder = 'DESC',
        rarity,
        type,
        search
    } = params;

    const offset = (page - 1) * limit;
    const conditions: string[] = [];
    const queryParams: any[] = [];

    // 기본 날짜 필터링 조건 추가 (내년 12월 31일 이전)
    const endDate = new Date(new Date().getFullYear() + 1, 11, 31); // 내년 12월 31일
    conditions.push('open_at <= ?');
    queryParams.push(endDate.toISOString().split('T')[0]);

    if (rarity) {
        conditions.push('rarity = ?');
        queryParams.push(rarity);
    }

    if (type) {
        conditions.push('type = ?');
        queryParams.push(type);
    }

    if (search) {
        conditions.push('name LIKE ?');
        queryParams.push(`%${search}%`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const orderClause = `ORDER BY ${sortBy} ${sortOrder}`;
    const limitClause = `LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);

    const countQuery = `SELECT COUNT(*) as total FROM cards ${whereClause}`;
    const dataQuery = `SELECT * FROM cards ${whereClause} ${orderClause} ${limitClause}`;

    return new Promise((resolve, reject) => {
        db.get(countQuery, queryParams.slice(0, -2), (err, countResult: any) => {
            if (err) {
                reject(err);
                return;
            }

            db.all(dataQuery, queryParams, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        cards: rows as Card[],
                        total: countResult.total
                    });
                }
            });
        });
    });
}

export default db; 