let handlers = {
    deleteRow: [],
    search: [],
    reset: [],
    filterUpdate: [],
    resetButtons: [] // 새로운 이벤트 추가
};

export { handlers }; // handlers를 export

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
        fetchData(type, filter) {
            handlers.search.forEach(handler => handler(type, filter));
        },
        resetFilter(){
            handlers.reset.forEach(handler => handler());// reset 핸들러만 호출
        },
        filterUpdate(keyName, type, filter) {
            handlers.filterUpdate.forEach(handler => handler(keyName, type, filter));
        },
        removeFilter(type, filter) {
            handlers.filterUpdate.forEach((handler) => handler(type, filter));
        },
    }
}