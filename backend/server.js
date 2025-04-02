// ===========================================================================
//                                 server.js
// ===========================================================================
const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const fs = require('fs');
const path = require('path'); // 이 부분이 필요함
const app = express();
const port = 8080;


// Oracle Instant Client 경로 설정
oracledb.initOracleClient({ libDir: 'C:\\Program Files\\instantclient-basic-windows.x64-23.4.0.24.05\\instantclient_23_4' });

// OracleDB 설정
const dbConfig = {
    user: process.env.DB_USER || 'system', // 환경 변수 사용
    password: process.env.DB_PASSWORD || 'ORACLE', // 환경 변수 사용
    connectString: process.env.DB_CONNECT_STRING || '211.33.184.136:1521/xe', // 환경 변수 사용
};

// 루트 경로 추가
app.get('/', (req, res) => {
    res.send('서버에 접근하셨습니다!');
});

app.get('/api/getDevData', async (req, res) => {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('SELECT * FROM C##SYSON.DEV');

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No data found' });
        }

        const data = result.rows.map(row => {
            return {
                DEV_NO: row[0],
                NM: row[1],
                PJ_INP_STTS: row[2],
                CTRT_NMTM: row[3],
                BRDT: row[4],
                GNDR: row[5],
                JBPS: row[6],
                GRD: row[7],
                T_CR_PER: row[8],
                RGN: row[9],
                MBL_TELNO: row[10],
                EML: row[11],
                CONTT_MTHD: row[12],
                NTRV_DMND_DT: row[13],
                INP_PSBLTY_DT: row[14],
                OGDP_CO: row[15],
                SN: row[16],
                WHTAX_YN: row[17],
                BZMN_YN: row[18],
                KDS_EMP_YN: row[19],
                CTRT_CO_EMP_YN: row[20],
                CLCT_PICKUP_DT: row[21],
                GIVE_DT: row[22],
                BANK: row[23],
                ACTNO: row[24],
                DEPT: row[25],
                MM_DMND_UNTPRC: row[26],
                ADDR: row[27],
                JBTTL: row[28],
                BRKR: row[29],
                KAKAO_NICK: row[30],
                CTRT_HSTRY_YN: row[31],
                MS: row[32],
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
                RESUME: row[44],
            };
        });

        res.json({ result: { row: data } });
    } catch (err) {
        console.error("데이터베이스 연결에러: ", err);
        res.status(500).json({ error: '데이터베이스 연결에러 메시지', details: err.message });
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

app.get('/api/getPjHistData', async (req, res) => {
    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('SELECT * FROM C##SYSON.DEV_PJ');

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No data found' });
        }

        const data = result.rows.map(row => {
            return {
                DEV_NO: row[0],                  // 개발자번호
                PJ_NO: row[1],                   // 프로젝트번호
                DEV_PJ_PRGRS_STTS: row[2],       // 개발자별프로젝트지원상태
                DEV_PJ_PRGRS_DT: row[3],         // 개발자별프로젝트지원날짜
                DEV_PJ_BGNG_DT: row[4],          // 개발자별프로젝트시작일자
                DEV_PJ_END_DT: row[5],           // 개발자별프로젝트종료일자
                CUST_NM: row[6],                 // 고객사명
                SUBGC_NM: row[7],                // 수행사명
                CTRT_CO_NM: row[8],              // 계약회사명
                SBCN_NM: row[9],                 // 하청업체명
                PJ_PLC: row[10],                 // 프로젝트장소
                PJ_INP_GRADE: row[11],           // 프로젝트투입등급
                JBTTL: row[12],                  // 직책
                SYST_FEE: row[13],               // 체제비
                CTRT_CO_EMP_PRNC: row[14],       // 계약회사정규직원금
                WHTAX_PRNC: row[15],             // 3.3%원금
                VAT_PRNC: row[16],               // 부가세원금
                KDS_EMP_PRNC: row[17],           // 자사정규직원금
                PJ_MM_DMND_UNTPRC: row[18],      // 프로젝트별월요청단가
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

app.post('/api/addDevPjHistory', async (req, res) => {
    let connection;

    const projectData = req.body; // 요청 본문에서 데이터 받기

    // Boolean 값 처리 (필요한 경우)
    projectData.WHTAX_PRNC = projectData.WHTAX_PRNC ? 1 : 0;
    projectData.VAT_PRNC = projectData.VAT_PRNC ? 1 : 0;
    projectData.KDS_EMP_PRNC = projectData.KDS_EMP_PRNC ? 1 : 0;
    projectData.CTRT_CO_EMP_PRNC = projectData.CTRT_CO_EMP_PRNC ? 1 : 0;

    // INSERT 쿼리
    const insertQuery = `
        INSERT INTO C##SYSON.DEV_PJ (
            DEV_NO, PJ_NO, DEV_PJ_PRGRS_STTS, DEV_PJ_PRGRS_DT, DEV_PJ_BGNG_DT, DEV_PJ_END_DT,
            CUST_NM, SUBGC_NM, CTRT_CO_NM, SBCN_NM,
            PJ_PLC, PJ_INP_GRADE, JBTTL,
            SYST_FEE, CTRT_CO_EMP_PRNC, WHTAX_PRNC, VAT_PRNC, KDS_EMP_PRNC, PJ_MM_DMND_UNTPRC
        ) VALUES (
            :devNo, :pjNo, :devPjPrgrsStts, :devPjPrgrsDt, :devPjBgngDt, :devPjEndDt,
            :custNm, :subgcNm, :ctrtCoNm, :sbcNm,
            :pjPlc, :pjInpGrade, :jbttl,
            :systFee, :ctrtCoEmpPrnc, :whtaxPrnc, :vatPrnc, :kdsEmpPrnc, :pjMmDmndUntprc
        )
    `;

    try {
        connection = await oracledb.getConnection(dbConfig);
        await connection.execute(insertQuery, {
            devNo: projectData.DEV_NO,
            pjNo: projectData.PJ_NO,
            devPjPrgrsStts: projectData.DEV_PJ_PRGRS_STTS,
            devPjPrgrsDt: projectData.DEV_PJ_PRGRS_DT,
            devPjBgngDt: projectData.DEV_PJ_BGNG_DT,
            devPjEndDt: projectData.DEV_PJ_END_DT,
            custNm: projectData.CUST_NM,
            subgcNm: projectData.SUBGC_NM,
            ctrtCoNm: projectData.CTRT_CO_NM,
            sbcNm: projectData.SBCN_NM,
            pjPlc: projectData.PJ_PLC,
            pjInpGrade: projectData.PJ_INP_GRADE,
            jbttl: projectData.JBTTL,
            systFee: projectData.SYST_FEE,
            ctrtCoEmpPrnc: projectData.CTRT_CO_EMP_PRNC,
            whtaxPrnc: projectData.WHTAX_PRNC,
            vatPrnc: projectData.VAT_PRNC,
            kdsEmpPrnc: projectData.KDS_EMP_PRNC,
            pjMmDmndUntprc: projectData.PJ_MM_DMND_UNTPRC,
        });

        await connection.commit(); // 변경사항 커밋
        res.status(201).json({ message: 'Developer project added successfully' });
    } catch (err) {
        console.error("Error occurred: ", err); // 에러 로그 출력
        console.log("Attempting to insert with values:", {
            devNo: projectData.DEV_NO,
            pjNo: projectData.PJ_NO,
            devPjPrgrsStts: projectData.DEV_PJ_PRGRS_STTS,
            devPjPrgrsDt: projectData.DEV_PJ_PRGRS_DT,
            devPjBgngDt: projectData.DEV_PJ_BGNG_DT,
            devPjEndDt: projectData.DEV_PJ_END_DT,
            custNm: projectData.CUST_NM,
            subgcNm: projectData.SUBGC_NM,
            ctrtCoNm: projectData.CTRT_CO_NM,
            sbcNm: projectData.SBCN_NM,
            pjPlc: projectData.PJ_PLC,
            pjInpGrade: projectData.PJ_INP_GRADE,
            jbttl: projectData.JBTTL,
            systFee: projectData.SYST_FEE,
            ctrtCoEmpPrnc: projectData.CTRT_CO_EMP_PRNC,
            whtaxPrnc: projectData.WHTAX_PRNC,
            vatPrnc: projectData.VAT_PRNC,
            kdsEmpPrnc: projectData.KDS_EMP_PRNC,
            pjMmDmndUntprc: projectData.PJ_MM_DMND_UNTPRC,
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
app.post('/api/updateDevData', async (req, res) => {
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

// UPDATE 쿼리
app.post('/api/update/PjDevHistoryData', async (req, res) => {
    console.log("Received request to update project developer history data");
    console.log("Request body:", req.body); // 요청 본문 로그 추가
    const {
        DEV_NO, // 수정할 데이터의 기준이 되는 개발자 번호
        PJ_NO,  // 수정할 데이터의 기준이 되는 프로젝트 번호
        DEV_PJ_PRGRS_STTS,
        DEV_PJ_PRGRS_DT,
        DEV_PJ_BGNG_DT,
        DEV_PJ_END_DT,
        CUST_NM,
        SUBGC_NM,
        CTRT_CO_NM,
        SBCN_NM,
        PJ_PLC,
        PJ_INP_GRADE,
        JBTTL,
        SYST_FEE,
        CTRT_CO_EMP_PRNC,
        WHTAX_PRNC,
        VAT_PRNC,
        KDS_EMP_PRNC,
        PJ_MM_DMND_UNTPRC
    } = req.body; // 클라이언트로부터 수정할 데이터를 받음

    let connection;

    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            `UPDATE C##SYSON.DEV_PJ SET
                DEV_PJ_PRGRS_STTS = :DEV_PJ_PRGRS_STTS,
                DEV_PJ_PRGRS_DT = :DEV_PJ_PRGRS_DT,
                DEV_PJ_BGNG_DT = :DEV_PJ_BGNG_DT,
                DEV_PJ_END_DT = :DEV_PJ_END_DT,
                CUST_NM = :CUST_NM,
                SUBGC_NM = :SUBGC_NM,
                CTRT_CO_NM = :CTRT_CO_NM,
                SBCN_NM = :SBCN_NM,
                PJ_PLC = :PJ_PLC,
                PJ_INP_GRADE = :PJ_INP_GRADE,
                JBTTL = :JBTTL,
                SYST_FEE = :SYST_FEE,
                CTRT_CO_EMP_PRNC = :CTRT_CO_EMP_PRNC,
                WHTAX_PRNC = :WHTAX_PRNC,
                VAT_PRNC = :VAT_PRNC,
                KDS_EMP_PRNC = :KDS_EMP_PRNC,
                PJ_MM_DMND_UNTPRC = :PJ_MM_DMND_UNTPRC
            WHERE DEV_NO = :DEV_NO AND PJ_NO = :PJ_NO`, // 수정할 데이터의 기준이 되는 DEV_NO와 PJ_NO
            {
                DEV_PJ_PRGRS_STTS,
                DEV_PJ_PRGRS_DT,
                DEV_PJ_BGNG_DT,
                DEV_PJ_END_DT,
                CUST_NM,
                SUBGC_NM,
                CTRT_CO_NM,
                SBCN_NM,
                PJ_PLC,
                PJ_INP_GRADE,
                JBTTL,
                SYST_FEE,
                CTRT_CO_EMP_PRNC,
                WHTAX_PRNC,
                VAT_PRNC,
                KDS_EMP_PRNC,
                PJ_MM_DMND_UNTPRC,
                DEV_NO, // WHERE 절에 사용할 DEV_NO
                PJ_NO  // WHERE 절에 사용할 PJ_NO
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

// 이력서 파일이 저장된 디렉토리
const RESUME_DIR = path.join('C:\\Users\\손승연\\IdeaProjects\\payinfo\\frontend\\public\\downloads\\resumes');

app.get('/api/downloadResume/:resumeId', (req, res) => {
    const resumeId = req.params.resumeId;
    const docxFilePath = path.join(RESUME_DIR, `${resumeId}.docx`);
    const docFilePath = path.join(RESUME_DIR, `${resumeId}.doc`);

    if (fs.existsSync(docxFilePath)) {
        return res.download(docxFilePath, (err) => {
            if (err) {
                console.error('File download error:', err);
                res.status(500).send('파일 다운로드 중 오류가 발생했습니다.');
            }
        });
    } else if (fs.existsSync(docFilePath)) {
        return res.download(docFilePath, (err) => {
            if (err) {
                console.error('File download error:', err);
                res.status(500).send('파일 다운로드 중 오류가 발생했습니다.');
            }
        });
    } else {
        return res.status(404).send('이력서를 찾을 수 없습니다.');
    }
});

app.get('/api/previewResume/:resumeId', (req, res) => {
    console.log("✅ /api/previewResume 라우트 실행됨!");
    console.log("요청된 resumeId:", req.params.resumeId);
    const encodedResumeId = req.params.resumeId;
    const resumeId = decodeURIComponent(encodedResumeId);  // 🔹 디코딩 추가
    const docxFilePath = path.join(RESUME_DIR, `${resumeId}.docx`);
    const docFilePath = path.join(RESUME_DIR, `${resumeId}.doc`);
    let filePath = null;

    console.log("미리보기 요청된 원본 resumeId:", encodedResumeId);
    console.log("디코딩된 resumeId:", resumeId);
    console.log("파일 경로 확인: DOCX ->", docxFilePath);
    console.log("파일 경로 확인: DOC  ->", docFilePath);

    if (fs.existsSync(docxFilePath)) {
        filePath = docxFilePath;
    } else if (fs.existsSync(docFilePath)) {
        filePath = docFilePath;
    } else {
        return res.status(404).send('이력서를 찾을 수 없습니다.');
    }

    // 파일 읽어서 클라이언트에 전송
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('파일 읽기 오류:', err);
            return res.status(500).send('파일을 읽을 수 없습니다.');
        }

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.send(data);
    });
});

app.delete('/api/deleteDevData', async (req, res) => {
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

app.delete('/api/deletePjDevHistData', async (req, res) => {
    const { devNoList, pjNo } = req.body; // PJ_NO 추가
    console.log(devNoList, pjNo);

    // 요청 본문 유효성 검사
    if (!devNoList || !Array.isArray(devNoList) || devNoList.length === 0 || !pjNo) {
        return res.status(400).json({ message: 'Invalid request body or missing parameters' });
    }

    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);

        // 바인드 변수 자리 표시자 생성
        const placeholders = devNoList.map((_, index) => `:${index + 1}`).join(','); // 바인드 변수 자리 표시자
        const sql = `DELETE FROM C##SYSON.DEV_PJ WHERE DEV_NO IN (${placeholders}) AND PJ_NO = :pjNo`;

        console.log('Executing SQL:', sql, 'with params:', devNoList, pjNo);
        const result = await connection.execute(sql, {
            ...devNoList.reduce((acc, devNo, index) => {
                acc[index + 1] = devNo; // 바인드 변수에 값 매핑
                return acc;
            }, {}),
            pjNo // PJ_NO 바인드 변수 추가
        }, { autoCommit: true });

        // 삭제된 행 수 확인
        if (result.rowsAffected === 0) {
            return res.status(404).json({ message: 'No matching records found to delete.' });
        }

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


// JSON 요청 본문을 파싱하기 위한 미들웨어
app.use(express.json());

// CORS 설정
app.use(cors());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

console.log("📌 등록된 라우트 목록:");
app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(middleware.route.path);
    }
});