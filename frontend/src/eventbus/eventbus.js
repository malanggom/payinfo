let handlers = {
    deleteRow: [],
    search: [],
    reset: [],
    removeFilter: [],
    filterUpdate: [],
    resetKorButton: [], // 초기화 이벤트 추가
    resetButtons: [],
    refreshData: [],
    registeredFilters: [],
    openModal: [],
    removeButton: [],
    activeFilters: [], // 활성 필터 목록 추가
    pjDeleteRow: [],
    pjSearch: [],
    pjReset: [],
    pjRemoveFilter: [],
    pjFilterUpdate: [],
    pjResetKorButton: [], // 초기화 이벤트 추가
    pjResetButtons: [],
    pjRegisteredFilters: [],
    pjOpenModal: [],
    pjRemoveButton: [],
    pjActiveFilters: [] // 활성 필터 목록 추가

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
        removeButton(KeyName, type, filter) {
            handlers.removeButton.forEach(handler => handler(KeyName, type, filter));
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
            console.log(`removeFilter 호출됨: KeyName=${keyName}, type=${type}, filter=${filter}`);
            handlers.registeredFilters = handlers.registeredFilters.filter(
                handler => !(handler.KeyName === keyName && handler.type === type && handler.filter === filter)
            );
            console.log('등록된 필터 상태:', handlers.registeredFilters); // 상태 확인 로그
            handlers.removeFilter.forEach(handler => handler(keyName, type, filter));
        },
        removeActiveFilter(keyName, type, filter) {
            handlers.activeFilters = handlers.activeFilters.filter(
                activeFilter => !(activeFilter.keyName === keyName && activeFilter.type === type && activeFilter.filter === filter)
            );
            console.log(`활성 필터 '${keyName}'이(가) 제거되었습니다.`);
        },
        openModal() {
            handlers.openModal.forEach(handler => handler());
        },
        resetKorButton() { // 초기화 함수 추가
            handlers.resetKorButton.forEach(handler => handler());
        },
        removeRegisteredFilter(keyName, type, filter) {
            handlers.registeredFilters = handlers.registeredFilters.filter(
                handler => !(handler.KeyName === keyName && handler.type === type && handler.filter === filter)
            );
            console.log(`등록된 필터 '${keyName}'이(가) 제거되었습니다.`);
        },
        // 등록된 필터 업데이트 메서드 추가
        updateRegisteredFilters(updatedFilters) {
            handlers.registeredFilters = updatedFilters;
            console.log('등록된 필터가 업데이트되었습니다:', handlers.registeredFilters);
        },
        refreshData() {
            handlers.search.forEach(handler => handler());
        },
    },SearchPjHistoryResultEvent: {
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
        pjDevHistDeleteRowBtnClick() {
            handlers.pjDeleteRow.forEach(handler => handler());
        },
        fetchData(type, filter) {
            handlers.pjSearch.forEach(handler => handler(type, filter));
        },
        PjResetFilter() {
            handlers.pjReset.forEach(handler => handler());
            handlers.pjRemoveButton.forEach(handler => handler());
        },
        removeButton(KeyName, type, filter) {
            handlers.pjRemoveButton.forEach(handler => handler(KeyName, type, filter));
        },
        filterUpdate(KeyName, type, filter) {
            handlers.pjRegisteredFilters.push({KeyName, type, filter});
            // console.log('After filterUpdate:', handlers.registeredFilters); // 추가된 후 상태 출력
            handlers.pjFilterUpdate.forEach(handler => handler(KeyName, type, filter));
        },
        getRegisteredFilters() {
            return handlers.pjRegisteredFilters;
        },
        removeFilter(keyName, type, filter) {
            console.log(`removeFilter 호출됨: KeyName=${keyName}, type=${type}, filter=${filter}`);
            handlers.pjRegisteredFilters = handlers.pjRegisteredFilters.filter(
                handler => !(handler.KeyName === keyName && handler.type === type && handler.filter === filter)
            );
            console.log('등록된 필터 상태:', handlers.pjRegisteredFilters); // 상태 확인 로그
            handlers.pjRemoveFilter.forEach(handler => handler(keyName, type, filter));
        },
        removeActiveFilter(keyName, type, filter) {
            handlers.pjActiveFilters = handlers.pjActiveFilters.filter(
                activeFilter => !(activeFilter.keyName === keyName && activeFilter.type === type && activeFilter.filter === filter)
            );
            console.log(`활성 필터 '${keyName}'이(가) 제거되었습니다.`);
        },
        pjOpenModal() {
            handlers.pjOpenModal.forEach(handler => handler());
        },
        resetKorButton() { // 초기화 함수 추가
            handlers.pjResetKorButton.forEach(handler => handler());
        },
        removeRegisteredFilter(keyName, type, filter) {
            handlers.pjRegisteredFilters = handlers.pjRegisteredFilters.filter(
                handler => !(handler.KeyName === keyName && handler.type === type && handler.filter === filter)
            );
            console.log(`등록된 필터 '${keyName}'이(가) 제거되었습니다.`);
        },
        // 등록된 필터 업데이트 메서드 추가
        updateRegisteredFilters(updatedFilters) {
            handlers.pjRegisteredFilters = updatedFilters;
            console.log('등록된 필터가 업데이트되었습니다:', handlers.pjRegisteredFilters);
        },
    }
}