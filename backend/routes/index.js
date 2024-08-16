const express = require('express');
const router = express.Router();
const devController = require('../controllers/devController'); // 컨트롤러 import

// 개발자 데이터 요청 처리
router.get('/dev', devController.getDevData); // 컨트롤러 함수 연결

module.exports = router;