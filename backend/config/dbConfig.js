// backend/config/dbConfig.js 이 모듈은 Oracle DB 접속 설정만 관리합니다.
require('dotenv').config(); // .env 파일 읽어오기

const dbConfig = {
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONNECT_STRING,
};

module.exports = dbConfig;