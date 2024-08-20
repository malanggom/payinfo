// server.js
const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const app = express();
const port = 8080;

// JSON 요청 본문을 파싱하기 위한 미들웨어
app.use(express.json());

// CORS 설정
app.use(cors());

// Oracle Instant Client 경로 설정
oracledb.initOracleClient({ libDir: 'C:\\Program Files\\instantclient-basic-windows.x64-23.4.0.24.05\\instantclient_23_4' });

// OracleDB 설정
const dbConfig = {
    user: process.env.DB_USER || 'system', // 환경 변수 사용
    password: process.env.DB_PASSWORD || 'oracle', // 환경 변수 사용
    connectString: process.env.DB_CONNECT_STRING || '211.33.184.136:1521/xe', // 환경 변수 사용
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
                DEV_NO: row[0],              // DEV_NO
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
                INP_PSBLTY_DT: row[14],     // INP_PSBLTY_DT
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
        console.error("Database connection error: ", err);
        res.status(500).json({ error: 'Database error', details: err.message });
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

// POST 요청을 처리할 엔드포인트 추가
app.post('/api/addDeveloper', async (req, res) => {
    let connection;

    const developerData = req.body; // 요청 본문에서 데이터 받기

    // Boolean 값 처리
    developerData.WHTAX_YN = developerData.WHTAX_YN ? 1 : 0;
    developerData.BZMN_YN = developerData.BZMN_YN ? 1 : 0;
    developerData.KDS_EMP_YN = developerData.KDS_EMP_YN ? 1 : 0;
    developerData.CTRT_CO_EMP_YN = developerData.CTRT_CO_EMP_YN ? 1 : 0;
    developerData.CTRT_HSTRY_YN = developerData.CTRT_HSTRY_YN ? 1 : 0;

    // INSERT 쿼리
    const insertQuery = `
        INSERT INTO C##SYSON.DEV (
            DEV_NO, NM, PJ_INP_STTS, CTRT_NMTM, BRDT, GNDR,
            JBPS, GRD, T_CR_PER, RGN, MBL_TELNO,
            EML, CONTT_MTHD, NTRV_DMND_DT, INP_PSBLTY_DT,
            OGDP_CO, SN, WHTAX_YN, BZMN_YN, KDS_EMP_YN,
            CTRT_CO_EMP_YN, CLCT_PICKUP_DT, GIVE_DT, BANK,
            ACTNO, DEPT, MM_DMND_UNTPRC, ADDR, JBTTL,
            BRKR, KAKAO_NICK, CTRT_HSTRY_YN, MS
        ) VALUES (
                     :devNo, :nm, :pjInpStts, :ctrtNmtm, :brdt, :gndr,
                     :jbps, :grd, :tCrPer, :rgn, :mblTelno,
                     :eml, :conttMthd, :ntrvDmndDt, :inpPsbltyDt,
                     :ogdpCo, :sn, :whtaxYn, :bzmnYn, :kdsEmpYn,
                     :ctrtCoEmpYn, :clctPickupDt, :giveDt, :bank,
                     :actno, :dept, :mmDmndUntprc, :addr, :jbttl,
                     :brkr, :kakaoNick, :ctrtHstryYn, :ms
                 )
    `;

    try {
        connection = await oracledb.getConnection(dbConfig);
        await connection.execute(insertQuery, {
            devNo: developerData.DEV_NO,
            nm: developerData.NM,
            pjInpStts: developerData.PJ_INP_STTS,
            ctrtNmtm: developerData.CTRT_NMTM,
            brdt: developerData.BRDT,
            gndr: developerData.GNDR,
            jbps: developerData.JBPS,
            grd: developerData.GRD,
            tCrPer: developerData.T_CR_PER,
            rgn: developerData.RGN,
            mblTelno: developerData.MBL_TELNO,
            eml: developerData.EML,
            conttMthd: developerData.CONTT_MTHD,
            ntrvDmndDt: developerData.NTRV_DMND_DT,
            inpPsbltyDt: developerData.INP_PSBLTY_DT,
            ogdpCo: developerData.OGDP_CO,
            sn: developerData.SN,
            whtaxYn: developerData.WHTAX_YN,
            bzmnYn: developerData.BZMN_YN,
            kdsEmpYn: developerData.KDS_EMP_YN,
            ctrtCoEmpYn: developerData.CTRT_CO_EMP_YN,
            clctPickupDt: developerData.CLCT_PICKUP_DT,
            giveDt: developerData.GIVE_DT,
            bank: developerData.BANK,
            actno: developerData.ACTNO,
            dept: developerData.DEPT,
            mmDmndUntprc: developerData.MM_DMND_UNTPRC,
            addr: developerData.ADDR,
            jbttl: developerData.JBTTL,
            brkr: developerData.BRKR,
            kakaoNick: developerData.KAKAO_NICK,
            ctrtHstryYn: developerData.CTRT_HSTRY_YN,
            ms: developerData.MS,
        });

        await connection.commit(); // 변경사항 커밋
        res.status(201).json({ message: 'Developer added successfully' });
    } catch (err) {
        console.error("Error occurred: ", err); // 에러 로그 출력
        console.log("Attempting to insert with values:", {
            devNo: developerData.DEV_NO,
            nm: developerData.NM,
            pjInpStts: developerData.PJ_INP_STTS,
            ctrtNmtm: developerData.CTRT_NMTM,
            brdt: developerData.BRDT,
            gndr: developerData.GNDR,
            jbps: developerData.JBPS,
            grd: developerData.GRD,
            tCrPer: developerData.T_CR_PER,
            rgn: developerData.RGN,
            mblTelno: developerData.MBL_TELNO,
            eml: developerData.EML,
            conttMthd: developerData.CONTT_MTHD,
            ntrvDmndDt: developerData.NTRV_DMND_DT,
            inpPsbltyDt: developerData.INP_PSBLTY_DT,
            ogdpCo: developerData.OGDP_CO,
            sn: developerData.SN,
            whtaxYn: developerData.WHTAX_YN,
            bzmnYn: developerData.BZMN_YN,
            kdsEmpYn: developerData.KDS_EMP_YN,
            ctrtCoEmpYn: developerData.CTRT_CO_EMP_YN,
            clctPickupDt: developerData.CLCT_PICKUP_DT,
            giveDt: developerData.GIVE_DT,
            bank: developerData.BANK,
            actno: developerData.ACTNO,
            dept: developerData.DEPT,
            mmDmndUntprc: developerData.MM_DMND_UNTPRC,
            addr: developerData.ADDR,
            jbttl: developerData.JBTTL,
            brkr: developerData.BRKR,
            kakaoNick: developerData.KAKAO_NICK,
            ctrtHstryYn: developerData.CTRT_HSTRY_YN,
            ms: developerData.MS,
        });
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } finally {
        if (connection) {
            try {
                await connection.close(); // 연결 종료
            } catch (closeErr) {
                console.error("Error closing connection:", closeErr);
            }
        }
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});