let handlers = {
    deleteRow: [],
    search: [],
    reset: [],
    removeFilter: [],
    filterUpdate: [],
    resetButtons: [],
    registeredFilters: [] // 등록된 필터를 저장할 배열 추가
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
            handlers.resetButtons.forEach(handler => handler()); // resetButtons 핸들러 호출
        },
        // resetButtons() {
        //     handlers.resetButtons.forEach(handler => handler()); // resetButtons 핸들러 호출
        // },
        filterUpdate(KeyName, type, filter) {
            // 등록된 필터 추가
            handlers.registeredFilters.push({ KeyName, type, filter });
            handlers.filterUpdate.forEach(handler => handler(KeyName, type, filter));
        },
        getRegisteredFilters() {
            return handlers.registeredFilters; // 등록된 필터 반환
        },
        removeFilter(keyName) {
            handlers.removeFilter.forEach(handler => handler(keyName));
        },

    }
}