// server.js (Node.js + Express)
const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Oracle DB 연결 설정
const dbConfig = {
    user: 'system',
    password: 'oracle',
    connectString: '211.33.184.136:1521/xe',
};

// 데이터 삽입 API
app.post('/api/submit', async (req, res) => {
    // const { name, gender } = req.body;

    try {
        const connection = await oracledb.getConnection(dbConfig);
        // const result = await connection.execute(
        //     'INSERT INTO developers (name, gender) VALUES (:name, :gender)',
        //     { name, gender }
        // );
        await connection.commit();
        res.status(201).send({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error inserting data' });
    }
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});