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

app.get('/api/', (req, res) => {
    res.json({ message: 'API is working!' });
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
                MDL: row[33],
                OS: row[34],
                LANG: row[35],
                DB: row[36],
                TOOL: row[37],
                FRMW: row[38],
                LBRR: row[39],
                CMNCT: row[40],
                ETC: row[41],
                AGE: row[42],
                ACBG: row[43],
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

app.get('/api/pjHistory/data', async (req, res) => {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('SELECT * FROM C##SYSON.DEV_PJ_HSTR');

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
                MDL: row[33],
                OS: row[34],
                LANG: row[35],
                DB: row[36],
                TOOL: row[37],
                FRMW: row[38],
                LBRR: row[39],
                CMNCT: row[40],
                ETC: row[41],
                AGE: row[42],
                ACBG: row[43],
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
            NM, PJ_INP_STTS, CTRT_NMTM, BRDT, GNDR,
            JBPS, GRD, T_CR_PER, RGN, MBL_TELNO,
            EML, CONTT_MTHD, NTRV_DMND_DT, INP_PSBLTY_DT,
            OGDP_CO, SN, WHTAX_YN, BZMN_YN, KDS_EMP_YN,
            CTRT_CO_EMP_YN, CLCT_PICKUP_DT, GIVE_DT, BANK,
            ACTNO, DEPT, MM_DMND_UNTPRC, ADDR, JBTTL,
            BRKR, KAKAO_NICK, CTRT_HSTRY_YN, MS, MDL, OS,
            LANG, DB, TOOL, FRMW, LBRR, CMNCT, ETC, AGE, ACBG
        ) VALUES (
                     :nm, :pjInpStts, :ctrtNmtm, :brdt, :gndr,
                     :jbps, :grd, :tCrPer, :rgn, :mblTelno,
                     :eml, :conttMthd, :ntrvDmndDt, :inpPsbltyDt,
                     :ogdpCo, :sn, :whtaxYn, :bzmnYn, :kdsEmpYn,
                     :ctrtCoEmpYn, :clctPickupDt, :giveDt, :bank,
                     :actno, :dept, :mmDmndUntprc, :addr, :jbttl,
                     :brkr, :kakaoNick, :ctrtHstryYn, :ms, :mdl, :os,
                     :lang, :db, :tool, :frmw, :lbrr, :cmnct, :etc, :age, :acbg
                 )
    `;

    try {
        connection = await oracledb.getConnection(dbConfig);
        await connection.execute(insertQuery, {
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
            mdl: developerData.MDL,
            os: developerData.OS,
            lang: developerData.LANG,
            db: developerData.DB,
            tool: developerData.TOOL,
            frmw: developerData.FRMW,
            lbrr: developerData.LBRR,
            cmnct: developerData.CMNCT,
            etc: developerData.ETC,
            age: developerData.AGE,
            acbg: developerData.ACBG,
        });

        await connection.commit(); // 변경사항 커밋
        res.status(201).json({ message: 'Developer added successfully' });
    } catch (err) {
        console.error("Error occurred: ", err); // 에러 로그 출력
        console.log("Attempting to insert with values:", {
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
            mdl: developerData.MDL,
            os: developerData.OS,
            lang: developerData.LANG,
            db: developerData.DB,
            tool: developerData.TOOL,
            frmw: developerData.FRMW,
            lbrr: developerData.LBRR,
            cmnct: developerData.CMNCT,
            etc: developerData.ETC,
            age: developerData.AGE,
            acbg: developerData.ACBG,
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

// UPDATE 쿼리
app.post('/api/updateData', async (req, res) => {
    const {
        NM, PJ_INP_STTS, CTRT_NMTM, BRDT, GNDR, JBPS, GRD,
        T_CR_PER, RGN, MBL_TELNO, EML, CONTT_MTHD, NTRV_DMND_DT,
        INP_PSBLTY_DT, OGDP_CO, SN, WHTAX_YN, BZMN_YN, KDS_EMP_YN,
        CTRT_CO_EMP_YN, CLCT_PICKUP_DT, GIVE_DT, BANK, ACTNO, DEPT,
        MM_DMND_UNTPRC, ADDR, JBTTL, BRKR, KAKAO_NICK, CTRT_HSTRY_YN, MS, MDL, OS,
        LANG, DB, TOOL, FRMW, LBRR, CMNCT, ETC, AGE, ACBG, DEV_NO
    } = req.body; // 클라이언트로부터 수정할 데이터를 받음

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `UPDATE C##SYSON.DEV SET 
                NM = :NM, 
                PJ_INP_STTS = :PJ_INP_STTS, 
                CTRT_NMTM = :CTRT_NMTM, 
                BRDT = :BRDT, 
                GNDR = :GNDR, 
                JBPS = :JBPS, 
                GRD = :GRD, 
                T_CR_PER = :T_CR_PER, 
                RGN = :RGN, 
                MBL_TELNO = :MBL_TELNO, 
                EML = :EML, 
                CONTT_MTHD = :CONTT_MTHD, 
                NTRV_DMND_DT = :NTRV_DMND_DT, 
                INP_PSBLTY_DT = :INP_PSBLTY_DT, 
                OGDP_CO = :OGDP_CO, 
                SN = :SN, 
                WHTAX_YN = :WHTAX_YN, 
                BZMN_YN = :BZMN_YN, 
                KDS_EMP_YN = :KDS_EMP_YN, 
                CTRT_CO_EMP_YN = :CTRT_CO_EMP_YN, 
                CLCT_PICKUP_DT = :CLCT_PICKUP_DT, 
                GIVE_DT = :GIVE_DT, 
                BANK = :BANK, 
                ACTNO = :ACTNO, 
                DEPT = :DEPT, 
                MM_DMND_UNTPRC = :MM_DMND_UNTPRC, 
                ADDR = :ADDR, 
                JBTTL = :JBTTL, 
                BRKR = :BRKR, 
                KAKAO_NICK = :KAKAO_NICK, 
                CTRT_HSTRY_YN = :CTRT_HSTRY_YN, 
                MS = :MS,
                MDL = :MDL,
                OS = :OS,
                LANG = :LANG,
                DB = :DB,
                TOOL = :TOOL,
                FRMW = :FRMW,
                LBRR = :LBRR,
                CMNCT = :CMNCT,
                ETC = :ETC,
                AGE = :AGE,
                ACBG = :ACBG
            WHERE DEV_NO = :DEV_NO`, // 수정할 데이터의 기준이 되는 DEV_NO
            {
                NM, PJ_INP_STTS, CTRT_NMTM, BRDT, GNDR, JBPS, GRD,
                T_CR_PER, RGN, MBL_TELNO, EML, CONTT_MTHD, NTRV_DMND_DT,
                INP_PSBLTY_DT, OGDP_CO, SN, WHTAX_YN, BZMN_YN, KDS_EMP_YN,
                CTRT_CO_EMP_YN, CLCT_PICKUP_DT, GIVE_DT, BANK, ACTNO, DEPT,
                MM_DMND_UNTPRC, ADDR, JBTTL, BRKR, KAKAO_NICK, CTRT_HSTRY_YN, MS, MDL, OS,
                LANG, DB, TOOL, FRMW, LBRR, CMNCT, ETC, AGE, ACBG,
                DEV_NO // WHERE 절에 사용할 DEV_NO
            },
            { autoCommit: true } // 자동 커밋
        );

        if (result.rowsAffected === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }

        res.status(200).json({ message: 'Data updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update data' });
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

app.delete('/api/deleteData', async (req, res) => {
    const { devNoList } = req.body;
    console.log(devNoList);

    if (!devNoList || !Array.isArray(devNoList)) {
        return res.status(400).json({ message: 'Invalid request body' });
    }

    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);

        // 바인드 변수를 올바르게 설정
        const placeholders = devNoList.map((_, index) => `:${index + 1}`).join(','); // 바인드 변수 자리 표시자
        const sql = `DELETE FROM C##SYSON.DEV WHERE DEV_NO IN (${placeholders})`;

        console.log('Executing SQL:', sql, 'with params:', devNoList);
        const result = await connection.execute(sql, devNoList.reduce((acc, devNo, index) => {
            acc[index + 1] = devNo; // 바인드 변수에 값 매핑
            return acc;
        }, {}), { autoCommit: true });

        res.json({ message: `${result.rowsAffected} rows deleted` });
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ message: 'Error deleting data' });
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