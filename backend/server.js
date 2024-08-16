// server.js
const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const app = express();
const port = 8080;

//Oracle Instant Client 경로 설정
oracledb.initOracleClient({ libDir: 'C:\\Program Files\\instantclient-basic-windows.x64-23.4.0.24.05\\instantclient_23_4' });
app.use(cors());

// OracleDB 설정
const dbConfig = {
    user: 'system',
    password: 'oracle',
    connectString: '211.33.184.136:1521/xe', // SID는 동일
};

// 루트 경로 추가
app.get('/', (req, res) => {
    res.send('서버에 접근하셨습니다!');
});

app.get('/api/data', async (req, res) => {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('SELECT * FROM C##SYSON.DEV');

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No data found' });
        }

        const data = result.rows.map(row => {
            return {
                DEV_NO: row[0],               // DEV_NO
                NM: row[1],                   // NM
                PJ_INP_STTS: row[2],          // PJ_INP_STTS
                CTRT_NMTM: row[3],            // CTRT_NMTM
                BRDT: row[4],                 // BRDT
                GNDR: row[5],                 // GNDR
                JBPS: row[6],                 // JBPS
                GRD: row[7],                  // GRD
                T_CR_PER: row[8],             // T_CR_PER
                RGN: row[9],                  // RGN
                MBL_TELNO: row[10],           // MBL_TELNO
                EML: row[11],                 // EML
                CONTT_MTHD: row[12],          // CONTT_MTHD
                NTRV_DMND_DT: row[13],        // NTRV_DMND_DT
                INPUT_PSBLTY_DT: row[14],     // INPUT_PSBLTY_DT
                OGDP_CO: row[15],             // OGDP_CO
                SN: row[16],                  // SN
                WHTAX_YN: row[17],            // WHTAX_YN
                BZMN_YN: row[18],             // BZMN_YN
                KDS_EMP_YN: row[19],          // KDS_EMP_YN
                CTRT_CO_EMP_YN: row[20],      // CTRT_CO_EMP_YN
                CLCT_PICKUP_DT: row[21],      // CLCT_PICKUP_DT
                GIVE_DT: row[22],             // GIVE_DT
                BANK: row[23],                // BANK
                ACTNO: row[24],               // ACTNO
                DEPT: row[25],                // DEPT
                MM_DMND_UNTPRC: row[26],      // MM_DMND_UNTPRC
                ADDR: row[27],                // ADDR
                JBTTL: row[28],               // JBTTL
                BRKR: row[29],                // BRKR
                KAKAO_NICK: row[30],          // KAKAO_NICK
                CTRT_HSTRY_YN: row[31],       // CTRT_HSTRY_YN
                MS: row[32],                  // MS
            };
        });

        res.json({ result: { row: data } });
    } catch (err) {
        console.error("Database connection error: ", err); // 에러 전체 출력
        res.status(500).json({ error: 'Database error', details: err.message }); // 에러 세부 정보 포함
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});