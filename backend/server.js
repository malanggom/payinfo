const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 라우트 설정
const routes = require('./routes');
app.use('/api', routes);

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Oracle DB 연결 설정
oracledb.createPool({
    user: 'system',
    password: 'oracle',  // 비밀번호 입력
    connectString: '211.33.184.136:1521/xe' // 자신의 DB 연결 문자열 사용
}, (err) => {
    if (err) {
        console.error('Error creating Oracle DB connection pool', err);
        return;
    }
    console.log('Oracle DB connection pool created');
});
