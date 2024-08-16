// 결제 정보를 처리하는 컨트롤러
exports.getPayInfo = (req, res) => {
    // DB에서 결제 정보 조회 로직
    res.json({ message: "결제 정보 조회 성공" });
};

exports.createPayInfo = (req, res) => {
    // DB에 결제 정보 저장 로직
    res.json({ message: "결제 정보 생성 성공" });
};