let handlers = {
    deleteRow: [],
    search: []
};

export default {
    SearchResultEvent: {
        add(eventType, handler) {
            if (handlers[eventType]) {
                handlers[eventType].push(handler);
            }
        },
        deleteRowBtnClick() {
            handlers.deleteRow.forEach(handler => handler()); // deleteRow 핸들러만 호출
        },
        fetchData() {
            handlers.search.forEach(handler => handler()); // search 핸들러만 호출
        },
    }
}