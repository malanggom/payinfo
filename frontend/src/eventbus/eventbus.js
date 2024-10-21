let handlers = {
    deleteRow: [],
    search: [],
    reset: [],
    removeFilter: [],
    filterUpdate: [],
    resetKorButton: [], // 초기화 이벤트 추가
    resetButtons: [],
    registeredFilters: [],
    openModal: [],
    removeButton: []
};

export { handlers }; // handlers를 export

export default {
    SearchResultEvent: {
        add(eventType, handler) {
            if (handlers[eventType]) {
                handlers[eventType].push(handler);
            }
        },
        remove(eventType, handler) {
            if (handlers[eventType]) {
                handlers[eventType] = handlers[eventType].filter(h => h !== handler);
            }
        },
        deleteRowBtnClick() {
            handlers.deleteRow.forEach(handler => handler());
        },
        fetchData(type, filter) {
            handlers.search.forEach(handler => handler(type, filter));
        },
        resetFilter() {
            handlers.reset.forEach(handler => handler());
            handlers.removeButton.forEach(handler => handler());
        },
        removeButton() {
            handlers.removeButton.forEach(handler => handler());
        },
        filterUpdate(KeyName, type, filter) {
            handlers.registeredFilters.push({ KeyName, type, filter });
            // console.log('After filterUpdate:', handlers.registeredFilters); // 추가된 후 상태 출력
            handlers.filterUpdate.forEach(handler => handler(KeyName, type, filter));
        },
        getRegisteredFilters() {
            return handlers.registeredFilters;
        },
        removeFilter(keyName, type, filter) {
            handlers.removeFilter.forEach(handler => handler(keyName, type, filter));
            handlers.resetKorButton.forEach(handler => handler(keyName));
        },
        openModal() {
            handlers.openModal.forEach(handler => handler());
        },
        resetKorButton(keyName) { // 초기화 함수 추가
            handlers.resetKorButton.forEach(handler => handler(keyName));
        },
        removeRegisteredFilter(keyName, type, filter) {
            console.log('keyName, type, filter',keyName, type, filter);
        }
    }
}