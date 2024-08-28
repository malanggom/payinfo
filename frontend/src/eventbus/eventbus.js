let handlers = [];

export default {
    SearchResultEvent: {
        add(handler) {
            handlers.push(handler);
        },
        deleteRowBtnClick() {
            handlers.forEach(handler => handler()); // 모든 핸들러 호출
        }
    }
}