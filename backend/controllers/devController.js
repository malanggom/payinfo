const oracledb = require('oracledb');

// DEV 테이블 데이터 조회
exports.getDevData = async (req, res) => {
    let connection;
    try {
        connection = await oracledb.getPool().getConnection();// 연결 풀에서 연결 가져오기
        const result = await connection.execute('SELECT * FROM DEV'); // DEV 테이블 쿼리

        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching data from DEV table', err);
        res.status(500).send('Internal Server Error');
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing connection', err);
            }
        }
    }
};